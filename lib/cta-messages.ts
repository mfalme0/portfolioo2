const messages: Record<string, string> = {
  software: "Hi Joseph, I'd like to discuss a custom software / business system project.",
  erp: "Hi Joseph, I'd like to discuss a custom ERP / business system for my organisation.",
  infra: "Hi Joseph, I'd like to book an IT & infrastructure consultation.",
  cloud: "Hi Joseph, I'd like to discuss cloud infrastructure or cloud cost optimisation.",
  devops: "Hi Joseph, I'd like to discuss our deployments, CI/CD or DevOps setup.",
  ai: "Hi Joseph, I have a repetitive process I'd like to automate.",
  hardware: "Hi Joseph, I'd like a custom PC build. Can we talk?",
  gaming: "Hi Joseph, I'd like a custom gaming PC build. Can we talk?",
  workstation: "Hi Joseph, I'd like a custom developer or AI workstation. Can we talk?",
  upgrade: "Hi Joseph, I'd like help planning a PC upgrade.",
  fix: "Hi Joseph, I need help troubleshooting a PC problem.",
  audit: "Hi Joseph, I'd like to request an IT infrastructure audit.",
  leadership: "Hi Joseph, I'd like to discuss technical leadership / fractional CTO support.",
  general: "Hi Joseph, I'd like to talk about a project.",
};

export function whatsappCtaMessage(key: string): string {
  const normalized = key.toLowerCase();
  const keys = [
    "erp",
    "software",
    "gaming",
    "workstation",
    "audit",
    "cloud",
    "devops",
    "upgrade",
    "troubleshoot",
    "infra",
    "ai",
    "hardware",
    "leadership",
    "fix",
  ];
  for (const k of keys) {
    if (normalized.includes(k)) return messages[k];
  }
  return messages.general;
}

export function buildWaMessage(service: string | undefined, projectNote?: string): string {
  const base = service
    ? `Hi Joseph, I'd like a quote for ${service}`
    : "Hi Joseph, I'd like to talk about a project";
  const note = projectNote ? `%0A%0A${projectNote}` : "";
  return `${base}${note}`;
}

export const pcBuildWaPreset =
  "Hi Joseph, I'd like a custom PC build. Here's my use case, budget and resolution";

export const auditWaPreset = "Hi Joseph, I'd like to request a full infrastructure audit.";