import { EdgeFlowPacketsLazy } from "@/components/landing/edge-flow-packets-lazy";
import { landingConfig } from "@/config";

const VIEW_WIDTH = 720;
const HUB = { x: 372, y: 205 };
const GATEWAY_PORT_RADIUS = 3;
const GATEWAY_PORT_DISTANCE = 26;
const GATEWAY_PORTS = [0, 120, 180, 240];
const GATEWAY_EGRESS_ANGLE = 0;
const SPOKE_RADIUS = 118;
const USER = { x: 618, y: 205 };
const SOURCES_LABEL_X = 56;

const WIRED_SOURCE_NODES: Point[] = [
  { x: 56, y: 158 },
  { x: 56, y: 205 },
  { x: 56, y: 252 },
];

type SourceDot = Point & {
  radius: number;
  opacity: number;
  wired: boolean;
};

function buildSourceDots(): SourceDot[] {
  const ambientPositions: Point[] = [
    { x: 44, y: 102 },
    { x: 50, y: 118 },
    { x: 42, y: 132 },
    { x: 48, y: 146 },
    { x: 46, y: 174 },
    { x: 52, y: 188 },
    { x: 44, y: 222 },
    { x: 50, y: 236 },
    { x: 42, y: 264 },
    { x: 48, y: 278 },
    { x: 46, y: 292 },
    { x: 52, y: 306 },
  ];

  const centerY = 205;
  const ambient = ambientPositions.map((point) => {
    const dist = Math.abs(point.y - centerY);
    const edge = dist > 72;
    return {
      ...point,
      radius: edge ? 2.5 : 3.5,
      opacity: edge ? 0.32 : 0.58,
      wired: false,
    };
  });

  const wired = WIRED_SOURCE_NODES.map((point) => ({
    ...point,
    radius: 5,
    opacity: 1,
    wired: true,
  }));

  return [...ambient, ...wired].sort((a, b) => a.y - b.y);
}

