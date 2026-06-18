import type { ReactNode } from 'react';

import { SiNvidia, SiIntel, SiAmd, SiLogitech } from 'react-icons/si';
import {
  FaMemory, FaHdd, FaSnowflake, FaDesktop, FaThermometerHalf,
  FaKeyboard, FaWifi, FaPalette, FaClock, FaUsb, FaBolt, FaPlug,
  FaWeightHanging, FaMicrochip, FaBatteryFull, FaMusic, FaMicrophone,
  FaVolumeUp, FaTv, FaAdjust, FaShieldAlt,
} from 'react-icons/fa';
import {
  MdPowerSettingsNew, MdSpeed, MdOutlet, MdHighQuality,MdOutlineMonitor
} from 'react-icons/md';
import { BsNvidia } from 'react-icons/bs';
import { GiSoundWaves, GiElectric } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { IoMdSpeedometer } from 'react-icons/io';

export type GearCategory = 'system' | 'keyboard' | 'mouse' | 'audio' | 'display' | 'power';

export interface GearSpec {
  label: string;
  value: string;
  tag?: string;
  icon?: ReactNode;
}

export interface GearItem {
  slug: string;
  name: string;
  subtitle: string;
  category: GearCategory;
  status: 'active' | 'retired';
  image: string;
  tags?: string[];
  specs: GearSpec[];
  specLayout: 'split' | 'flat';
  imagePosition: 'left' | 'right';
  specTitle: string;
  footerLeft?: string;
  footerRight?: string;
  modelLabel?: string;
  description: string;
  story?: string;
  pros?: string[];
  cons?: string[];
  purchaseYear?: number;
  price?: string;
}

