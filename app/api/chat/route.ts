import type {
  ChatMessage,
  ManualChatRequest,
  VisitorBehaviorAnalysisMode,
  VisitorBehaviorAnalysisRequest,
} from '@/types/chat';
import type { SiteLanguage, VisitorBehaviorPayload } from '@/types/visitor-behavior';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

function buildLanguageInstruction(language: SiteLanguage | undefined) {
  return language === 'zh' ? 'Respond in Simplified Chinese.' : 'Respond in English.';
}

function buildAssistantPersona(language: SiteLanguage | undefined) {
  return `
You are Jessie's portfolio assistant.

Your role is to help visitors understand Jessie's background, project experience, and job fit in a clear, persuasive, and grounded way.

Voice and stance:
- Use a restrained semi-first-person voice
- You essentially represent Jessie, but do not sound like direct self-praise
- Do not sound like a detached third-party narrator either
- You are Jessie's website assistant, helping visitors quickly assess her background, project experience, and fit for a role

Credibility rules:
- Support Jessie by highlighting relevant strengths and transferable experience
- Do not exaggerate
- Do not fabricate experience
- Do not claim perfect fit unless there is clear evidence
- When discussing job fit, focus on whether Jessie seems worth interviewing

Tone:
- Confident, concise, and professional
- Helpful and grounded
- Not a neutral analyst
- Not a self-promotional salesperson
- Present strengths with evidence, not hype

${buildLanguageInstruction(language)}
  `;
}

function buildBehaviorAnalysisMessages(
  payload: Required<VisitorBehaviorAnalysisRequest>
): ChatMessage[] {
  return [
    {
      role: 'system',
      content: `
${buildAssistantPersona(payload.language)}

Task:
Generate a short, natural hint message that helps the visitor quickly understand Jessie and navigate to what is most relevant.

Guidelines:
- Output ONLY 1–2 sentences
- Keep it concise, natural, and friendly (NOT analytical, NOT robotic)
- Do NOT describe user behavior explicitly
- Do NOT say things like "I noticed you are..."
- Do NOT sound like marketing or sales
- Do NOT repeat full resume content
- Avoid repeating previous hints

Jessie's key highlights:
- Frontend engineer focused on AI products
- Tech stack: Next.js, React, TypeScript, Zustand, React Query
- Built an AI PDF reader with chat, annotation, and complex UI interactions
- Strong in complex state management and interactive UI (SSE streaming, multi-panel layout, text anchoring)

Behavior mapping:
- quick_scroll → highlight key strengths quickly
- long_hover_experience → add deeper insight about that experience
- repeated_project_focus → emphasize project depth and technical challenges
- idle_on_contact → gently encourage reaching out

Your goal:
Generate ONE short contextual hint based on the behavior.
      `,
    },
    {
      role: 'user',
      content: JSON.stringify({
        sessionId: payload.sessionId,
        pathname: payload.pathname,
        sentAt: payload.sentAt,
        language: payload.language,
        shownHints: payload.shownHints,
        behavior: payload.behavior,
      }),
    },
  ];
}

function buildAboutIntroMessages(payload: Required<VisitorBehaviorAnalysisRequest>): ChatMessage[] {
  return [
    {
      role: 'system',
      content: `
${buildAssistantPersona(payload.language)}

Task:
Write the first About message after the visitor arrives here.

Guidelines:
- Output ONLY 2-4 short sentences
- Sound natural, calm, and observant, not analytical
- Use the visitor's earlier browsing behavior to decide what would help next
- Do NOT explicitly describe their behavior with phrases like "you scrolled fast" or "I noticed you"
- Give one concrete next suggestion based on likely interest
- End by inviting the visitor to ask a question here
- Do NOT mention floating buttons, hints, or internal logic

Suggestion mapping:
- quick scan / low dwell / fast scrolling -> suggest spending a bit more time on selected projects
- repeated project focus or project clicks -> suggest asking about technical tradeoffs, architecture, or implementation depth
- strong experience dwell -> suggest asking about past roles, ownership, or collaboration style
- contact focus -> suggest asking directly about availability or fit
- mixed signals -> give one balanced suggestion tied to projects, experience, or collaboration

The message should feel like a personalized opening inside the About card, not like an alert.
      `,
    },
    {
      role: 'user',
      content: JSON.stringify({
        sessionId: payload.sessionId,
        pathname: payload.pathname,
        sentAt: payload.sentAt,
        language: payload.language,
        shownHints: payload.shownHints,
        behavior: payload.behavior,
      }),
    },
  ];
}

function buildManualMessages(body: ManualChatRequest): ChatMessage[] {
  return [
    {
      role: 'system',
      content: `${buildAssistantPersona(body.language)}

Task:
Answer clearly and concisely, and stay focused on helping the visitor understand Jessie, her work, project experience, or collaboration fit.

When helpful:
- connect answers to concrete projects, technical decisions, ownership, or transferable experience
- stay grounded in available evidence
- optimize for helping the visitor decide whether Jessie is worth interviewing
`,
    },
    ...(body.messages ?? []),
  ];
}

export async function POST(request: Request) {
  const body = (await request.json()) as ManualChatRequest & VisitorBehaviorAnalysisRequest;
  const analysisMode: VisitorBehaviorAnalysisMode = body.analysisMode === 'about_intro' ? 'about_intro' : 'hint';
  const hasBehaviorPayload =
    typeof body.sessionId === 'string' &&
    typeof body.pathname === 'string' &&
    typeof body.sentAt === 'string' &&
    (body.language === 'zh' || body.language === 'en') &&
    Array.isArray(body.shownHints) &&
    typeof body.behavior === 'object' &&
    body.behavior !== null;

  if (!hasBehaviorPayload && (!body.messages || body.messages.length === 0)) {
    return Response.json(
      { ok: false, error: 'messages or visitor behavior payload is required.' },
      { status: 400 }
    );
  }

  if (!DEEPSEEK_API_KEY) {
    return Response.json(
      {
        ok: false,
        error: 'DEEPSEEK_API_KEY is not configured.',
      },
      { status: 500 }
    );
  }

  const deepseekResponse = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: body.model ?? 'deepseek-chat',
      messages: hasBehaviorPayload
        ? analysisMode === 'about_intro'
          ? buildAboutIntroMessages(body as Required<VisitorBehaviorPayload> & { analysisMode: VisitorBehaviorAnalysisMode })
          : buildBehaviorAnalysisMessages(body as Required<VisitorBehaviorPayload> & { analysisMode: VisitorBehaviorAnalysisMode })
        : buildManualMessages(body),
      temperature: body.temperature ?? 0.7,
      max_tokens: body.max_tokens,
      stream: false,
    }),
  });

  const data = await deepseekResponse.json();

  if (!deepseekResponse.ok) {
    return Response.json(
      {
        ok: false,
        error: 'DeepSeek request failed.',
        details: data,
      },
      { status: deepseekResponse.status }
    );
  }

  return Response.json({
    ok: true,
    analysis: data.choices?.[0]?.message?.content ?? null,
    data,
  });
}
