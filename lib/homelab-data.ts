/**
 * Homelab content model.
 *
 * Deliberately free of JSX so the data can cross the server/client boundary:
 * spec icons are stored as stable keys and mapped to components in the UI.
 */

export type HomelabCategory = 'server' | 'network' | 'storage' | 'infrastructure';

export type ServiceStatus = 'active' | 'passive' | 'planned';

export type HomelabNodeStatus = 'active' | 'retired' | 'planned';

export type SpecIconKey = 'cpu' | 'ram' | 'storage' | 'os' | 'docker' | 'model';

export interface HomelabService {
  name: string;
  description?: string;
  url?: string;
  port?: number;
  status: ServiceStatus;
  dockerHubUrl?: string;
  icon?: string;
}

export interface HomelabSpec {
  label: string;
  value: string;
  icon: SpecIconKey;
  tag?: string;
}

export interface HomelabItem {
  slug: string;
  name: string;
  subtitle: string;
  model: string;
  cpu: string;
  ram: string;
  storage: string;
  os: string;
  dockerWrapper: string;
  category: HomelabCategory;
  status: HomelabNodeStatus;
  image: string;
  gallery?: string[];
  tags?: string[];
  specs: HomelabSpec[];
  specTitle: string;
  description: string;
  story: string;
  services: HomelabService[];
  ups?: {
    summary: string;
    gearUrl: string;
  };
  purchaseYear?: number;
  price?: string;
}

