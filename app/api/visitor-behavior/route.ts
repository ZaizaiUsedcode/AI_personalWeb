import type { VisitorBehaviorPayload } from '@/types/visitor-behavior';

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<VisitorBehaviorPayload>;

  if (!payload.sessionId || !payload.pathname || !payload.sentAt || !payload.behavior) {
    return Response.json(
      { ok: false, error: 'Invalid visitor behavior payload.' },
      { status: 400 }
    );
  }

  // Replace this with database or analytics sink integration when persistence is needed.
  console.log('[visitor-behavior]', JSON.stringify(payload));

  return Response.json({ ok: true });
}