export const gearItems: GearItem[] = [
{
  slug: 'rog-strix-g18',
  name: 'ROG STRIX G18',
  subtitle: 'SYSTEM_ID: BATTLE_STATION_ALPHA // AI_DEV_WORKSTATION',
  category: 'system',
  status: 'active',
  image: '/images/gear/g18side.png',
  specs: [
    { label: 'CPU', value: 'Intel i9-14900HX', icon: <SiIntel className="text-blue-500" /> },
    { label: 'GPU', value: 'RTX 4060 (140W)', icon: <SiNvidia className="text-emerald-500" /> },
    { label: 'RAM', value: '32GB DDR5-5600', icon: <FaMemory className="text-purple-500" /> },
    { label: 'STORAGE', value: '3TB NVMe SSD', icon: <FaHdd className="text-yellow-500" /> },
    { label: 'DISPLAY', value: '18" QHD+ 240Hz', icon: <MdOutlineMonitor className="text-cyan-500" /> },
    { label: 'NETWORK', value: 'Wi-Fi 6E / 2.5G', icon: <FaWifi className="text-orange-500" /> },
    { label: 'COOLING', value: 'Tri-Fan', icon: <FaThermometerHalf className="text-red-500" /> },
  ],
  specLayout: 'flat',
  imagePosition: 'left',
  specTitle: 'HARDWARE SPECIFICATIONS',
  footerLeft: 'PERFORMANCE_PROFILE',
  footerRight: 'MAX',
  modelLabel: '// PORTABLE_WORKSTATION // ROG_STRIX_SERIES',
  description: 'Primary development workstation used for software engineering, AI experimentation, local LLM inference, infrastructure management, and high-refresh-rate gaming.',
  story: 'The ROG Strix G18 is my central powerhouse, bridging the gap between desktop performance and a portable form factor. Built around the Intel i9-14900HX, it handles intensive React Native and Next.js builds with ease while providing the CUDA cores necessary for local AI inference and GPU-accelerated workloads. The 18-inch 240Hz display offers a massive canvas for multitasking and cybersecurity research, effectively replacing the need for a multi-monitor setup when working remotely. With 3TB of NVMe storage, it serves as a mobile hub for virtualization, networking projects, and large-scale data sets.',
  tags: ['AI_DEV', 'WORKSTATION', 'GAMING'],
  pros: [
    'Desktop-class i9-14900HX performance in a laptop',
    'Stunning 18" 240Hz display with 100% DCI-P3 color',
    'Massive thermal headroom for sustained AI/Dev workloads',
    'Comprehensive I/O including Thunderbolt 4 and 2.5Gb Ethernet',
  ],
  cons: [
    'Significant weight (3.0kg) makes it less portable than ultrabooks',
    'Large power brick required for full performance',
    'High fan noise during intensive GPU-accelerated tasks',
  ],
  purchaseYear: 2025,
  price: 'KES 205,000', // Adjusted to reflect i9/G18 market pricing
},
  {
    slug: 'rog-strix-g15',
    name: 'ROG STRIX G15',
    subtitle: 'SYSTEM_ID: BATTLE_STATION_BETA // LAPTOP_RIG',
    category: 'system',
    status: 'active',
    image: '/images/gear/g513ic.png',
    specs: [
      { label: 'CPU', value: 'Ryzen 7 4800H', icon: <SiAmd className="text-orange-500" /> },
      { label: 'GPU', value: 'RTX 3050', icon: <BsNvidia className="text-emerald-500" /> },
      { label: 'RAM', value: '32GB DDR4', icon: <FaMemory className="text-purple-500" /> },
      { label: 'STORAGE', value: '1TB NVMe', icon: <FaHdd className="text-yellow-500" /> },
      { label: 'DISPLAY', value: '15.6" 144Hz', icon: <FaDesktop className="text-cyan-500" /> },
      { label: 'COOLING', value: 'Dual-Fan', icon: <FaThermometerHalf className="text-red-500" /> },
    ],
    specLayout: 'flat',
    imagePosition: 'right',
    specTitle: 'HARDWARE SPECIFICATIONS',
    footerLeft: 'MOBILITY_PROFILE',
    footerRight: 'BALANCED',
    modelLabel: '// LAPTOP_CHASSIS // G513IC',
    description: 'My secondary mobile rig — an ROG Strix G15 laptop for development on the go. Balanced performance in a portable form factor.',
    story: 'The G15 is my travel companion. When I need to code outside my desk or attend LAN events, this laptop delivers solid Ryzen 7 performance and enough GPU grunt for light gaming and CUDA experiments. 32GB RAM ensures I can run my full development stack anywhere. The 144Hz display makes everything feel smooth, and the dual-fan cooling does a respectable job keeping temps in check during longer sessions.',
    pros: [
      'Portable enough for daily carry and LAN events',
      '32GB RAM handles full dev stacks on the go',
      '144Hz display is smooth for both coding and gaming',
    ],
    cons: [
      'RTX 3050 shows its age with newer titles at 1440p',
      'Battery life is typical gaming laptop — about 3-4 hours',
      'Runs hot under sustained load, needs a cooling pad',
    ],
    purchaseYear: 2023,
    price: 'KES 135,000',
  },
  {
    slug: 'aula-f75',
    name: 'AULA F75',
    subtitle: 'KEYBOARD_CLASS: MECHANICAL // GASKET_MOUNT',
    category: 'keyboard',
    status: 'active',
    image: '/images/gear/f75.webp',
    tags: ['GASKET MOUNT', 'HOT-SWAP', 'TRI-MODE'],
    specs: [
      { label: 'LAYOUT', value: '75%', icon: <FaKeyboard className="text-red-500" />, tag: 'COMPACT' },
      { label: 'POLLING', value: '1000Hz', icon: <MdSpeed className="text-cyan-500" />, tag: 'ULTRA-FAST' },
      { label: 'RGB', value: '16.8M Colors', icon: <FaPalette className="text-pink-500" />, tag: 'PER-KEY' },
      { label: 'WIRELESS', value: '2.4GHz', icon: <FaWifi className="text-blue-500" />, tag: 'TRI-MODE' },
      { label: 'BATTERY', value: '200 Hours', icon: <FaClock className="text-green-500" />, tag: 'LONG-LIFE' },
      { label: 'CONNECT', value: 'USB-C', icon: <FaUsb className="text-yellow-500" />, tag: 'HOT-SWAP' },
    ],
    specLayout: 'split',
    imagePosition: 'left',
    specTitle: 'KEYBOARD SPECIFICATIONS',
    modelLabel: 'MODEL: F75-GASKET // 75% LAYOUT',
    description: 'A 75% gasket-mounted mechanical keyboard with tri-mode connectivity. My daily typing driver with a satisfying thock.',
    story: 'The AULA F75 is my current daily keyboard. The 75% layout saves desk space without sacrificing essential keys. Gasket mounting gives it a bouncy, responsive feel that makes typing a pleasure for hours of coding. Hot-swap sockets mean I can experiment with different switches. With 200 hours of battery life, I charge it maybe once a month. The tri-mode connectivity (2.4GHz, Bluetooth, USB-C) lets me switch between my desktop, laptop, and tablet seamlessly.',
    pros: [
      'Gasket mount provides a satisfying, bouncy typing feel',
      '200-hour battery is incredible — charges monthly',
      'Hot-swap sockets for switch experimentation',
      'Tri-mode connectivity covers all my devices',
    ],
    cons: [
      'Stock keycaps are decent but not premium',
      'The software for RGB customization is basic',
    ],
    purchaseYear: 2025,
    price: 'KES 6,500',
  },
  {
    slug: 'aula-s2022',
    name: 'AULA S2022',
    subtitle: 'KEYBOARD_CLASS: MECHANICAL // ACTIVE_SERVICE',
    category: 'keyboard',
    status: 'active',
    image: '/images/gear/s222.png',
    specs: [
      { label: 'LAYOUT', value: '104 Key', icon: <FaKeyboard className="text-red-500" />, tag: 'FULL SIZE' },
      { label: 'POLLING', value: '1000Hz', icon: <MdSpeed className="text-cyan-500" />, tag: 'STABLE' },
      { label: 'SWITCHES', value: 'Blue', icon: <FaBolt className="text-yellow-500" />, tag: 'CLICKY' },
      { label: 'RGB', value: 'Multi-Color', icon: <FaPalette className="text-pink-500" />, tag: 'EFFECTS' },
      { label: 'BUILD', value: 'Classic', icon: <FaKeyboard className="text-purple-500" />, tag: 'RELIABLE' },
      { label: 'CONNECT', value: 'USB Wired', icon: <FaPlug className="text-green-500" />, tag: 'PLUG-PLAY' },
    ],
    specLayout: 'split',
    imagePosition: 'left',
    specTitle: 'KEYBOARD SPECIFICATIONS',
    modelLabel: 'MODEL: S2022-MECH // FULL SIZE',
    description: 'A full-size mechanical keyboard with clicky blue switches. My reliable backup and typing workhorse.',
    story: 'The AULA S2022 is my no-nonsense full-size keyboard. It predates my F75 and still serves as a reliable backup. The blue clicky switches provide satisfying tactile feedback and an unmistakable sound profile that makes every keypress feel deliberate. It\'s wired, it\'s simple, and it just works. When I need a numpad for data entry or spreadsheets, this is the board I reach for.',
    pros: [
      'Full layout with numpad — great for data work',
      'Clicky blue switches are satisfying and responsive',
      'Rock-solid wired connection, zero latency',
    ],
    cons: [
      'Blue switches are loud — not ideal for shared spaces',
      'No wireless option',
      'Basic build compared to gasket-mount boards',
    ],
    purchaseYear: 2023,
    price: 'KES 3,000',
  },
  {
    slug: 'g-pro-wireless',
    name: 'G PRO WIRELESS',
    subtitle: 'DEVICE_ID: ESPORTS_MOUSE // LIGHTSPEED_ENABLED',
    category: 'mouse',
    status: 'active',
    image: '/images/gear/gpro.webp',
    specs: [
      { label: 'SENSOR', value: 'HERO 25K', icon: <FaMicrochip className="text-blue-500" />, tag: 'ZERO SMOOTHING' },
      { label: 'WIRELESS', value: 'LIGHTSPEED', icon: <FaWifi className="text-cyan-500" />, tag: '1MS LATENCY' },
      { label: 'WEIGHT', value: '80 Grams', icon: <FaWeightHanging className="text-purple-500" />, tag: 'ULTRA-LIGHT' },
      { label: 'BATTERY', value: '48-60 Hrs', icon: <FaBatteryFull className="text-green-500" />, tag: 'LONG-LIFE' },
      { label: 'CHARGING', value: 'PowerPlay', icon: <FaBolt className="text-yellow-500" />, tag: 'WIRELESS' },
      { label: 'SWITCHES', value: '50M Clicks', icon: <SiLogitech className="text-orange-500" />, tag: 'MECHANICAL' },
    ],
    specLayout: 'split',
    imagePosition: 'right',
    specTitle: 'MOUSE SPECIFICATIONS',
    modelLabel: 'MODEL: G-PRO-WIRELESS // HERO 25K',
    description: 'The gold standard of esports mice. Lightweight, wireless, and backed by Logitech\'s legendary HERO sensor.',
    story: 'The G Pro Wireless is my competitive mouse. The HERO 25K sensor tracks flawlessly on any surface, and LIGHTSPEED wireless feels indistinguishable from wired. At 80 grams, it strikes the perfect balance between lightweight agility and build solidity. Battery life is excellent — I charge it every couple of weeks with regular use. The ambidextrous shape works well for my claw grip, and the mechanical switches have held up through thousands of hours of use.',
    pros: [
      'HERO sensor is flawless — zero smoothing, perfect tracking',
      'LIGHTSPEED wireless is indistinguishable from wired',
      'Excellent build quality and battery life',
    ],
    cons: [
      '80g feels heavy compared to newer ultralight mice',
      'No USB-C charging (micro-USB)',
      'Right-side buttons can be accidentally pressed by some grip styles',
    ],
    purchaseYear: 2024,
    price: 'KES 12,000',
  },
  {
    slug: 'aula-sc660',
    name: 'AULA SC660',
    subtitle: 'DEVICE_CLASS: GAMING_MOUSE // ULTRA_LIGHTWEIGHT',
    category: 'mouse',
    status: 'active',
    image: '/images/gear/aula.png',
    specs: [
      { label: 'DPI', value: '26,000', icon: <MdSpeed className="text-red-500" />, tag: 'ULTRA-PRECISE' },
      { label: 'POLLING', value: '1000Hz', icon: <FaBolt className="text-orange-500" />, tag: 'ZERO LATENCY' },
      { label: 'WEIGHT', value: '59 Grams', icon: <FaWeightHanging className="text-cyan-500" />, tag: 'ULTRA-LIGHT' },
      { label: 'WIRELESS', value: 'Tri-Mode', icon: <FaWifi className="text-blue-500" />, tag: '2.4GHZ/BT' },
      { label: 'BATTERY', value: '150 Hours', icon: <FaClock className="text-green-500" />, tag: 'LONG-LIFE' },
      { label: 'RGB', value: 'Multi-Color', icon: <FaPalette className="text-purple-500" />, tag: 'CUSTOM' },
    ],
    specLayout: 'split',
    imagePosition: 'left',
    specTitle: 'MOUSE SPECIFICATIONS',
    modelLabel: 'MODEL: SC660-PRO // LIGHTWEIGHT CHASSIS',
    description: 'An ultralight 59g wireless gaming mouse with tri-mode connectivity and incredible battery life.',
    story: 'The AULA SC660 is my lightweight daily driver. Switching from the G Pro Wireless to this 59g mouse was eye-opening — the weight difference is immediately noticeable in fast-paced games. Tri-mode connectivity means I can use it with anything, and the 150-hour battery life is absurd. The honeycomb shell design keeps weight down while maintaining structural integrity. The 26,000 DPI sensor is overkill for my 800 DPI preference, but it tracks perfectly.',
    pros: [
      '59g is genuinely ultralight — noticeable improvement in aim',
      '150-hour battery lasts months of regular use',
      'Tri-mode works seamlessly across all devices',
    ],
    cons: [
      'Honeycomb shell can accumulate dust over time',
      'Build feels slightly less premium than the G Pro',
      'Software for DPI/RGB settings is barebones',
    ],
    purchaseYear: 2023,
    price: 'KES 4,500',
  },
  {
    slug: 'glorious-model-o',
    name: 'GLORIOUS MODEL O',
    subtitle: 'DEVICE_CLASS: GAMING_MOUSE // STATUS: RETIRED',
    category: 'mouse',
    status: 'retired',
    image: '/images/gear/model0.png',
    specs: [
      { label: 'WEIGHT', value: '67 Grams' },
      { label: 'SENSOR', value: 'BAMF' },
      { label: 'CABLE', value: 'Ascended Cord' },
      { label: 'FEET', value: 'G-Skates' },
      { label: 'SHAPE', value: 'Ambidextrous' },
      { label: 'STATUS', value: 'RETIRED' },
    ],
    specLayout: 'split',
    imagePosition: 'left',
    specTitle: 'LEGACY SPECIFICATIONS',
    footerLeft: 'STORAGE_SEALED',
    footerRight: 'RETIRED',
    modelLabel: 'MODEL: GLORIOUS-O // ARCHIVED: 2024',
    description: 'My first ultralight gaming mouse. Retired but remembered — the Glorious Model O paved the way for lightweight mice.',
    story: 'The Glorious Model O was my gateway into lightweight mice. When I first switched to it, the 67g weight felt impossibly light. The honeycomb shell, the smooth G-Skates feet, the flexible Ascended Cord — it was a revelation. I used it for over a year before moving to wireless options. It\'s now retired in storage, but it holds a special place as the mouse that showed me what was possible. The BAMF sensor still performs admirably for its age.',
    pros: [
      'Pioneered the ultralight mouse category at an accessible price',
      'Flexible Ascended Cord feels nearly wireless',
      'Ambidextrous shape works for both left and right-handed users',
    ],
    cons: [
      'Wired — once you go wireless it\'s hard to go back',
      'Honeycomb shell lets in dust and debris',
      'No longer my daily driver, outperformed by newer options',
    ],
    purchaseYear: 2022,
    price: 'KES 6,000',
  },
  {
    slug: 'kz-edx-ultra',
    name: 'KZ EDX ULTRA',
    subtitle: 'AUDIO_CLASS: IN-EAR MONITOR // HI-FI_LAB',
    category: 'audio',
    status: 'active',
    image: '/images/gear/kz-edx.png',
    specs: [
      { label: 'DRIVER', value: '10mm Dynamic', icon: <GiSoundWaves className="text-red-500" />, tag: 'FULL-RANGE' },
      { label: 'FREQ RESPONSE', value: '20Hz-40kHz', icon: <FaMusic className="text-blue-500" />, tag: 'EXTENDED' },
      { label: 'IMPEDANCE', value: '23 Ohms', icon: <FaBolt className="text-purple-500" />, tag: 'EASY DRIVE' },
      { label: 'OUTPUT', value: '108dB', icon: <FaVolumeUp className="text-emerald-500" />, tag: 'SENSITIVITY' },
      { label: 'CABLE', value: 'Detachable', icon: <FaPlug className="text-yellow-500" />, tag: '0.75MM' },
      { label: 'MIC', value: 'In-Line', icon: <FaMicrophone className="text-rose-500" />, tag: 'BUILT-IN' },
    ],
    specLayout: 'split',
    imagePosition: 'left',
    specTitle: 'IEM SPECIFICATIONS',
    modelLabel: 'MODEL: EDX_ULTRA // 10MM_DYNAMIC',
    description: 'Budget-friendly in-ear monitors with surprisingly good sound. My daily drivers for music and gaming audio.',
    story: 'The KZ EDX Ultra is my entry into the IEM world. For the price, the sound quality is exceptional — a warm, fun tuning with decent bass presence and clear highs. The 10mm dynamic driver delivers full-range audio that beats comparably priced traditional earphones by a wide margin. The detachable cable means I can replace it if it breaks (it will), and the in-line mic is handy for calls. They\'re easy to drive from any device, making them perfect for daily carry.',
    pros: [
      'Exceptional value for the audio quality',
      'Detachable cable for easy repair',
      'Comfortable for long listening sessions',
      'Easy to drive — sounds great from any source',
    ],
    cons: [
      'Stock cable is mediocre (upgrade recommended)',
      'In-line mic quality is average',
      'Can be slightly bass-heavy for neutral purists',
    ],
    purchaseYear: 2024,
    price: 'KES 2,500',
  },
  {
    slug: 'kz-castor-pro',
    name: 'KZ CASTOR PRO',
    subtitle: 'AUDIO_CLASS: IN-EAR MONITOR // SILVER_ALLOY',
    category: 'audio',
    status: 'active',
    image: '/images/gear/kz-castor-pro.png',
    specs: [
      { label: 'DRIVERS', value: '10mm x2 Dynamic', icon: <GiSoundWaves className="text-red-500" />, tag: 'DUAL' },
      { label: 'FREQ RESPONSE', value: '20Hz-40kHz', icon: <FaVolumeUp className="text-blue-500" />, tag: 'WIDE' },
      { label: 'IMPEDANCE', value: '22-40 Ohms', icon: <FaBolt className="text-purple-500" />, tag: 'HARMAN TARGET' },
      { label: 'CHASSIS', value: 'Zinc Alloy Silver', icon: <HiOutlineSparkles className="text-zinc-300" />, tag: 'PREMIUM' },
      { label: 'TUNING', value: '4-Level Switch', icon: <FaAdjust className="text-yellow-500" />, tag: 'CUSTOM' },
      { label: 'CABLE', value: '0.75mm 2-Pin', icon: <FaPlug className="text-emerald-500" />, tag: 'OFC FLAT' },
    ],
    specLayout: 'split',
    imagePosition: 'left',
    specTitle: 'IEM SPECIFICATIONS',
    modelLabel: 'MODEL: CASTOR_PRO // DUAL_10MM_DYNAMIC',
    description: 'Upgraded dual-driver IEMs with a premium zinc alloy chassis and adjustable tuning switches.',
    story: 'The KZ Castor Pro is my step up from the EDX Ultra. Dual dynamic drivers provide better separation and imaging, and the zinc alloy chassis feels substantially more premium. The standout feature is the 4-level tuning switch — a physical crossover toggle that lets me adjust the bass and treble response. It\'s a genuine differentiator that lets me tailor the sound signature to whatever I\'m listening to or playing. The silver zinc alloy finish looks stunning and resists wear.',
    pros: [
      'Dual drivers deliver excellent instrument separation',
      '4-level tuning switch is genuinely useful for different genres',
      'Zinc alloy build feels premium and durable',
      'Detachable 0.75mm 2-pin cable',
    ],
    cons: [
      'Slightly larger nozzle may not fit all ear shapes',
      'Can be a bit heavy for extended wear',
      'Tuning switch is small and fiddly to adjust',
    ],
    purchaseYear: 2025,
    price: 'KES 4,000',
  },
  {
    slug: 'logitech-g935',
    name: 'LOGITECH G935',
    subtitle: 'AUDIO_ID: WIRELESS_HEADSET // DTS_X_2.0',
    category: 'audio',
    status: 'active',
    image: '/images/gear/g935.webp',
    tags: ['PRO-G 50MM', 'LIGHTSPEED', 'FLIP-TO-MUTE'],
    specs: [
      { label: 'DRIVERS', value: '50mm Pro-G', icon: <FaVolumeUp className="text-blue-500" />, tag: 'AUDIO' },
      { label: 'SURROUND', value: 'DTS:X 2.0', icon: <GiSoundWaves className="text-purple-500" />, tag: 'IMMERSIVE' },
      { label: 'WIRELESS', value: 'LIGHTSPEED', icon: <FaWifi className="text-cyan-500" />, tag: '2.4GHZ' },
      { label: 'BATTERY', value: '12 Hours', icon: <FaBatteryFull className="text-green-500" />, tag: 'RGB ON' },
      { label: 'MIC', value: '6mm Flip-Mute', icon: <FaMicrophone className="text-yellow-500" />, tag: 'BUILT-IN' },
      { label: 'RGB', value: 'LIGHTSYNC', icon: <SiLogitech className="text-pink-500" />, tag: 'CUSTOM' },
    ],
    specLayout: 'split',
    imagePosition: 'right',
    specTitle: 'HEADSET SPECIFICATIONS',
    modelLabel: 'MODEL: G935 // PRO-G 50MM DRIVERS',
    description: 'Wireless gaming headset with DTS:X 2.0 surround sound. Immersive audio for gaming and media.',
    story: 'The G935 is my primary headset for gaming and focused work sessions. The 50mm Pro-G drivers deliver excellent sound with DTS:X 2.0 surround providing convincing spatial awareness in competitive games. LIGHTSPEED wireless keeps latency imperceptible. The flip-to-mute mic is convenient, and the 12-hour battery life (with RGB on) covers long sessions. They\'re comfortable for hours with the leatherette ear cups, though they do get warm in extended use.',
    pros: [
      'DTS:X 2.0 surround is genuinely useful for competitive gaming',
      'LIGHTSPEED wireless is rock-solid with zero perceptible latency',
      'Comfortable for long sessions',
      'Flip-to-mute mic is intuitive and convenient',
    ],
    cons: [
      '12-hour battery is adequate but not impressive',
      'Heats up during extended wear',
      'Micro-USB charging (not USB-C)',
      'Bulky design — not travel-friendly',
    ],
    purchaseYear: 2024,
    price: 'KES 18,000',
  },
  {
    slug: 'targ-27-monitor',
    name: 'TARG 27" MONITOR',
    subtitle: 'DISPLAY_ID: VISUAL_COMMAND // QHD_165HZ',
    category: 'display',
    status: 'active',
    image: '/images/gear/tar-g.png',
    tags: ['QHD 2560x1440', '180Hz', 'IPS', 'FreeSync'],
    specs: [
      { label: 'RESOLUTION', value: '1440p QHD', icon: <MdHighQuality className="text-cyan-500" />, tag: '2560x1440' },
      { label: 'REFRESH', value: '180Hz', icon: <IoMdSpeedometer className="text-green-500" />, tag: 'HIGH-FPS' },
      { label: 'PANEL', value: 'IPS 27"', icon: <FaTv className="text-purple-500" />, tag: 'FAST RESPONSE' },
      { label: 'RESPONSE', value: '1ms (GtG)', icon: <FaClock className="text-yellow-500" />, tag: 'ULTRA-FAST' },
      { label: 'COLOR', value: '99% sRGB', icon: <FaPalette className="text-pink-500" />, tag: 'ACCURATE' },
      { label: 'ADAPTIVE', value: 'FreeSync', icon: <FaAdjust className="text-orange-500" />, tag: 'TEAR-FREE' },
    ],
    specLayout: 'split',
    imagePosition: 'right',
    specTitle: 'DISPLAY SPECIFICATIONS',
    modelLabel: 'MODEL: TARG-27 // IPS // 165HZ',
    description: '27-inch QHD IPS monitor with 165Hz refresh rate. A perfect balance of resolution, speed, and color accuracy.',
    story: 'The TARG 27" is my primary display. The jump from 1080p to 1440p QHD was transformative for both coding and gaming — so much more screen real estate for IDEs and terminals, while games look significantly sharper. 165Hz keeps everything buttery smooth, and the IPS panel provides great viewing angles and 99% sRGB accuracy for design work. 1ms response and FreeSync eliminate tearing in games. It\'s the sweet spot of display technology for a multipurpose setup.',
    pros: [
      '1440p at 27" is the perfect pixel density for desktop use',
      '165Hz is smooth for both desktop navigation and gaming',
      'IPS panel with good color accuracy for design work',
      '1ms response and FreeSync for tear-free gaming',
    ],
    cons: [
      'No built-in speakers',
      'Stand is functional but basic (VESA mount recommended)',
      'HDR performance is entry-level — not HDR600+',
    ],
    purchaseYear: 2024,
    price: 'KES 30,000',
  },
  {
    slug: 'apc-back-ups-1400va',
    name: 'APC BACK-UPS 1400VA',
    subtitle: 'POWER_ID: BACKUP_PROTECTION // SURGE_PROTECTED',
    category: 'power',
    status: 'active',
    image: '/images/gear/ups.png',
    tags: ['READY'],
    specs: [
      { label: 'CAPACITY', value: '1400 VA', icon: <GiElectric className="text-red-500" />, tag: 'POWER RATING' },
      { label: 'OUTPUT', value: '810 Watts', icon: <FaBolt className="text-orange-500" />, tag: 'MAX LOAD' },
      { label: 'OUTLETS', value: '10 Total', icon: <MdOutlet className="text-purple-500" />, tag: '5+5 SURGE/BAT' },
      { label: 'RUNTIME', value: '12 Min', icon: <FaClock className="text-cyan-500" />, tag: '@400W LOAD' },
      { label: 'BATTERY', value: 'SLA Pack', icon: <FaBatteryFull className="text-green-500" />, tag: 'REPLACEABLE' },
      { label: 'PROTECTION', value: 'Surge+Lightning', icon: <FaShieldAlt className="text-blue-500" />, tag: 'SHIELDED' },
    ],
    specLayout: 'split',
    imagePosition: 'right',
    specTitle: 'POWER SPECIFICATIONS',
    modelLabel: 'MODEL: BX1400U-MS // TOWER CONFIG',
    description: 'Uninterruptible power supply protecting my entire setup. 1400VA capacity with surge and lightning protection.',
    story: 'The APC Back-UPS 1400VA sits at the heart of my setup, protecting everything from the desktop and monitor to network gear. With 10 outlets (5 surge-only, 5 battery-backed), I have everything critical covered. The 810W output handles my full load with room to spare, and the 12-minute runtime at typical load gives me plenty of time to save work and shut down gracefully during outages. Being in Kenya where power fluctuations are common, this UPS has paid for itself many times over.',
    pros: [
      'Plenty of capacity for a full desktop setup plus peripherals',
      '10 outlets cover all critical devices',
      'Replaceable SLA battery extends service life',
      'Surge and lightning protection for peace of mind',
    ],
    cons: [
      'SLA battery is heavy and takes space',
      '12-minute runtime is enough for safe shutdown but not extended work',
      'No USB-C or modern connectivity ports',
    ],
    purchaseYear: 2025,
    price: 'KES 25,000',
  },
];

export function getGearItem(slug: string): GearItem | undefined {
  return gearItems.find(item => item.slug === slug);
}

export function getGearItemsByCategory(category: GearCategory): GearItem[] {
  return gearItems.filter(item => item.category === category);
}

export function getRelatedGearItems(item: GearItem, limit = 3): GearItem[] {
  return gearItems
    .filter(i => i.category === item.category && i.slug !== item.slug)
    .slice(0, limit);
}