export const homelabItems: readonly HomelabItem[] = [
  {
    slug: 'potato',
    name: 'Potato',
    subtitle: 'NODE_ID: POTATO_PRIMARY // MEDIA_AUTOMATION_HUB',
    model: 'HP ProDesk 600 G2 MT',
    cpu: 'Intel Core i5-6500',
    ram: '32GB DDR4',
    storage: '10TB',
    os: 'Debian 13',
    dockerWrapper: 'CasaOS',
    category: 'server',
    status: 'active',
    image: '/images/homelab/potato.png',
    tags: ['MEDIA SERVER', 'DOCKER HOST', '24/7'],
    specs: [
      { label: 'CPU', value: 'Intel Core i5-6500', icon: 'cpu', tag: '4C/4T' },
      { label: 'RAM', value: '32GB DDR4', icon: 'ram', tag: 'SODIMM' },
      { label: 'STORAGE', value: '10TB', icon: 'storage', tag: 'MEDIA POOL' },
      { label: 'OS', value: 'Debian 13', icon: 'os', tag: 'LINUX' },
      { label: 'DOCKER', value: 'CasaOS', icon: 'docker', tag: 'WRAPPER' },
      { label: 'MODEL', value: 'HP ProDesk 600 G2 MT', icon: 'model', tag: 'SFF' },
    ],
    specTitle: 'MACHINE SPECIFICATIONS',
    description:
      'The primary media and automation server. Runs the full *arr stack alongside Jellyfin, photo management, and home automation services — all containerized under CasaOS on Debian 13.',
    story:
      'Potato is the workhorse of the homelab. Built on an HP ProDesk 600 G2 MT, it started as a modest media server and grew into a full-stack automation hub. The i5-6500 with 32GB of DDR4 handles concurrent transcodes and a large container footprint without breaking a sweat, and the 10TB storage pool keeps the media library growing. CasaOS provides a clean web dashboard for managing all the Docker containers, while Debian 13 keeps the foundation rock-solid. This machine runs 24/7 and handles everything from automated media acquisition to home automation, photo backup, and git hosting.',
    services: [
      {
        name: 'Prowlarr',
        description: 'Usenet and torrent indexer management',
        port: 9696,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/linuxserver/prowlarr',
        icon: '/images/homelab/services/prowlarr.png',
      },
      {
        name: 'Radarr',
        description: 'Movie collection automation',
        port: 7878,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/linuxserver/radarr',
        icon: '/images/homelab/services/radarr.png',
      },
      {
        name: 'Sonarr',
        description: 'TV series collection automation',
        port: 8989,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/linuxserver/sonarr',
        icon: '/images/homelab/services/sonarr.png',
      },
      {
        name: 'Jellyfin',
        description: 'Media streaming server',
        port: 8096,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/jellyfin/jellyfin',
        icon: '/images/homelab/services/jellyfin.png',
      },
      {
        name: 'Beszel',
        description: 'Lightweight server monitoring',
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/henrygd/beszel',
        icon: '/images/homelab/services/beszel.png',
      },
      {
        name: 'Portainer',
        description: 'Docker container management UI',
        port: 9000,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/portainer/portainer-ce',
        icon: '/images/homelab/services/portainer.png',
      },
      {
        name: 'Navidrome',
        description: 'Personal music streaming server',
        port: 4533,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/deluan/navidrome',
        icon: '/images/homelab/services/navidrome.png',
      },
      {
        name: 'Immich',
        description: 'Photo and video backup and management',
        port: 2283,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/immich/immich-server',
        icon: '/images/homelab/services/immich.png',
      },
      {
        name: 'qBittorrent',
        description: 'Torrent download client',
        port: 8080,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/linuxserver/qbittorrent',
        icon: '/images/homelab/services/qbittorrent.png',
      },
      {
        name: 'Peanut',
        description: 'UPS monitoring dashboard for Network UPS Tools',
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/brandawg93/peanut',
        icon: '/images/homelab/services/peanut.png',
      },
      {
        name: 'Jellyseerr',
        description: 'Media request management for Jellyfin',
        port: 5055,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/fallenbagel/jellyseerr',
        icon: '/images/homelab/services/jellyseerr.png',
      },
      {
        name: 'ESPHome',
        description: 'ESP32/ESP8266 device firmware management',
        port: 6052,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/esphome/esphome',
        icon: '/images/homelab/services/esphome.png',
      },
      {
        name: 'MusicAssistant',
        description: 'Music library management and streaming',
        port: 8095,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/musicassistant/musicassistant',
        icon: '/images/homelab/services/music-assistant.png',
      },
      {
        name: 'Dozzle',
        description: 'Real-time Docker log viewer',
        port: 8081,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/amir20/dozzle',
        icon: '/images/homelab/services/dozzle.png',
      },
      {
        name: 'pyLoad',
        description: 'One-click file download manager',
        port: 8000,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/linuxserver/pyload',
        icon: '/images/homelab/services/pyload.png',
      },
      {
        name: 'Lidarr',
        description: 'Music collection automation',
        port: 8686,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/linuxserver/lidarr',
        icon: '/images/homelab/services/lidarr.png',
      },
      {
        name: 'CraftyController',
        description: 'Minecraft server management',
        port: 8443,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/arcadiatechnology/crafty-4',
        icon: '/images/homelab/services/crafty.png',
      },
      {
        name: 'MySpeed',
        description: 'Internet speed test tracking',
        port: 5217,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/germannewsmaker/myspeed',
        icon: '/images/homelab/services/myspeed.png',
      },
      {
        name: 'Downtify',
        description: 'Service uptime and downtime monitoring',
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/henriquesebastiao/downtify',
        icon: '/images/homelab/services/downtify.png',
      },
      {
        name: 'Gitea',
        description: 'Self-hosted Git service',
        port: 3000,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/gitea/gitea',
        icon: '/images/homelab/services/gitea.png',
      },
      {
        name: 'Tautulli',
        description: 'Plex usage monitoring and statistics',
        port: 8181,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/linuxserver/tautulli',
      },
      {
        name: 'Scrutiny',
        description: 'S.M.A.R.T. monitoring and hard drive health',
        port: 8080,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/analogj/scrutiny',
      },
      {
        name: 'Plex',
        description: 'Media streaming server',
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/linuxserver/plex',
      },
      {
        name: 'Homebox',
        description: 'Home inventory and asset management',
        port: 7745,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/sysadminsmedia/homebox',
      },
    ],
    purchaseYear: 2025,
    price: 'KES 18,000',
    ups: {
      summary: 'Protected by the APC Back-UPS BX1400UI (1400 VA / 700 W) — the larger unit that carries everything else on the rack, including this node, the media stack, and home automation.',
      gearUrl: '/setup/ups/apc-back-ups-bx1400ui',
    },
  },
  {
    slug: 'small-potato',
    name: 'Small Potato',
    subtitle: 'NODE_ID: POTATO_SECONDARY // DIETPI_FAILOVER',
    model: 'Lenovo ThinkPad X230',
    cpu: 'Intel Core i5-3320M',
    ram: '6GB DDR3',
    storage: '500GB SSD',
    os: 'DietPi',
    dockerWrapper: 'CasaOS',
    category: 'server',
    status: 'active',
    image: '/images/homelab/small-potato.png',
    tags: ['FAILOVER', 'HOME AUTOMATION', 'LOW POWER'],
    specs: [
      { label: 'CPU', value: 'Intel Core i5-3320M', icon: 'cpu', tag: '2C/4T' },
      { label: 'RAM', value: '6GB DDR3', icon: 'ram', tag: 'SODIMM' },
      { label: 'STORAGE', value: '500GB SSD', icon: 'storage', tag: 'BOOT DRIVE' },
      { label: 'OS', value: 'DietPi', icon: 'os', tag: 'LIGHTWEIGHT' },
      { label: 'DOCKER', value: 'CasaOS', icon: 'docker', tag: 'WRAPPER' },
      { label: 'MODEL', value: 'Lenovo ThinkPad X230', icon: 'model', tag: 'MOBILE' },
    ],
    specTitle: 'MACHINE SPECIFICATIONS',
    description:
      'A low-power secondary node running home automation and camera surveillance. Doubles as a media failover during outages.',
    story:
      'Small Potato started as a spare laptop and found its purpose as a dedicated home automation controller. Running DietPi — an ultra-lightweight Debian variant optimized for SBCs and low-power hardware — it sips power while running 24/7. Home Assistant handles all smart home devices, MotionEye manages IP cameras, and Portainer keeps everything containerized. Peanut provides UPS monitoring via Network UPS Tools so critical services stay alive when the power goes out, and Tailscale keeps the node reachable from anywhere. The backup Jellyfin and Navidrome instances ensure media streaming never skips a beat.',
    services: [
      {
        name: 'Home Assistant',
        description: 'Home automation platform',
        port: 8123,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/homeassistant/home-assistant',
        icon: '/images/homelab/services/home-assistant.png',
      },
      {
        name: 'MotionEye',
        description: 'IP camera surveillance system',
        port: 8765,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/ccrisan/motioneye',
        icon: '/images/homelab/services/motioneye.png',
      },
      {
        name: 'Portainer',
        description: 'Docker container management UI',
        port: 9000,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/portainer/portainer-ce',
        icon: '/images/homelab/services/portainer.png',
      },
      {
        name: 'Peanut',
        description: 'UPS monitoring dashboard for Network UPS Tools',
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/brandawg93/peanut',
        icon: '/images/homelab/services/peanut.png',
      },
      {
        name: 'Jellyfin',
        description: 'Media streaming failover',
        port: 8096,
        status: 'passive',
        dockerHubUrl: 'https://hub.docker.com/r/jellyfin/jellyfin',
        icon: '/images/homelab/services/jellyfin.png',
      },
      {
        name: 'Navidrome',
        description: 'Music streaming failover',
        port: 4533,
        status: 'passive',
        dockerHubUrl: 'https://hub.docker.com/r/deluan/navidrome',
        icon: '/images/homelab/services/navidrome.png',
      },
      {
        name: 'Scrutiny',
        description: 'S.M.A.R.T. monitoring and hard drive health',
        port: 8080,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/analogj/scrutiny',
      },
      {
        name: 'Plex',
        description: 'Media streaming server',
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/linuxserver/plex',
      },
      {
        name: 'Tailscale',
        description: 'Mesh VPN for remote access',
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/tailscale/tailscale',
      },
      {
        name: 'Filebrowser',
        description: 'Web file manager',
        port: 80,
        status: 'active',
        dockerHubUrl: 'https://hub.docker.com/r/filebrowser/filebrowser',
      },
    ],
    purchaseYear: 2024,
    price: 'KES 8,000',
    ups: {
      summary: 'Protected by the APC Back-UPS BX1400UI (1400 VA / 700 W). Peanut provides UPS monitoring via Network UPS Tools so critical services stay alive when the power goes out.',
      gearUrl: '/setup/ups/apc-back-ups-bx1400ui',
    },
  },
];

