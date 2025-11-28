export interface WorkflowResponse {
  createdAt: Date;
  completedAt?: Date;
  result?: unknown;
  runId: string;
  status: string;
}
