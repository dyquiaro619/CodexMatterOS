import type {
  AtRiskMatter,
  DashboardSummary,
  MatterEventRecord,
  MatterRecord,
  PolicySnapshotRecord
} from "@/lib/types";

export const mockDashboard: DashboardSummary = {
  activeMatters: 48,
  escalations: 4,
  deadlinesNext7Days: 7,
  stalledMatters: 3,
  riskCounts: {
    stable: 27,
    monitoring: 11,
    reviewRequired: 7,
    strategicRisk: 3
  },
  lastEvaluatedAt: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
  closure: {
    prevented: 3,
    surfaced: 6,
    resolved: 5
  }
};

export const mockAtRiskMatters: AtRiskMatter[] = [
  {
    id: "MAT-1024",
    title: "H-1B Extension - Vega",
    type: "WORK_PERMIT_EXTENSION",
    stage: "QUALITY_ASSURANCE",
    exposureState: "STRATEGIC_RISK",
    reasons: [
      "Eligibility policy update changed qualifying wage interpretation.",
      "Matter was previously cleared under prior policy snapshot."
    ],
    lastProgressAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    deadlineAt: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "MAT-1016",
    title: "PR Stream Review - Osei",
    type: "PR",
    stage: "FILED",
    exposureState: "REVIEW_REQUIRED",
    reasons: [
      "Procedural filing checklist changed after submission.",
      "Corrective addendum may be required inside 48 hours."
    ],
    lastProgressAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    deadlineAt: new Date(Date.now() + 34 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "MAT-0991",
    title: "Family Sponsorship - Patel",
    type: "FAMILY_SPONSORSHIP",
    stage: "EVIDENCE_GATHERING",
    exposureState: "REVIEW_REQUIRED",
    reasons: [
      "Dependency score degraded: missing translated civil status document.",
      "Freshness score declined with no material update in 9 days."
    ],
    lastProgressAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    deadlineAt: new Date(Date.now() + 60 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "MAT-0980",
    title: "Study Permit Extension - Li",
    type: "STUDY_PERMIT_EXTENSION",
    stage: "POST_FILING_BIOMETRICS",
    exposureState: "MONITORING",
    reasons: ["Jurisdictional processing bulletin indicates moderate delay risk."],
    lastProgressAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "MAT-0948",
    title: "Family Petition - Mendez",
    type: "FAMILY_SPONSORSHIP",
    stage: "CASE_PREPARATION",
    exposureState: "STRATEGIC_RISK",
    reasons: [
      "Retroactive eligibility rule changed sponsor income threshold.",
      "Current packet no longer satisfies revised minimum criteria."
    ],
    lastProgressAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    deadlineAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "MAT-0926",
    title: "Study Extension - Al-Hassan",
    type: "STUDY_PERMIT_EXTENSION",
    stage: "QUALITY_ASSURANCE",
    exposureState: "REVIEW_REQUIRED",
    reasons: [
      "Dependency score degraded after translated transcript expired.",
      "Deadline compression detected in evidence replacement window."
    ],
    lastProgressAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    deadlineAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString()
  }
];

export const mockPolicySnapshots: PolicySnapshotRecord[] = [
  {
    id: "PS-2026-0001",
    title: "USCIS H-1B Policy Manual - Q1 2026",
    sourceUrl: "https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations",
    impactedMatterIds: ["MAT-1024"],
    capturedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    capturedBy: "Attorney / K. Brooks",
    policySource: "USCIS Policy Manual Vol. 2 Part H",
    policyVersion: "2026-02-15",
    jurisdiction: "USCIS - California Service Center",
    clearanceDecision: "Proceed to quality assurance under updated wage qualification test",
    rationale:
      "Beneficiary wage evidence met revised prevailing wage interpretation at time of clearance.",
    immutableHash: "sha256:0d7f4f8aaf2cd0b24411c220a55e8f998f6a2fa5c1f3c9ba3725f7898ad24a11"
  },
  {
    id: "PS-2026-0002",
    title: "IRCC Immigration Guide 2026-01",
    sourceUrl: "https://www.canada.ca/en/immigration-refugees-citizenship",
    impactedMatterIds: ["MAT-1016", "MAT-0914"],
    capturedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    capturedBy: "Attorney / M. Lewis",
    policySource: "IRCC Program Delivery Instructions",
    policyVersion: "2026-02-19",
    jurisdiction: "IRCC - Ontario",
    clearanceDecision: "File with procedural checklist rev. C and additional identity affidavit",
    rationale:
      "Document package met mandatory checklists with one supplemental affidavit condition.",
    immutableHash: "sha256:f451d236162e83f8f8d52b9047f9d4b13e21179ef6e7b9cbf91e2b9d68af1e61"
  },
  {
    id: "PS-2026-0003",
    title: "USCIS I-485 Adjustment of Status Guide - 2026",
    sourceUrl: "https://www.uscis.gov/i-485",
    impactedMatterIds: ["MAT-0991", "MAT-0948", "MAT-0895"],
    capturedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    capturedBy: "Associate / J. Romero",
    policySource: "IRCC Family Reunification Bulletin",
    policyVersion: "2026-02-10",
    jurisdiction: "IRCC - National",
    clearanceDecision: "Hold in evidence gathering pending translated civil status proof",
    rationale:
      "Eligibility intact, but dependency completeness threshold not yet satisfied for filing.",
    immutableHash: "sha256:95a2803a179ec58f0bbbd779eec779cce78b4d9f3f2f4f6d7cbe8f7a82a4b2f2"
  },
  {
    id: "PS-2026-0004",
    title: "ESDC LMIA Processing Handbook - 2026",
    sourceUrl:
      "https://www.canada.ca/en/employment-social-development/services/foreign-workers/median-wage.html",
    impactedMatterIds: [],
    capturedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    capturedBy: "Attorney / S. Wong",
    policySource: "IRCC Express Entry Program Delivery Update",
    policyVersion: "2026-01-31",
    jurisdiction: "IRCC - National",
    clearanceDecision: "Proceed with filing under revised language equivalency matrix",
    rationale:
      "Applicant profile exceeded revised CRS thresholds with verified language recertification.",
    immutableHash: "sha256:9cb36194f2ed8dc0a5b40c1d6b96cc496a4ef0b5d300a4a2c70f98dcf05ad2fe"
  },
  {
    id: "PS-2026-0005",
    title: "DOL PERM Labor Certification Guidance - 2026",
    sourceUrl: "https://www.dol.gov/agencies/eta/foreign-labor/programs/permanent",
    impactedMatterIds: ["MAT-0948"],
    capturedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    capturedBy: "Partner / R. Clarke",
    policySource: "USCIS Family-Based Sponsorship Guidance Memo",
    policyVersion: "2026-02-24",
    jurisdiction: "USCIS - Texas Service Center",
    clearanceDecision: "Escalate for partner review before filing due to income threshold shift",
    rationale:
      "Sponsor income met prior guidance but falls short under retroactive interpretation update.",
    immutableHash: "sha256:6e13c4b1b3d3d5464669f073d97fa3d1d124324fd0fbbfb0e57e7a409c3f4a06"
  },
  {
    id: "PS-2026-0006",
    title: "IRCC Study Permit Requirements - 2026",
    sourceUrl:
      "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
    impactedMatterIds: ["MAT-0926", "MAT-0980"],
    capturedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    capturedBy: "Associate / L. Ortiz",
    policySource: "IRCC Student Permit Procedural Bulletin",
    policyVersion: "2026-02-25",
    jurisdiction: "IRCC - Western Region",
    clearanceDecision: "Proceed conditionally pending refreshed transcript certification",
    rationale:
      "Core eligibility unchanged; procedural sufficiency contingent on renewed documentation.",
    immutableHash: "sha256:7fcd1561fdff2b2675ed707a31d61cb7b495be7b8ceecff4f138116f7d1b08c8"
  },
  {
    id: "PS-2026-0007",
    title: "USCIS Employer Compliance Circular - 2026",
    sourceUrl: "https://www.uscis.gov/working-in-the-united-states",
    impactedMatterIds: ["MAT-0902"],
    capturedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    capturedBy: "Attorney / C. Silva",
    policySource: "USCIS Employer Compliance Circular",
    policyVersion: "2026-02-18",
    jurisdiction: "USCIS - Vermont Service Center",
    clearanceDecision: "Hold in review pending employer attestations addendum",
    rationale:
      "Evidence package complete except for newly required employer compliance declarations.",
    immutableHash: "sha256:7d31a2f2aa0cb848ed4ca9808bcaad6e9cf7cf83308c7f4f8ac6008f5d5a5ec5"
  },
  {
    id: "PS-2026-0008",
    title: "EOIR/IRB Refugee Board Practice Manual - 2025 Ed.",
    sourceUrl: "https://www.justice.gov/eoir/eoir-policy-manual",
    impactedMatterIds: ["MAT-0895", "MAT-0937"],
    capturedAt: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000).toISOString(),
    capturedBy: "Partner / H. Parker",
    policySource: "DOJ EOIR Procedural Clarification",
    policyVersion: "2026-01-22",
    jurisdiction: "EOIR - New York",
    clearanceDecision: "Proceed to hearing prep with supplemental affidavit strategy",
    rationale:
      "Hearing-track risk acceptable with documented trauma-evidence corroboration plan.",
    immutableHash: "sha256:80de02a68095be0e731b83e04b4e0f2d9a2a50662d66abdf0ec50e4b49c52e2d"
  }
];

export const mockMatters: MatterRecord[] = [
  {
    id: "MAT-1024",
    title: "H-1B Extension - Vega",
    clientName: "Vega Analytics",
    type: "WORK_PERMIT_EXTENSION",
    stage: "QUALITY_ASSURANCE",
    exposureState: "STRATEGIC_RISK",
    deadlineAt: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
    openedAt: new Date(Date.now() - 34 * 24 * 60 * 60 * 1000).toISOString(),
    policySnapshotId: "PS-2026-0001"
  },
  {
    id: "MAT-1016",
    title: "PR Stream Review - Osei",
    clientName: "Osei Household",
    type: "PR",
    stage: "FILED",
    exposureState: "REVIEW_REQUIRED",
    deadlineAt: new Date(Date.now() + 34 * 60 * 60 * 1000).toISOString(),
    openedAt: new Date(Date.now() - 61 * 24 * 60 * 60 * 1000).toISOString(),
    policySnapshotId: "PS-2026-0002"
  },
  {
    id: "MAT-0991",
    title: "Family Sponsorship - Patel",
    clientName: "Patel Family",
    type: "FAMILY_SPONSORSHIP",
    stage: "EVIDENCE_GATHERING",
    exposureState: "REVIEW_REQUIRED",
    deadlineAt: new Date(Date.now() + 60 * 60 * 60 * 1000).toISOString(),
    openedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    policySnapshotId: "PS-2026-0003"
  },
  {
    id: "MAT-0980",
    title: "Study Permit Extension - Li",
    clientName: "Li Family",
    type: "STUDY_PERMIT_EXTENSION",
    stage: "POST_FILING_BIOMETRICS",
    exposureState: "MONITORING",
    deadlineAt: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000).toISOString(),
    openedAt: new Date(Date.now() - 47 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "MAT-0972",
    title: "Asylum Petition - Duarte",
    clientName: "Duarte",
    type: "ASYLUM",
    stage: "CASE_PREPARATION",
    exposureState: "STABLE",
    deadlineAt: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000).toISOString(),
    openedAt: new Date(Date.now() - 123 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "MAT-0961",
    title: "Work Permit Extension - Nakamoto",
    clientName: "Nakamoto Robotics",
    type: "WORK_PERMIT_EXTENSION",
    stage: "EVIDENCE_GATHERING",
    exposureState: "MONITORING",
    deadlineAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    openedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "MAT-0955",
    title: "PR Application - Ibrahim",
    clientName: "Ibrahim",
    type: "PR",
    stage: "QUALITY_ASSURANCE",
    exposureState: "STABLE",
    deadlineAt: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString(),
    openedAt: new Date(Date.now() - 72 * 24 * 60 * 60 * 1000).toISOString(),
    policySnapshotId: "PS-2026-0004"
  },
  {
    id: "MAT-0948",
    title: "Family Petition - Mendez",
    clientName: "Mendez Family",
    type: "FAMILY_SPONSORSHIP",
    stage: "CASE_PREPARATION",
    exposureState: "STRATEGIC_RISK",
    deadlineAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
    openedAt: new Date(Date.now() - 51 * 24 * 60 * 60 * 1000).toISOString(),
    policySnapshotId: "PS-2026-0005"
  },
  {
    id: "MAT-0937",
    title: "Asylum Filing - Herrera",
    clientName: "Herrera",
    type: "ASYLUM",
    stage: "INTERVIEW_HEARING",
    exposureState: "MONITORING",
    deadlineAt: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000).toISOString(),
    openedAt: new Date(Date.now() - 101 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "MAT-0926",
    title: "Study Extension - Al-Hassan",
    clientName: "Al-Hassan",
    type: "STUDY_PERMIT_EXTENSION",
    stage: "QUALITY_ASSURANCE",
    exposureState: "REVIEW_REQUIRED",
    deadlineAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    openedAt: new Date(Date.now() - 67 * 24 * 60 * 60 * 1000).toISOString(),
    policySnapshotId: "PS-2026-0006"
  },
  {
    id: "MAT-0914",
    title: "PR Eligibility Review - Grant",
    clientName: "Grant Household",
    type: "PR",
    stage: "INTAKE_ELIGIBILITY",
    exposureState: "STABLE",
    deadlineAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    openedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "MAT-0902",
    title: "Work Permit Renewal - Ortega",
    clientName: "Ortega Manufacturing",
    type: "WORK_PERMIT_EXTENSION",
    stage: "CASE_PREPARATION",
    exposureState: "REVIEW_REQUIRED",
    deadlineAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    openedAt: new Date(Date.now() - 58 * 24 * 60 * 60 * 1000).toISOString(),
    policySnapshotId: "PS-2026-0007"
  },
  {
    id: "MAT-0895",
    title: "Asylum Intake - Khoury",
    clientName: "Khoury",
    type: "ASYLUM",
    stage: "CASE_PREPARATION",
    exposureState: "MONITORING",
    deadlineAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    openedAt: new Date(Date.now() - 86 * 24 * 60 * 60 * 1000).toISOString(),
    policySnapshotId: "PS-2026-0008"
  }
];

const eventsByMatter: Record<string, MatterEventRecord[]> = {
  "MAT-1024": [
    {
      id: "EV-2001",
      matterId: "MAT-1024",
      occurredAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      actor: "Attorney",
      eventType: "NOTE_ADDED",
      stage: "INTAKE_ELIGIBILITY",
      description: "Matter opened and initial eligibility checklist completed."
    },
    {
      id: "EV-2002",
      matterId: "MAT-1024",
      occurredAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      actor: "System",
      eventType: "POLICY_SNAPSHOT_CREATED",
      stage: "CASE_PREPARATION",
      description: "Policy snapshot captured and linked for clearance rationale."
    },
    {
      id: "EV-2003",
      matterId: "MAT-1024",
      occurredAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      actor: "Attorney",
      eventType: "STAGE_CHANGED",
      stage: "QUALITY_ASSURANCE",
      description: "Transition validated: CASE_PREPARATION -> QUALITY_ASSURANCE."
    },
    {
      id: "EV-2004",
      matterId: "MAT-1024",
      occurredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      actor: "System",
      eventType: "RISK_FLAGGED",
      stage: "QUALITY_ASSURANCE",
      description: "Eligibility policy update increased exposure to strategic risk."
    }
  ],
  "MAT-1016": [
    {
      id: "EV-2101",
      matterId: "MAT-1016",
      occurredAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
      actor: "Attorney",
      eventType: "STAGE_CHANGED",
      stage: "CASE_PREPARATION",
      description: "Transition validated: EVIDENCE_GATHERING -> CASE_PREPARATION."
    },
    {
      id: "EV-2102",
      matterId: "MAT-1016",
      occurredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      actor: "System",
      eventType: "POLICY_SNAPSHOT_CREATED",
      stage: "FILED",
      description: "Procedural rule-set rev. C snapshot attached to filing decision."
    }
  ]
};

export function getMockMatterEvents(matterId: string): MatterEventRecord[] {
  return eventsByMatter[matterId] ?? [
    {
      id: `EV-${matterId}`,
      matterId,
      occurredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      actor: "System",
      eventType: "NOTE_ADDED",
      stage: "INTAKE_ELIGIBILITY",
      description: "Matter timeline initialized."
    }
  ];
}
