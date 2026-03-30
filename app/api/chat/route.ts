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

function buildBehaviorAnalysisMessages(
  payload: Required<VisitorBehaviorAnalysisRequest>
): ChatMessage[] {
  return [
    {
      role: 'system',
      content: `
You are a lightweight assistant on a personal portfolio website.

Your job is to generate a short, natural hint message to help visitors better understand the site owner (Jessie) and guide them through the page.

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
${buildLanguageInstruction(payload.language)}
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
You are the AI assistant embedded inside the About section of Jessie's portfolio site.

Your job is to write the first About message after the visitor arrives here.

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
${buildLanguageInstruction(payload.language)}
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
      content: `You are the AI assistant for a personal portfolio website. Answer clearly and concisely, and stay focused on helping the visitor understand Jessie, her work, or collaboration fit. ${buildLanguageInstruction(body.language)}`,
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
