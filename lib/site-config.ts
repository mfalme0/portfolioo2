export const siteConfig = {
  name: "Joseph Gitau Chege",
  shortName: "Joseph Gitau",
  brand: "Mfalme\u00b70",
  role: "Technology Engineer \u00b7 Systems Architect \u00b7 IT & Cloud",
  positioning:
    "Software, infrastructure, AI, hardware and technical systems \u2014 designed, built and operated from Nairobi.",
  url: "https://mfalme.runs-on.dev",
  email: "joseph.gitau.c@gmail.com",
  phone: "+254 755 917 099",
  phoneRaw: "+254755917099",
  whatsapp: "254755917099",
  location: "Nairobi, Kenya",
  timezone: "EAT (GMT+3)",
  resume: "/Joseph_Chege.pdf",
  formspreeEndpoint: "https://formspree.io/f/xvgonqog",
  socials: {
    github: "https://github.com/mfalme0",
    linkedin: "https://linkedin.com/in/joseph-g-471678208/",
    x: "https://x.com/joemfalme001",
    instagram: "https://instagram.com/mfalme.01/",
  },
  areas: [
    "Nairobi",
    "Kiambu",
    "Kiambu County",
    "Kikuyu",
    "Limuru",
    "Ruaka",
    "Westlands",
    "Karen",
    "Kilimani",
    "Ruiru",
    "Thika",
  ],
  metrics: {
    uptime: "99.9%",
    cloudSavings: "20%",
    deploymentErrors: "45%",
    automationHours: "15+",
    internetDowntime: "50%",
    ispSupport: "90%",
    printerIssues: "40%",
  },
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string, body?: string): string {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;
}