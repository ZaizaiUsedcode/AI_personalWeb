import type { SiteLanguage, VisitorBehaviorPayload } from '@/types/visitor-behavior';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export type VisitorBehaviorAnalysisMode = 'hint' | 'about_intro';

export interface ManualChatRequest {
  messages?: ChatMessage[];
  language?: SiteLanguage;
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

export interface VisitorBehaviorAnalysisRequest extends Partial<VisitorBehaviorPayload> {
  analysisMode?: VisitorBehaviorAnalysisMode;
}
