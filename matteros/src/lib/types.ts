export type ExposureState =
  | "STABLE"
  | "MONITORING"
  | "REVIEW_REQUIRED"
  | "STRATEGIC_RISK";

export type OperationalPosture =
  | "STABLE"
  | "ATTENTION_REQUIRED"
  | "IMMEDIATE_RISK";

export interface RiskCounts {
  stable: number;
  monitoring: number;
  reviewRequired: number;
  strategicRisk: number;
}

export interface OperationalClosure {
  prevented: number;
  surfaced: number;
  resolved: number;
}

export interface DashboardSummary {
  activeMatters: number;
  escalations: number;
  deadlinesNext7Days: number;
  stalledMatters: number;
  riskCounts: RiskCounts;
  lastEvaluatedAt: string;
  closure: OperationalClosure;
}

export interface AtRiskMatter {
  id: string;
  title: string;
  type: string;
  stage: string;
  exposureState: ExposureState;
  reasons: string[];
  lastProgressAt?: string;
  deadlineAt?: string;
}

export interface MatterRecord {
  id: string;
  title: string;
  clientName: string;
  type: string;
  stage: string;
  exposureState: ExposureState;
  deadlineAt?: string;
  openedAt?: string;
  policySnapshotId?: string;
}

export interface MatterEventRecord {
  id: string;
  matterId: string;
  occurredAt: string;
  actor: string;
  eventType: string;
  stage?: string;
  description: string;
}

export interface PolicySnapshotRecord {
  id: string;
  title: string;
  sourceUrl?: string;
  impactedMatterIds: string[];
  capturedAt: string;
  capturedBy: string;
  policySource: string;
  policyVersion: string;
  jurisdiction: string;
  clearanceDecision: string;
  rationale: string;
  immutableHash: string;
}

export interface MattersListData {
  matters: MatterRecord[];
  source: "live" | "mock";
}

export interface MatterDetailData {
  matter: MatterRecord;
  events: MatterEventRecord[];
  policySnapshot?: PolicySnapshotRecord;
  source: {
    matter: "live" | "mock";
    events: "live" | "mock";
    policySnapshot: "live" | "mock";
  };
}

export interface PolicySnapshotsData {
  snapshots: PolicySnapshotRecord[];
  source: "live" | "mock";
}

export interface CommandCenterData {
  dashboard: DashboardSummary;
  atRiskMatters: AtRiskMatter[];
  source: {
    dashboard: "live" | "mock";
    atRisk: "live" | "mock";
  };
}
