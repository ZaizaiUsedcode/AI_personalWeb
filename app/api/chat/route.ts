import type {
  ChatMessage,
  ManualChatRequest,
  VisitorBehaviorAnalysisRequest,
} from '@/types/chat';
import type { VisitorBehaviorPayload } from '@/types/visitor-behavior';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

function buildBehaviorAnalysisMessages(payload: Required<VisitorBehaviorAnalysisRequest>): ChatMessage[] {
  return [
    {
      role: 'system',
      content:
        'You are a website behavior analyst. Summarize the visitor intent, engagement level, and the most relevant next action in concise bullet points.',
    },
    {
      role: 'user',
      content: JSON.stringify({
        sessionId: payload.sessionId,
        pathname: payload.pathname,
        sentAt: payload.sentAt,
        behavior: payload.behavior,
      }),
    },
  ];
}

export async function POST(request: Request) {
  const body = (await request.json()) as ManualChatRequest & VisitorBehaviorAnalysisRequest;
  const hasBehaviorPayload =
    typeof body.sessionId === 'string' &&
    typeof body.pathname === 'string' &&
    typeof body.sentAt === 'string' &&
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
        ? buildBehaviorAnalysisMessages(body as VisitorBehaviorPayload)
        : body.messages,
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
