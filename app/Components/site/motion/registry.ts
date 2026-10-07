"use client";

import React from "react";

import type { VisualKey } from "@/lib/case-studies";

import {
  ErpModularArchitecture,
  ErpNotificationPipeline,
  ErpAuthLayers,
  ErpDeliveryInfrastructure,
  ErpOperationsUptime,
} from "./visuals/school-erp";
import {
  AutomationDeliveryPipeline,
  AutomationAdminBurden,
  AutomationOperationalLoop,
} from "./visuals/automation";
import {
  InfraNetworkFoundation,
  InfraStorageBackups,
  InfraMonitoringOps,
  InfraDeviceOps,
} from "./visuals/infrastructure";
import {
  AtlasGraphEngine,
  AtlasDataStructures,
  AtlasScheduler,
  AtlasRaft,
  AtlasHashing,
  AtlasChaos,
  AtlasAnomaly,
  AtlasAdvisory,
  AtlasObservability,
} from "./visuals/atlas";
import {
  NexusEvidence,
  NexusPermissions,
  NexusApproval,
  NexusExplainable,
  NexusLifecycle,
  NexusPhase1,
} from "./visuals/nexus";
import {
  Cs2rgbGsi,
  Cs2rgbListener,
  Cs2rgbClient,
  Cs2rgbColourMap,
  Cs2rgbObservability,
} from "./visuals/cs2rgb";
import {
  NeoTransportAbstraction,
  NeoTransportPipeline,
  NeoStateUnification,
  NeoOfflineSync,
  NeoIdempotency,
  NeoMultitenancy,
} from "./visuals/neo-learn";
import {
  ResuCleanVerifiedProfile,
  ResuCleanFabricationGuard,
  ResuCleanAtsPipeline,
  ResuCleanJobSearch,
  ResuCleanKitGeneration,
} from "./visuals/resu-clean";

/**
 * Every visual is a pure presentational component: no props, no data fetching.
 * What it depicts lives in the case study's own copy; the graphic only
 * restates it as a picture.
 */
export type VisualComponent = React.ComponentType<Record<string, never>>;

/**
 * Key -> component map.
 *
 * `satisfies Record<VisualKey, ...>` is the load-bearing part: because
 * `VisualKey` in `lib/case-studies.tsx` is an exhaustive union of every valid
 * key, this type errors if a key has no component, and the union itself errors
 * if a case study references a key that was never implemented. Neither mistake
 * can reach a build.
 */
const REGISTRY = {
  /* school-erp */
  "erp-modular-architecture": ErpModularArchitecture,
  "erp-notification-pipeline": ErpNotificationPipeline,
  "erp-auth-layers": ErpAuthLayers,
  "erp-delivery-infrastructure": ErpDeliveryInfrastructure,
  "erp-operations-uptime": ErpOperationsUptime,

  /* automation */
  "automation-delivery-pipeline": AutomationDeliveryPipeline,
  "automation-admin-burden": AutomationAdminBurden,
  "automation-operational-loop": AutomationOperationalLoop,

  /* infrastructure */
  "infra-network-foundation": InfraNetworkFoundation,
  "infra-storage-backups": InfraStorageBackups,
  "infra-monitoring-ops": InfraMonitoringOps,
  "infra-device-ops": InfraDeviceOps,

  /* atlas */
  "atlas-graph-engine": AtlasGraphEngine,
  "atlas-data-structures": AtlasDataStructures,
  "atlas-scheduler": AtlasScheduler,
  "atlas-raft": AtlasRaft,
  "atlas-hashing": AtlasHashing,
  "atlas-chaos": AtlasChaos,
  "atlas-anomaly": AtlasAnomaly,
  "atlas-advisory": AtlasAdvisory,
  "atlas-observability": AtlasObservability,

  /* nexus */
  "nexus-evidence": NexusEvidence,
  "nexus-permissions": NexusPermissions,
  "nexus-approval": NexusApproval,
  "nexus-explainable": NexusExplainable,
  "nexus-lifecycle": NexusLifecycle,
  "nexus-phase1": NexusPhase1,

  /* cs2rgb */
  "cs2rgb-gsi": Cs2rgbGsi,
  "cs2rgb-listener": Cs2rgbListener,
  "cs2rgb-client": Cs2rgbClient,
  "cs2rgb-colour-map": Cs2rgbColourMap,
  "cs2rgb-observability": Cs2rgbObservability,

  /* resu-clean */
  "resu-clean-verified-profile": ResuCleanVerifiedProfile,
  "resu-clean-fabrication-guard": ResuCleanFabricationGuard,
  "resu-clean-ats-pipeline": ResuCleanAtsPipeline,
  "resu-clean-job-search": ResuCleanJobSearch,
  "resu-clean-kit-generation": ResuCleanKitGeneration,

  /* neo-learn */
  "neo-transport-abstraction": NeoTransportAbstraction,
  "neo-transport-pipeline": NeoTransportPipeline,
  "neo-state-unification": NeoStateUnification,
  "neo-offline-sync": NeoOfflineSync,
  "neo-idempotency": NeoIdempotency,
  "neo-multitenancy": NeoMultitenancy,
} as const satisfies Record<VisualKey, VisualComponent>;

export const VISUALS: Record<VisualKey, VisualComponent> = REGISTRY;

export function getVisual(key: VisualKey): VisualComponent {
  return VISUALS[key];
}

/**
 * Development-time check: report registered visuals that no case study uses.
 *
 * The type system guarantees the reverse direction (every key has a
 * component), but a key can still be left orphaned when a section is renamed
 * or removed. Cheap, and dev-only.
 */
export function auditVisuals(sections: { sections: { visual?: string }[] }[]) {
  if (process.env.NODE_ENV !== "development") return;

  const used = new Set(sections.flatMap(({ sections: list }) => list.map((s) => s.visual)));
  const unused = (Object.keys(VISUALS) as VisualKey[]).filter((k) => !used.has(k));
  if (unused.length > 0) {
    console.warn(`[motion] ${unused.length} visual(s) not used by any case study: ${unused.join(", ")}`);
  }
}