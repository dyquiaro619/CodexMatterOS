import {
  getMockMatterEvents,
  mockAtRiskMatters,
  mockDashboard,
  mockMatters,
  mockPolicySnapshots
} from "@/lib/mock-data";
import type {
  AtRiskMatter,
  CommandCenterData,
  DashboardSummary,
  ExposureState,
  MatterDetailData,
  MatterEventRecord,
  MatterRecord,
  OperationalClosure,
  PolicySnapshotRecord,
  PolicySnapshotsData,
  RiskCounts,
  MattersListData
} from "@/lib/types";

const API_BASE_URL = process.env.MATTEROS_API_BASE_URL?.replace(/\/$/, "") ?? "";

async function fetchEndpoint(path: string): Promise<unknown | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1800);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 30 },
      signal: controller.signal
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as unknown;
    if (payload && typeof payload === "object" && "data" in payload) {
      return (payload as { data: unknown }).data;
    }

    return payload;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  return fallback;
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function normalizeRiskCounts(raw: unknown): RiskCounts {
  const obj = asRecord(raw);
  return {
    stable: asNumber(obj.stable),
    monitoring: asNumber(obj.monitoring),
    reviewRequired: asNumber(obj.reviewRequired ?? obj.review_required),
    strategicRisk: asNumber(obj.strategicRisk ?? obj.strategic_risk)
  };
}

function normalizeClosure(raw: unknown): OperationalClosure {
  const obj = asRecord(raw);
  return {
    prevented: asNumber(obj.prevented),
    surfaced: asNumber(obj.surfaced),
    resolved: asNumber(obj.resolved)
  };
}

function normalizeDashboard(raw: unknown): DashboardSummary | null {
  const obj = asRecord(raw);
  if (Object.keys(obj).length === 0) {
    return null;
  }

  const riskCounts = normalizeRiskCounts(obj.riskCounts ?? obj.exposure ?? obj.risks);
  const closure = normalizeClosure(obj.closure ?? obj.operationalClosure);

  return {
    activeMatters: asNumber(obj.activeMatters ?? obj.active_matters),
    escalations: asNumber(obj.escalations),
    deadlinesNext7Days: asNumber(obj.deadlinesNext7Days ?? obj.deadlines_next_7_days),
    stalledMatters: asNumber(obj.stalledMatters ?? obj.stalled_matters),
    riskCounts,
    lastEvaluatedAt: asString(
      obj.lastEvaluatedAt ?? obj.last_evaluated_at,
      new Date().toISOString()
    ),
    closure
  };
}

function isExposureState(value: unknown): value is ExposureState {
  return (
    value === "STABLE" ||
    value === "MONITORING" ||
    value === "REVIEW_REQUIRED" ||
    value === "STRATEGIC_RISK"
  );
}

function normalizeAtRiskMatter(raw: unknown): AtRiskMatter | null {
  const obj = asRecord(raw);
  const id = asString(obj.id ?? obj.matterId);
  const title = asString(obj.title ?? obj.name);

  if (!id || !title) {
    return null;
  }

  const maybeExposure = obj.exposureState ?? obj.exposure_state;

  return {
    id,
    title,
    type: asString(obj.type, "UNKNOWN"),
    stage: asString(obj.stage, "UNKNOWN"),
    exposureState: isExposureState(maybeExposure) ? maybeExposure : "MONITORING",
    reasons: asStringArray(obj.reasons ?? obj.riskReasons),
    lastProgressAt: asString(obj.lastProgressAt ?? obj.last_progress_at) || undefined,
    deadlineAt: asString(obj.deadlineAt ?? obj.deadline_at) || undefined
  };
}

function normalizeAtRiskList(raw: unknown): AtRiskMatter[] | null {
  const list = Array.isArray(raw)
    ? raw
    : Array.isArray(asRecord(raw).items)
      ? (asRecord(raw).items as unknown[])
      : null;

  if (!list) {
    return null;
  }

  return list
    .map((entry) => normalizeAtRiskMatter(entry))
    .filter((entry): entry is AtRiskMatter => Boolean(entry));
}

