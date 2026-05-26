import type { ReactNode } from "react";

function ChartShell({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-[#181A1D]/8 bg-white p-4 shadow-sm md:p-5">
      <figcaption className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#181A1D]/45">
        {title}
      </figcaption>
      {children}
      {caption ? (
        <p className="mt-3 text-xs leading-relaxed text-[#181A1D]/50">{caption}</p>
      ) : null}
    </figure>
  );
}

function BarRow({
  label,
  value,
  pct,
  highlight,
}: {
  label: string;
  value: string;
  pct: number;
  highlight?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="font-medium text-[#181A1D]/80">{label}</span>
        <span className={`font-bold tabular-nums ${highlight ? "text-[#956EFE]" : "text-[#181A1D]"}`}>
          {value}
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all ${highlight ? "bg-[#956EFE]" : "bg-[#181A1D]/20"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/** GPA vs personality traits — dropout prediction accuracy */
export function PredictionComparisonChart() {
  return (
    <ChartShell title="Study data · 12,000 students · 4 years" caption="Source: enrollment personality assessments vs. actual dropout outcomes">
      <div className="space-y-4">
        <BarRow label="GPA alone" value="23%" pct={23} />
        <BarRow label="3 personality traits" value="71%" pct={71} highlight />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-slate-50 px-3 py-2 text-center">
          <p className="text-lg font-bold tabular-nums text-[#181A1D]">12,000</p>
          <p className="text-[11px] text-[#181A1D]/50">students tracked</p>
        </div>
        <div className="rounded-lg bg-[#956EFE]/10 px-3 py-2 text-center">
          <p className="text-lg font-bold tabular-nums text-[#956EFE]">3.1×</p>
          <p className="text-[11px] text-[#181A1D]/50">better prediction</p>
        </div>
      </div>
    </ChartShell>
  );
}

/** External validation — 2× dropout rate */
export function ExternalValidationChart() {
  return (
    <ChartShell title="Dropout rate by validation style">
      <div className="space-y-4">
        <BarRow label="Self-validating peers" value="19%" pct={19} />
        <BarRow label="External validation dependence" value="38%" pct={38} highlight />
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-lg border border-[#956EFE]/20 bg-[#956EFE]/5 px-3 py-3">
        <span className="text-2xl font-bold tabular-nums text-[#956EFE]">43%</span>
        <p className="text-xs leading-snug text-[#181A1D]/70">
          of first-year dropouts scored in the <strong>top percentile</strong> for external validation at enrollment
        </p>
      </div>
    </ChartShell>
  );
}

/** Discomfort avoidance — decision paralysis */
export function DiscomfortAvoidanceChart() {
  const months = [
    { label: "0–2 wks", count: 8 },
    { label: "3–4 wks", count: 14 },
    { label: "1–2 mo", count: 31 },
    { label: "3+ mo", count: 47, highlight: true },
  ];
  const max = 47;

  return (
    <ChartShell title="Year-2 dropouts · major decisions delayed before leaving">
      <div className="flex items-end justify-between gap-2" style={{ height: 120 }}>
        {months.map((m) => (
          <div key={m.label} className="flex flex-1 flex-col items-center gap-1">
            <span
              className={`text-[10px] font-semibold tabular-nums ${m.highlight ? "text-[#956EFE]" : "text-[#181A1D]/45"}`}
            >
              {m.count}%
            </span>
            <div
              className={`w-full max-w-[48px] rounded-t-md ${m.highlight ? "bg-[#956EFE]" : "bg-[#181A1D]/15"}`}
              style={{ height: `${(m.count / max) * 88}px` }}
            />
            <span className="text-center text-[9px] leading-tight text-[#181A1D]/45">{m.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-lg border border-[#956EFE]/20 bg-[#956EFE]/5 px-3 py-3">
        <span className="text-2xl font-bold tabular-nums text-[#956EFE]">67%</span>
        <p className="text-xs leading-snug text-[#181A1D]/70">
          avoided <strong>3+ major academic decisions</strong> for over a month before dropping out
        </p>
      </div>
    </ChartShell>
  );
}

/** Identity rigidity — 3× transfer/dropout */
export function IdentityRigidityChart() {
  return (
    <ChartShell title="Transfer or dropout by junior year · any GPA">
      <div className="space-y-4">
        <BarRow label="Low identity rigidity" value="11%" pct={11} />
        <BarRow label="High identity rigidity" value="33%" pct={33} highlight />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          { label: "Transfer", low: "7%", high: "21%" },
          { label: "Drop out", low: "4%", high: "12%" },
          { label: "Combined", low: "11%", high: "33%" },
        ].map((row) => (
          <div key={row.label} className="rounded-lg bg-slate-50 px-2 py-2">
            <p className="text-[10px] font-medium text-[#181A1D]/45">{row.label}</p>
            <p className="mt-1 text-xs text-[#181A1D]/55">
              <span className="tabular-nums">{row.low}</span>
              <span className="mx-0.5">→</span>
              <span className="font-bold tabular-nums text-[#956EFE]">{row.high}</span>
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs font-semibold text-[#956EFE]">3× higher risk with high rigidity</p>
    </ChartShell>
  );
}
