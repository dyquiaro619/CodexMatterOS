"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { MatterRecord } from "@/lib/types";

function formatDate(value?: string): string {
  if (!value) {
    return "--";
  }

  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) {
    return "--";
  }

  return new Date(parsed).toLocaleDateString();
}

function toLabel(value: string): string {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

type FilterOption = {
  value: string;
  label: string;
};

function toOptions(values: string[]): FilterOption[] {
  return values
    .slice()
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({ value, label: toLabel(value) }));
}

export function MattersTable({ matters }: { matters: MatterRecord[] }) {
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [stageFilter, setStageFilter] = useState("ALL");
  const [exposureFilter, setExposureFilter] = useState("ALL");

  const typeOptions = useMemo(
    () => toOptions(Array.from(new Set(matters.map((matter) => matter.type)))),
    [matters]
  );

  const stageOptions = useMemo(
    () => toOptions(Array.from(new Set(matters.map((matter) => matter.stage)))),
    [matters]
  );

  const exposureOptions = useMemo(
    () => toOptions(Array.from(new Set(matters.map((matter) => matter.exposureState)))),
    [matters]
  );

  const filteredMatters = useMemo(() => {
    return matters.filter((matter) => {
      if (typeFilter !== "ALL" && matter.type !== typeFilter) {
        return false;
      }

      if (stageFilter !== "ALL" && matter.stage !== stageFilter) {
        return false;
      }

      if (exposureFilter !== "ALL" && matter.exposureState !== exposureFilter) {
        return false;
      }

      return true;
    });
  }, [matters, typeFilter, stageFilter, exposureFilter]);

  const hasActiveFilters =
    typeFilter !== "ALL" || stageFilter !== "ALL" || exposureFilter !== "ALL";

  return (
    <>
      <div className="data-filters">
        <label className="data-filter">
          <span>Type</span>
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
            <option value="ALL">All types</option>
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="data-filter">
          <span>Stage</span>
          <select value={stageFilter} onChange={(event) => setStageFilter(event.target.value)}>
            <option value="ALL">All stages</option>
            {stageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="data-filter">
          <span>Exposure</span>
          <select
            value={exposureFilter}
            onChange={(event) => setExposureFilter(event.target.value)}
          >
            <option value="ALL">All exposure</option>
            {exposureOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="data-filter-meta">
          <span>{filteredMatters.length} shown</span>
          <button
            type="button"
            onClick={() => {
              setTypeFilter("ALL");
              setStageFilter("ALL");
              setExposureFilter("ALL");
            }}
            disabled={!hasActiveFilters}
          >
            Clear filters
          </button>
        </div>
      </div>

      <div className="data-table data-table-8">
        <div className="data-row data-row-head">
          <span>ID</span>
          <span>Client</span>
          <span>Matter</span>
          <span>Type</span>
          <span>Stage</span>
          <span>Exposure</span>
          <span>Deadline</span>
          <span>Details</span>
        </div>

        {filteredMatters.length === 0 ? (
          <div className="data-empty">No matters match the selected filters.</div>
        ) : (
          filteredMatters.map((matter) => (
            <div className="data-row" key={matter.id}>
              <span className="mono">{matter.id}</span>
              <span>{matter.clientName}</span>
              <span>{matter.title}</span>
              <span>{toLabel(matter.type)}</span>
              <span>{toLabel(matter.stage)}</span>
              <span
                className={`data-status-pill ${
                  matter.exposureState === "STRATEGIC_RISK"
                    ? "tone-red"
                    : matter.exposureState === "REVIEW_REQUIRED"
                      ? "tone-amber"
                      : matter.exposureState === "MONITORING"
                        ? "tone-blue"
                        : "tone-mint"
                }`}
              >
                {toLabel(matter.exposureState)}
              </span>
              <span>{formatDate(matter.deadlineAt)}</span>
              <Link className="data-link" href={`/matters/${matter.id}`}>
                Open
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
}
