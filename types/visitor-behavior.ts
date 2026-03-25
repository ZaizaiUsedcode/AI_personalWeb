export interface VisitorBehavior {
  scrollDepth: number;
  isFastScrolling: boolean;
  pageVisible: boolean;
  currentSection: string | null;
  viewedSections: string[];
  dwellTimeMsBySection: Record<string, number>;
  focusedProjectId?: string | null;
  clickedProjectIds: string[];
}

export interface VisitorBehaviorPayload {
  sessionId: string;
  pathname: string;
  sentAt: string;
  behavior: VisitorBehavior;
}