function polarPoint(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number,
): Point {
  const angle = (angleDeg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

function spokeAngles(count: number): number[] {
  const start = 115;
  const end = 245;
  if (count <= 1) {
    return [180];
  }
  const step = (end - start) / (count - 1);
  return Array.from({ length: count }, (_, index) => start + step * index);
}

function linePath(x1: number, y1: number, x2: number, y2: number): string {
  return `M ${x1} ${y1} L ${x2} ${y2}`;
}

type Point = { x: number; y: number };

/** Wired source → entry spoke, then every pipeline step in order, then gateway → consume. */
function buildWiredFlowRoutes(spokes: SpokeNode[]): Point[][] {
  const lastIndex = spokes.length - 1;

  return WIRED_SOURCE_NODES.map((source, sourceIndex) => {
    const entryIndex = sourceIndex % spokes.length;
    const points: Point[] = [source, spokes[entryIndex]];

    for (let index = entryIndex - 1; index >= 0; index -= 1) {
      points.push(spokes[index]);
    }

    for (let index = 1; index <= lastIndex; index += 1) {
      points.push(spokes[index]);
    }

    const egressSpoke = spokes[lastIndex];
    points.push(gatewayPortAt(egressSpoke.angle));
    points.push(HUB);
    points.push(gatewayEgressPort());
    points.push(USER);

    return points;
  });
}

type SpokeNode = Point & { label: string; angle: number };

type WebEdge = {
  from: Point;
  to: Point;
  stream: boolean;
};

function gatewayPortAt(angleDeg: number): Point {
  return polarPoint(HUB.x, HUB.y, GATEWAY_PORT_DISTANCE, angleDeg);
}

function gatewayEgressPort(): Point {
  return gatewayPortAt(GATEWAY_EGRESS_ANGLE);
}

function buildSpokeNodes(labels: readonly string[]): SpokeNode[] {
  return spokeAngles(labels.length).map((angle, index) => {
    const point = polarPoint(HUB.x, HUB.y, SPOKE_RADIUS, angle);
    return { ...point, label: labels[index], angle };
  });
}

function buildWebEdges(spokes: SpokeNode[]): WebEdge[] {
  const edges: WebEdge[] = [];

  for (const spoke of spokes) {
    edges.push({
      from: gatewayPortAt(spoke.angle),
      to: spoke,
      stream: true,
    });
  }

  edges.push({
    from: gatewayEgressPort(),
    to: USER,
    stream: true,
  });

  for (let index = 0; index < spokes.length - 1; index += 1) {
    edges.push({
      from: spokes[index],
      to: spokes[index + 1],
      stream: false,
    });
  }

  WIRED_SOURCE_NODES.forEach((source, sourceIndex) => {
    const primary = spokes[sourceIndex % spokes.length];
    const secondary = spokes[(sourceIndex + 2) % spokes.length];
    edges.push({ from: source, to: primary, stream: false });
    edges.push({ from: source, to: secondary, stream: false });
  });

  return edges;
}

function labelPosition(node: SpokeNode): Point {
  return polarPoint(HUB.x, HUB.y, SPOKE_RADIUS + 48, node.angle);
}

function PipelineStepLabel({
  x,
  y,
  label,
}: {
  x: number;
  y: number;
  label: string;
}) {
  const words = label.split(" ");
  const useTwoLines = words.length >= 2 && label.length > 11;
  const line1 = useTwoLines
    ? words.slice(0, Math.ceil(words.length / 2)).join(" ")
    : label;
  const line2 = useTwoLines
    ? words.slice(Math.ceil(words.length / 2)).join(" ")
    : null;

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      className="edge-pipeline-label fill-foreground font-sans"
    >
      {line2 ? (
        <>
          <tspan x={x} dy="-0.5em">{line1}</tspan>
          <tspan x={x} dy="1.2em">{line2}</tspan>
        </>
      ) : (
        label
      )}
    </text>
  );
}

function GatewayEdgeStructure() {
  const ports = GATEWAY_PORTS.map((angle) =>
    polarPoint(0, 0, GATEWAY_PORT_DISTANCE, angle),
  );

  return (
    <g transform={`translate(${HUB.x}, ${HUB.y})`}>
      {ports.map((port, index) => (
        <line
          key={`gateway-link-${index}`}
          x1={0}
          y1={0}
          x2={port.x}
          y2={port.y}
          className="stroke-primary/45"
          strokeWidth="1"
        />
      ))}
      <rect
        x={-15}
        y={-11}
        width={30}
        height={22}
        rx={5}
        className="fill-primary/20 stroke-primary"
        strokeWidth="1.25"
      />
      <rect
        x={-7}
        y={-4}
        width={14}
        height={8}
        rx={2}
        className="fill-primary/35"
      />
      {ports.map((port, index) => (
        <circle
          key={`gateway-port-${index}`}
          cx={port.x}
          cy={port.y}
          r={GATEWAY_PORT_RADIUS}
          className="fill-background stroke-primary"
          strokeWidth="1"
        />
      ))}
    </g>
  );
}

export function EdgeVisual() {
  const { accessibleName, stages, pipelineSteps, consumerLabel } =
    landingConfig.edgeVisual;
  const [sourcesLabel, gatewayLabel, consumeLabel] = stages;

  const spokes = buildSpokeNodes(pipelineSteps);
  const webEdges = buildWebEdges(spokes);
  const sourceDots = buildSourceDots();
  const flowRoutes = buildWiredFlowRoutes(spokes);

  return (
    <div
      className="min-w-0 w-full overflow-hidden border border-border bg-card aspect-[720/420]"
    >
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} 420`}
        role="img"
        aria-label={accessibleName}
        className="h-full w-full text-foreground"
        width={VIEW_WIDTH}
        height={420}
      >
        {webEdges.map((edge, index) => {
          const path = linePath(edge.from.x, edge.from.y, edge.to.x, edge.to.y);

          return (
            <g key={`edge-${index}`}>
              <path
                d={path}
                fill="none"
                className="stroke-border"
                strokeWidth="1"
              />
              {edge.stream && (
                <path
                  d={path}
                  fill="none"
                  className="edge-stream stroke-primary/80"
                  strokeWidth="1.35"
                  style={{ animationDelay: `${index * 0.22}s` }}
                />
              )}
            </g>
          );
        })}

        {sourceDots.map((node, index) => (
          <circle
            key={`source-${node.x}-${node.y}-${node.wired}`}
            cx={node.x}
            cy={node.y}
            r={node.radius}
            className={
              node.wired
                ? "edge-source-node fill-background stroke-foreground"
                : "edge-source-ambient fill-muted-foreground/25 stroke-muted-foreground/45"
            }
            strokeWidth={node.wired ? 1.25 : 1}
            opacity={node.opacity}
            style={node.wired ? { animationDelay: `${index * 120}ms` } : undefined}
          />
        ))}

        {spokes.map((node, index) => {
          const label = labelPosition(node);
          return (
            <g key={node.label}>
              <circle
                cx={node.x}
                cy={node.y}
                r="11"
                className="edge-pipeline-step fill-muted/90 stroke-border"
                strokeWidth="1"
                style={{ animationDelay: `${index * 160}ms` }}
              />
              <circle cx={node.x} cy={node.y} r="3.5" className="fill-primary" />
              <PipelineStepLabel
                x={label.x}
                y={label.y}
                label={node.label}
              />
            </g>
          );
        })}

        <g className="edge-gateway-core">
          <GatewayEdgeStructure />
        </g>

        <circle
          cx={USER.x}
          cy={USER.y}
          r="10"
          className="edge-user-node fill-primary stroke-background"
          strokeWidth="2"
        >
          <title>{consumerLabel}</title>
        </circle>
        <text
          x={USER.x}
          y={USER.y + 28}
          textAnchor="middle"
          className="edge-consumer-label fill-foreground font-sans"
        >
          {consumerLabel}
        </text>

        <EdgeFlowPacketsLazy routes={flowRoutes} />

        <text
          x={SOURCES_LABEL_X}
          y="398"
          textAnchor="middle"
          className="edge-stage-label fill-muted-foreground font-sans"
        >
          {sourcesLabel}
        </text>
        <text
          x={HUB.x}
          y="398"
          textAnchor="middle"
          className="edge-stage-label edge-stage-label-brand fill-primary font-sans"
        >
          {gatewayLabel}
        </text>
        <text
          x={USER.x}
          y="398"
          textAnchor="middle"
          className="edge-stage-label fill-muted-foreground font-sans"
        >
          {consumeLabel}
        </text>
      </svg>
    </div>
  );
}
