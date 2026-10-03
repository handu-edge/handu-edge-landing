import type { PlatformVisualId } from "@/types/config";
import { cn } from "@/lib/utils";

type PlatformVisualProps = {
  id: PlatformVisualId;
  label: string;
  className?: string;
};

export function PlatformVisual({ id, label, className }: PlatformVisualProps) {
  switch (id) {
    case "hero-split":
      return <HeroSplitVisual label={label} className={className} />;
    case "pipeline":
      return <PipelineVisual label={label} className={className} />;
    case "domains":
      return <DomainsVisual label={label} className={className} />;
    default:
      return null;
  }
}

function VisualFrame({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden border border-border bg-card",
        className,
      )}
    >
      {children}
      <p className="sr-only">{label}</p>
    </div>
  );
}

function HeroSplitVisual({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <VisualFrame label={label} className={className}>
      <svg viewBox="0 0 560 360" role="img" aria-label={label} className="w-full">
        <rect
          x="24"
          y="48"
          width="220"
          height="264"
          rx="8"
          className="fill-foreground/8"
        />
        <rect
          x="316"
          y="48"
          width="220"
          height="264"
          rx="8"
          className="fill-primary/15"
        />
        <line
          x1="280"
          y1="48"
          x2="280"
          y2="312"
          className="stroke-primary"
          strokeWidth="2"
        />
        {[96, 152, 208, 264].map((y) => (
          <circle
            key={`c-${y}`}
            cx="134"
            cy={y}
            r="5"
            className="fill-foreground/70"
          />
        ))}
        {[88, 144, 200, 256].map((y, index) => (
          <rect
            key={`w-${y}`}
            x="368"
            y={y - 10}
            width="116"
            height="20"
            rx="4"
            className="fill-primary/40"
            opacity={0.55 + index * 0.12}
          />
        ))}
        <path
          d="M168 180 H248"
          className="platform-flow stroke-primary"
          fill="none"
          strokeWidth="1.5"
        />
        <text
          x="134"
          y="332"
          textAnchor="middle"
          className="fill-muted-foreground font-sans text-[11px] uppercase tracking-[0.16em]"
        >
          Consume
        </text>
        <text
          x="426"
          y="332"
          textAnchor="middle"
          className="fill-primary font-sans text-[11px] uppercase tracking-[0.16em]"
        >
          Operate
        </text>
      </svg>
    </VisualFrame>
  );
}

function PipelineVisual({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <VisualFrame label={label} className={className}>
      <svg viewBox="0 0 560 280" role="img" aria-label={label} className="w-full">
        <path
          d="M40 200 C120 80, 200 220, 280 120 S440 60, 520 140"
          fill="none"
          className="stroke-border"
          strokeWidth="1.25"
        />
        <path
          d="M40 200 C120 80, 200 220, 280 120 S440 60, 520 140"
          fill="none"
          className="platform-flow stroke-primary"
          strokeWidth="2"
        />
        {[40, 160, 280, 400, 520].map((x, index) => (
          <circle
            key={x}
            cx={x}
            cy={index % 2 === 0 ? 200 : 120}
            r="5"
            className={index < 2 ? "fill-foreground/50" : "fill-primary"}
          />
        ))}
      </svg>
    </VisualFrame>
  );
}

function DomainsVisual({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const nodes = [
    [120, 80],
    [280, 56],
    [440, 88],
    [88, 180],
    [280, 168],
    [472, 196],
    [160, 252],
    [400, 236],
  ];

  return (
    <VisualFrame label={label} className={className}>
      <svg viewBox="0 0 560 300" role="img" aria-label={label} className="w-full">
        <circle
          cx="280"
          cy="150"
          r="28"
          className="fill-primary/25 stroke-primary"
          strokeWidth="1.5"
        />
        {nodes.map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <line
              x1={cx}
              y1={cy}
              x2="280"
              y2="150"
              className="stroke-border"
              strokeWidth="1"
            />
            <circle cx={cx} cy={cy} r="6" className="fill-foreground/60" />
          </g>
        ))}
      </svg>
    </VisualFrame>
  );
}
