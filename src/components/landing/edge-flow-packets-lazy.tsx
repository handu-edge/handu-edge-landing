"use client";

import dynamic from "next/dynamic";

import type { PolylinePoint } from "@/lib/polyline-motion";

export const EdgeFlowPacketsLazy = dynamic(
  () =>
    import("@/components/landing/edge-flow-packets").then(
      (module) => module.EdgeFlowPackets,
    ),
  { ssr: false },
);

export type { PolylinePoint };
