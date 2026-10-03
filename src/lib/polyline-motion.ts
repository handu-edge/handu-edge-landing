export type PolylinePoint = { x: number; y: number };

function segmentLength(a: PolylinePoint, b: PolylinePoint): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

export function polylineLength(points: readonly PolylinePoint[]): number {
  let total = 0;
  for (let index = 1; index < points.length; index += 1) {
    total += segmentLength(points[index - 1], points[index]);
  }
  return total;
}

/** `progress` in [0, 1) — position on the polyline, segment by segment. */
export function pointOnPolyline(
  points: readonly PolylinePoint[],
  progress: number,
): PolylinePoint {
  if (points.length === 0) {
    return { x: 0, y: 0 };
  }
  if (points.length === 1) {
    return points[0];
  }

  const total = polylineLength(points);
  if (total === 0) {
    return points[0];
  }

  const wrapped = ((progress % 1) + 1) % 1;
  let remaining = wrapped * total;

  for (let index = 1; index < points.length; index += 1) {
    const start = points[index - 1];
    const end = points[index];
    const length = segmentLength(start, end);
    if (remaining <= length) {
      const ratio = length === 0 ? 0 : remaining / length;
      return {
        x: start.x + (end.x - start.x) * ratio,
        y: start.y + (end.y - start.y) * ratio,
      };
    }
    remaining -= length;
  }

  return points[points.length - 1];
}