function normalizeMatter(raw: unknown): MatterRecord | null {
  const obj = asRecord(raw);
  const id = asString(obj.id ?? obj.matterId);
  const title = asString(obj.title ?? obj.name);

  if (!id || !title) {
    return null;
  }

  const maybeExposure = obj.exposureState ?? obj.exposure_state;

  return {
    id,
    title,
    clientName: asString(obj.clientName ?? obj.client_name ?? obj.client, title),
    type: asString(obj.type, "UNKNOWN"),
    stage: asString(obj.stage, "UNKNOWN"),
    exposureState: isExposureState(maybeExposure) ? maybeExposure : "MONITORING",
    deadlineAt: asString(obj.deadlineAt ?? obj.deadline_at ?? obj.dueDate) || undefined,
    openedAt: asString(obj.openedAt ?? obj.createdAt ?? obj.created_at) || undefined,
    policySnapshotId: asString(obj.policySnapshotId ?? obj.policy_snapshot_id) || undefined
  };
}

function normalizeMatterList(raw: unknown): MatterRecord[] | null {
  const list = Array.isArray(raw)
    ? raw
    : Array.isArray(asRecord(raw).items)
      ? (asRecord(raw).items as unknown[])
      : null;

  if (!list) {
    return null;
  }

  return list
    .map((entry) => normalizeMatter(entry))
    .filter((entry): entry is MatterRecord => Boolean(entry));
}

function normalizeMatterEvent(raw: unknown): MatterEventRecord | null {
  const obj = asRecord(raw);
  const id = asString(obj.id ?? obj.eventId);
  const matterId = asString(obj.matterId ?? obj.matter_id);

  if (!id || !matterId) {
    return null;
  }

  return {
    id,
    matterId,
    occurredAt: asString(
      obj.occurredAt ?? obj.timestamp ?? obj.createdAt ?? obj.created_at,
      new Date().toISOString()
    ),
    actor: asString(obj.actor ?? obj.by ?? "System"),
    eventType: asString(obj.eventType ?? obj.type ?? "NOTE_ADDED"),
    stage: asString(obj.stage) || undefined,
    description: asString(obj.description ?? obj.message ?? obj.details, "Event recorded")
  };
}

function normalizeEventList(raw: unknown): MatterEventRecord[] | null {
  const list = Array.isArray(raw)
    ? raw
    : Array.isArray(asRecord(raw).items)
      ? (asRecord(raw).items as unknown[])
      : null;

  if (!list) {
    return null;
  }

  return list
    .map((entry) => normalizeMatterEvent(entry))
    .filter((entry): entry is MatterEventRecord => Boolean(entry));
}

function normalizePolicySnapshot(raw: unknown): PolicySnapshotRecord | null {
  const obj = asRecord(raw);
  const id = asString(obj.id ?? obj.snapshotId);
  if (!id) {
    return null;
  }

  const impactedMatterIds = asStringArray(
    obj.impactedMatterIds ?? obj.impacted_matter_ids ?? obj.matterIds ?? obj.matter_ids
  );
  const fallbackMatterId = asString(obj.matterId ?? obj.matter_id);
  const normalizedImpactedIds =
    impactedMatterIds.length > 0
      ? impactedMatterIds
      : fallbackMatterId
        ? [fallbackMatterId]
        : [];

  return {
    id,
    title: asString(
      obj.title ?? obj.name ?? obj.policyName,
      asString(obj.policySource ?? obj.policy_source, "Policy snapshot")
    ),
    sourceUrl: asString(obj.sourceUrl ?? obj.source_url ?? obj.url) || undefined,
    impactedMatterIds: normalizedImpactedIds,
    capturedAt: asString(obj.capturedAt ?? obj.captured_at ?? obj.createdAt, new Date().toISOString()),
    capturedBy: asString(obj.capturedBy ?? obj.captured_by ?? "System"),
    policySource: asString(obj.policySource ?? obj.policy_source ?? obj.source, "Policy source"),
    policyVersion: asString(obj.policyVersion ?? obj.policy_version ?? obj.version, "unknown"),
    jurisdiction: asString(obj.jurisdiction, "Unknown"),
    clearanceDecision: asString(obj.clearanceDecision ?? obj.decision, "Decision not provided"),
    rationale: asString(obj.rationale ?? obj.reasoning, "Rationale not provided"),
    immutableHash: asString(obj.immutableHash ?? obj.hash ?? obj.checksum, "hash-unavailable")
  };
}

