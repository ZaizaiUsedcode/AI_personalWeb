import type { VisitorBehaviorPayload } from '@/types/visitor-behavior';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ManualChatRequest {
  messages?: ChatMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

export type VisitorBehaviorAnalysisRequest = Partial<VisitorBehaviorPayload>;