export function getHomelabItem(slug: string): HomelabItem | undefined {
  return homelabItems.find((item) => item.slug === slug);
}

export function getRelatedHomelabItems(item: HomelabItem, limit = 2): HomelabItem[] {
  return homelabItems.filter((i) => i.slug !== item.slug).slice(0, limit);
}

function toGigabytes(value: string): number {
  const match = value.match(/([\d.]+)\s*(TB|GB)/i);
  if (!match) return 0;
  const amount = Number(match[1]);
  return /tb/i.test(match[2]) ? amount * 1024 : amount;
}

function formatStorage(gigabytes: number): string {
  if (gigabytes >= 1024) {
    return `${(gigabytes / 1024).toFixed(1).replace(/\.0$/, '')} TB`;
  }
  return `${gigabytes} GB`;
}

export interface HomelabStats {
  nodes: number;
  services: number;
  activeServices: number;
  passiveServices: number;
  plannedServices: number;
  storageLabel: string;
  ramLabel: string;
}

/** Aggregate numbers for the index stat strip, derived rather than hardcoded. */
export function getHomelabStats(): HomelabStats {
  const services = homelabItems.flatMap((item) => item.services);
  const storageGb = homelabItems.reduce((total, item) => total + toGigabytes(item.storage), 0);
  const ramGb = homelabItems.reduce((total, item) => total + toGigabytes(item.ram), 0);

  return {
    nodes: homelabItems.length,
    services: services.length,
    activeServices: services.filter((service) => service.status === 'active').length,
    passiveServices: services.filter((service) => service.status === 'passive').length,
    plannedServices: services.filter((service) => service.status === 'planned').length,
    storageLabel: formatStorage(storageGb),
    ramLabel: formatStorage(ramGb),
  };
}