function normalizePolicySnapshotList(raw: unknown): PolicySnapshotRecord[] | null {
  const list = Array.isArray(raw)
    ? raw
    : Array.isArray(asRecord(raw).items)
      ? (asRecord(raw).items as unknown[])
      : null;

  if (!list) {
    return null;
  }

  return list
    .map((entry) => normalizePolicySnapshot(entry))
    .filter((entry): entry is PolicySnapshotRecord => Boolean(entry));
}

export async function fetchCommandCenterData(): Promise<CommandCenterData> {
  if (!API_BASE_URL) {
    return {
      dashboard: mockDashboard,
      atRiskMatters: mockAtRiskMatters,
      source: {
        dashboard: "mock",
        atRisk: "mock"
      }
    };
  }

  const [dashboardRaw, atRiskRaw] = await Promise.all([
    fetchEndpoint("/api/dashboard"),
    fetchEndpoint("/api/at-risk")
  ]);

  const dashboard = normalizeDashboard(dashboardRaw) ?? mockDashboard;
  const atRiskMatters = normalizeAtRiskList(atRiskRaw) ?? mockAtRiskMatters;

  return {
    dashboard,
    atRiskMatters,
    source: {
      dashboard: dashboardRaw ? "live" : "mock",
      atRisk: atRiskRaw ? "live" : "mock"
    }
  };
}

export async function fetchMattersData(): Promise<MattersListData> {
  if (!API_BASE_URL) {
    return { matters: mockMatters, source: "mock" };
  }

  const mattersRaw = await fetchEndpoint("/api/matters");
  const matters = normalizeMatterList(mattersRaw) ?? mockMatters;

  return {
    matters,
    source: mattersRaw ? "live" : "mock"
  };
}

export async function fetchMatterDetail(matterId: string): Promise<MatterDetailData | null> {
  const mockMatter = mockMatters.find((matter) => matter.id === matterId);

  if (!API_BASE_URL) {
    if (!mockMatter) {
      return null;
    }

    const policySnapshot = mockMatter.policySnapshotId
      ? mockPolicySnapshots.find((snapshot) => snapshot.id === mockMatter.policySnapshotId)
      : undefined;

    return {
      matter: mockMatter,
      events: getMockMatterEvents(matterId),
      policySnapshot,
      source: {
        matter: "mock",
        events: "mock",
        policySnapshot: "mock"
      }
    };
  }

  const [matterRaw, eventsRaw] = await Promise.all([
    fetchEndpoint(`/api/matters/${matterId}`),
    fetchEndpoint(`/api/matters/${matterId}/events`)
  ]);

  const matter = normalizeMatter(matterRaw) ?? mockMatter;
  if (!matter) {
    return null;
  }

  const events = normalizeEventList(eventsRaw) ?? getMockMatterEvents(matterId);

  let snapshotRaw: unknown | null = null;
  let snapshot: PolicySnapshotRecord | undefined;

  if (matter.policySnapshotId) {
    snapshotRaw = await fetchEndpoint(`/api/policy-snapshots/${matter.policySnapshotId}`);
    snapshot =
      normalizePolicySnapshot(snapshotRaw) ??
      mockPolicySnapshots.find((item) => item.id === matter.policySnapshotId);
  }

  return {
    matter,
    events,
    policySnapshot: snapshot,
    source: {
      matter: matterRaw ? "live" : "mock",
      events: eventsRaw ? "live" : "mock",
      policySnapshot: snapshotRaw ? "live" : "mock"
    }
  };
}

export async function fetchPolicySnapshotsData(): Promise<PolicySnapshotsData> {
  if (!API_BASE_URL) {
    return { snapshots: mockPolicySnapshots, source: "mock" };
  }

  const snapshotsRaw = await fetchEndpoint("/api/policy-snapshots");
  const snapshots = normalizePolicySnapshotList(snapshotsRaw) ?? mockPolicySnapshots;

  return {
    snapshots,
    source: snapshotsRaw ? "live" : "mock"
  };
}

export async function fetchPolicySnapshotDetail(
  snapshotId: string
): Promise<PolicySnapshotRecord | null> {
  const mockSnapshot = mockPolicySnapshots.find((snapshot) => snapshot.id === snapshotId) ?? null;

  if (!API_BASE_URL) {
    return mockSnapshot;
  }

  const snapshotRaw = await fetchEndpoint(`/api/policy-snapshots/${snapshotId}`);
  return normalizePolicySnapshot(snapshotRaw) ?? mockSnapshot;
}
