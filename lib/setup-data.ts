export interface SetupCategory {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  detail: string;
}

export interface SetupDevice {
  slug: string;
  category: string;
  name: string;
  brand: string;
  model: string;
  status: "current" | "previous";
  summary: string;
  role: string;
  why: string;
  dailyUse: string;
  tradeoffs: string;
  specifications: { label: string; value: string }[];
  notes?: string;
  image?: string;
  /**
   * A hardware fault on a device that is otherwise still in the setup. Kept
   * separate from `status`, which describes lifecycle (in use or retired)
   * rather than condition.
   */
  fault?: {
    headline: string;
    detail: string;
    /** Where the failure sits across the panel, as a 0-1 fraction. Drives the card overlay. */
    split?: number;
  };
}

export const setupCategories: SetupCategory[] = [
  {
    slug: "audio",
    name: "Audio",
    shortName: "Audio",
    description: "Headphones, microphones, speakers and the rest of the listening chain.",
    detail: "The audio gear I use for calls, focused work, music and everything in between.",
  },
  {
    slug: "keyboards",
    name: "Keyboards",
    shortName: "Keyboards",
    description: "The boards and switches I spend the working day typing on.",
    detail: "My keyboard choices, what they feel like to use and why they suit my workflow.",
  },
  {
    slug: "mice",
    name: "Mice",
    shortName: "Mice",
    description: "Pointing devices selected for work, comfort and play.",
    detail: "The mice I reach for, how they fit my hand and where each one earns its place.",
  },
  {
    slug: "monitors",
    name: "Monitors",
    shortName: "Monitors",
    description: "The displays that make up my workspace.",
    detail: "My display setup, the trade-offs I made and how each screen is used.",
  },
  {
    slug: "mousepads",
    name: "Mousepads",
    shortName: "Mousepads",
    description: "The surfaces underneath the mouse, from desk mats to control pads.",
    detail: "The pads I use and how their size, feel and speed work with my mice.",
  },
  {
    slug: "controllers",
    name: "Controllers",
    shortName: "Controllers",
    description: "Gamepads and other controllers I use at the desk.",
    detail: "The controllers I use, what I play with them and why I picked them.",
  },
  {
    slug: "ups",
    name: "UPS",
    shortName: "UPS",
    description: "Backup power that keeps the setup safe through an outage.",
    detail: "The uninterruptible power gear protecting my equipment and work.",
  },
];

export const setupDevices: SetupDevice[] = [
  // ---------------------------------------------------------------- keyboards
  {
    slug: "aula-f75",
    category: "keyboards",
    name: "Aula F75",
    brand: "Aula",
    model: "F75",
    status: "current",
    summary:
      "A 75% gasket-mount board that gets the whole enthusiast formula into a very small price.",
    role: "Compact daily board, paired with the full-size S2022.",
    why: "The F75 is the cheapest way I know to get the full modern keyboard formula in one box: a gasket mount instead of a plate screwed rigidly to the case, factory-lubed switches, plate-mounted stabilisers and a foam stack that removes the hollow rattle most budget boards have. The 75% layout keeps the function row and arrows while dropping the number pad, which is the single change that makes a desk feel bigger. The aluminium knob is a small thing that turns out to matter once you use it for volume.",
    dailyUse:
      "It shares the desk with the S2022. The F75 is the board for when I want the desk cleared and the arrow keys kept; the S2022 covers the occasions when I need the number pad.",
    tradeoffs:
      "Aula's software is proprietary — no QMK, VIA or ZMK on this generation, so everything goes through the manufacturer's app and it only does its job properly on Windows. The ABS case and keycap legends wear faster than PBT doubleshot on the competition. Keycap colouring and knob position vary between regional revisions, so what you get depends on which SKU is in stock.",
    specifications: [
      { label: "Layout", value: "75%, 81 keys" },
      { label: "Mount", value: "Gasket mount" },
      { label: "Switches", value: "Hot-swap 3/5-pin (LEOBOG Reaper linear)" },
      { label: "Keycaps", value: "PBT double-shot" },
      { label: "Connectivity", value: "Tri-mode — USB-C, 2.4GHz, Bluetooth 5.0" },
      { label: "Battery", value: "4000 mAh" },
      { label: "Knob", value: "Multifunction aluminium" },
      { label: "Software", value: "Proprietary driver (no QMK / VIA / ZMK)" },
    ],
    image: "/images/setup/keyboards/aula-f75.webp",
  },
  {
    slug: "aula-s2022",
    category: "keyboards",
    name: "Aula S2022",
    brand: "Aula",
    model: "S2022",
    status: "current",
    summary:
      "A full-size 104-key board with a detachable palm rest, covering the times I need a number pad.",
    role: "Full-size board in the rotation, and the only one with a number pad.",
    why: "The S2022 exists for the jobs the F75 cannot do. It is a conventional wired board — no wireless, no hot-swap, no gasket mount — and that is the point: when I want to type on something completely different, the plain mechanical feel and the audible blue switches make it feel like a different instrument. The detachable palm rest is more useful than it sounds, because it is the difference between this being a desk board and a laptop-replacement board.",
    dailyUse:
      "The full-size option. It takes over whenever I am entering a lot of numbers or want the audible click of a mechanical switch rather than the softer F75.",
    tradeoffs:
      "It is a 2017-era design and it shows. Wired only, so it is tied to a cable, and there is no VIA or QMK support, so the Kreg blue switches and their bump cannot be tuned. It is also the largest thing on the desk, which is exactly the problem the F75 solves.",
    specifications: [
      { label: "Layout", value: "Full-size, 104 keys" },
      { label: "Switches", value: "Kreg waterproof blue (tactile)" },
      { label: "Rated lifespan", value: "50 million keystrokes" },
      { label: "Keycaps", value: "ABS double-shot, matte finish" },
      { label: "Connectivity", value: "Wired USB" },
      { label: "Palm rest", value: "Detachable" },
      { label: "Water resistance", value: "Yes — sealed switch membrane" },
      { label: "Extra keys", value: "Fn-layer multimedia row" },
    ],
    image: "/images/setup/keyboards/aula-s2022.webp",
  },

  // -------------------------------------------------------------------- mice
  {
    slug: "logitech-g-pro-wireless",
    category: "mice",
    name: "Logitech G Pro Wireless",
    brand: "Logitech",
    model: "G Pro Wireless",
    status: "current",
    summary: "A 63g wireless mouse whose 1000Hz polling never improved past the original 2018 design.",
    role: "The lightest board-side mouse in the rotation, and the wireless default.",
    why: "Sixty-three grams was the headline claim of this mouse and it still holds, but the part that has aged is the polling rate: 1000Hz was what shipped in 2018 and it is still what this reports, over the cable and over the air alike. The sensor is the part Logitech kept current — the original HERO shipped at 16,000 DPI and was upgraded to HERO 25K through a free G HUB update, which is where the 25,600 figure in the software comes from. It also carries onboard memory, so the DPI and button profiles survive being used on a different machine without reconfiguring anything.",
    dailyUse:
      "The wireless option for general desktop work. The cable still earns its place — it charges over it and takes the latency argument off the table — but it does not buy a higher report rate, because there is no higher report rate to buy.",
    tradeoffs:
      "The 1000Hz report rate is the honest weak point, and it is a design decision rather than a limitation of this unit: the 8000Hz modes people mean are on the later Superlight revision, not this one. The battery is the other weak point — around 25 hours, which is less than the Glorious and far less than a headset, so it wants a weekly top-up. The HERO sensor is good rather than class-leading; newer sensors track marginally more smoothly on fast flicks. And 63g is no longer remarkable now that lighter mice exist.",
    specifications: [
      { label: "Sensor", value: "HERO optical, 100–25,600 DPI (16,000 before the G HUB update)" },
      { label: "Weight", value: "63 g (80 g with cable)" },
      { label: "Polling rate", value: "1000 Hz (1 ms), wired and wireless" },
      { label: "Wireless", value: "2.4 GHz LIGHTSPEED" },
      { label: "Battery", value: "Approx. 25 hours" },
      { label: "Buttons", value: "6 + 3 on-board DPI" },
      { label: "On-board memory", value: "Up to 5 DPI settings" },
      { label: "Mouse feet", value: "PTFE" },
    ],
    image: "/images/setup/mice/logitech-g-pro-wireless.webp",
  },
  {
    slug: "aula-sc660",
    category: "mice",
    name: "Aula SC660",
    brand: "Aula",
    model: "SC660",
    status: "current",
    summary: "A 77g tri-mode mouse — the cheap way to cover every connection type in one body.",
    role: "The flexible option in the rotation, and the one that travels best.",
    why: "Most mice pick two of wired, 2.4GHz and Bluetooth. The SC660 does all three in a 77g shell with a PMW3325 sensor, which is the same sensor family used in far more expensive boards. The receiver stores in the underside of the mouse, so it cannot be lost in a bag, and the shell is translucent so the RGB is visible rather than trapped behind an opaque shell.",
    dailyUse:
      "The one that goes between the laptop and the desktop without a dongle swap, and the one I reach for when I need Bluetooth rather than a receiver.",
    tradeoffs:
      "The PMW3325 is capped at 10,000 DPI against the G Pro Wireless's 25,600, and 77g is 14g heavier, so it gives ground on anything competitive — but not on polling, because both mice report at 1000 Hz and neither has a mode that goes faster. The 500 mAh battery is small, and the RGB drains it faster. It is also the least refined shell of the four — the transparency is a novelty that wears off.",
    specifications: [
      { label: "Sensor", value: "PMW3325 optical" },
      { label: "Max DPI", value: "10,000 (200–10,000 customisable)" },
      { label: "Polling rate", value: "125 / 250 / 500 / 1000 Hz (500 default)" },
      { label: "Weight", value: "77 g" },
      { label: "Battery", value: "500 mAh rechargeable" },
      { label: "Connectivity", value: "Wired, 2.4 GHz and Bluetooth" },
      { label: "Lighting", value: "RGB, translucent shell" },
      { label: "Storage", value: "Receiver stows in the underside" },
    ],
    image: "/images/setup/mice/aula-sc660.webp",
  },
  {
    slug: "razer-deathadder-essential",
    category: "mice",
    name: "Razer DeathAdder Essential",
    brand: "Razer",
    model: "DeathAdder Essential",
    status: "current",
    summary: "A 96g wired ergonomic shape — the comfortable-palm option in a rotation of light mice.",
    role: "The ergonomic, wired counterweight to the three ultralights.",
    why: "Three of the four mice here are under 80g and symmetric. The DeathAdder is the opposite: a right-handed ergonomic shape with a proper thumb rest, at 96g, on a cable. The Focus+ optical sensor is accurate and the shape has been refined across many revisions, which makes it the one I pick when a long session matters more than a ranked one. Razer cut the price point by dropping RGB down to single-colour green, and keeping the optical switches.",
    dailyUse:
      "The wired default for desktop work. It is the mouse I stop noticing, which is the point at which a mouse has done its job.",
    tradeoffs:
      "It is the heaviest and the only strict right-hander of the four, which rules it out for anyone using a left hand. Polling stops at 1000 Hz and there is no wireless. The lift-off distance is roughly 2 mm and cannot be changed in software, which does annoy people who want a very low one. Single-colour lighting is a downgrade if you care about it.",
    specifications: [
      { label: "Sensor", value: "Focus+ optical, 16,000 DPI" },
      { label: "Weight", value: "96 g" },
      { label: "Polling rate", value: "125 / 500 / 1000 Hz" },
      { label: "Tracking", value: "220 IPS, 30 G" },
      { label: "Buttons", value: "6, including DPI cycle" },
      { label: "Lighting", value: "Single-colour green" },
      { label: "Software", value: "Razer Synapse 3" },
      { label: "Dimensions", value: "127 × 73 × 43 mm" },
    ],
    image: "/images/setup/mice/razer-deathadder-essential.webp",
  },
  {
    slug: "glorious-model-o-wireless",
    category: "mice",
    name: "Glorious Model O Wireless",
    brand: "Glorious",
    model: "Model O Wireless",
    status: "current",
    summary: "A 69g honeycomb mouse with a 71-hour battery — the endurance option.",
    role: "The long-battery wireless mouse, and the ambidextrous one.",
    why: "Seventy-one hours of battery without RGB is the number that matters here. Wireless mice have historically meant charging every few days; this one is charged roughly monthly and then forgotten. The honeycomb shell gets it to 69g without the usual hollow feel, the shape is genuinely symmetric so it works for either hand, and the BAMF sensor reads 19,000 DPI.",
    dailyUse:
      "The set-and-forget wireless mouse. It is the one that stays charged, which makes it the least annoying thing on the desk even when it is not the fastest.",
    tradeoffs:
      "It is a 1000 Hz mouse and so is the G Pro Wireless, so polling is not the difference between them — the split is battery and weight, not latency. Neither ships with the 4000 or 8000 Hz mode that newer dongles bundle, which means both feel dated next to a mouse that has one. The Omron switches are rated at 20 million clicks, roughly half what modern competitors claim, and they are a known failure point. Glorious CORE is Windows-only, and the battery figure assumes RGB is off — with lighting on it is dramatically shorter.",
    specifications: [
      { label: "Weight", value: "69 g" },
      { label: "Sensor", value: "BAMF optical, up to 19,000 DPI" },
      { label: "Polling rate", value: "1000 Hz (1 ms default)" },
      { label: "Battery", value: "71 hours with RGB off" },
      { label: "Buttons", value: "6" },
      { label: "Switches", value: "Omron, rated 20 million clicks" },
      { label: "Tracking", value: "400 IPS, 50 G" },
      { label: "Lift-off", value: "1–2 mm, adjustable in software" },
    ],
    image: "/images/setup/mice/glorious-model-o-wireless.webp",
  },

  // ------------------------------------------------------------------- audio
  {
    slug: "kz-edx-ultra",
    category: "audio",
    name: "KZ EDX Ultra",
    brand: "KZ",
    model: "EDX Ultra",
    status: "current",
    summary: "A single-dynamic-driver wired IEM — the simple in-ear option.",
    role: "The uncomplicated in-ear, and the cheapest way to get off the headsets.",
    why: "Everything else in the audio category either covers an ear or costs real money. The EDX Ultra is the fallback: a single 10mm dynamic driver, a detachable cable with a proper 0.75mm two-pin connector, and an impedance low enough at 26Ω that it drives from a laptop or phone with no amplifier. The detachable cable is the part that matters over years — it is the failure point on cheap IEMs, and here it is a two-cent spare rather than a replacement unit.",
    dailyUse:
      "The in-ear I reach for when I do not want to wear a headset — short listening sessions and calls where the over-ear cups get hot.",
    tradeoffs:
      "It is a V-shaped, bass-forward tune with treble peaks that people either love or EQ away, and it is not a reference in any sense. Isolation is good for the money but nowhere near a proper IEM. Being wired, it adds to cable clutter at the desk.",
    specifications: [
      { label: "Driver", value: "10 mm dynamic" },
      { label: "Frequency response", value: "20 Hz – 40 kHz" },
      { label: "Impedance", value: "26 Ω" },
      { label: "Sensitivity", value: "112 ± 1 dB" },
      { label: "Cable", value: "Detachable, 120 cm" },
      { label: "Connector", value: "0.75 mm 2-pin" },
      { label: "Plug", value: "3.5 mm" },
    ],
    image: "/images/setup/audio/kz-edx-ultra.webp",
  },
  {
    slug: "logitech-g935",
    category: "audio",
    name: "Logitech G935",
    brand: "Logitech",
    model: "G935",
    status: "current",
    summary: "A wireless LIGHTSYNC headset with a 50mm driver and a very long battery.",
    role: "The wireless over-ear headset, and the long-session one.",
    why: "The G935 is the headset to pick when the session is long enough that the battery becomes the deciding factor — around 29 hours removes charging from the conversation entirely. The 50mm Pro-G drivers with a woven hybrid mesh give a roomier sound than the 40mm units in this category, and DTS Headphone:X 2.0 gives positional cues on PC. The G-keys on the left earcup are a genuine convenience rather than a gimmick, because they work without opening the software.",
    dailyUse:
      "The wireless headset for calls and gaming sessions where I do not want a cable across the desk. Because it has no Bluetooth, it stays tethered to its 2.4GHz receiver rather than pairing with a phone.",
    tradeoffs:
      "The 50mm driver is a marketing number — at this price a well-tuned 40mm is more accurate, and the difference is subtle. DTS surround and EQ presets need G HUB and are Windows-only, so macOS users get plain stereo over USB. The earcups are leatherette and get warm over several hours.",
    specifications: [
      { label: "Drivers", value: "50 mm Pro-G, woven hybrid mesh" },
      { label: "Surround", value: "DTS Headphone:X 2.0" },
      { label: "Wireless", value: "2.4 GHz LIGHTSYNC" },
      { label: "Battery", value: "Approx. 29 hours" },
      { label: "Software", value: "Logitech G HUB (Windows for surround)" },
      { label: "Microphone", value: "Retractable boom with mute LED" },
      { label: "Extras", value: "G-keys, backlit custom tags" },
      { label: "Also includes", value: "3.5 mm analogue cable" },
    ],
    image: "/images/setup/audio/logitech-g935.webp",
  },
  {
    slug: "kz-castor-pro",
    category: "audio",
    name: "KZ Castor Pro",
    brand: "KZ",
    model: "Castor Pro",
    status: "current",
    summary: "My main audio device — dual dynamic drivers with a four-switch tuning system.",
    role: "The primary listening device.",
    why: "This is the one I reach for first. Two 10mm dynamic drivers per side split the work through an electronic crossover, with one dedicated to the bottom end and one to everything above it, which is why it has more weight and separation than a single driver at the same price. The four physical switches on each earpiece give sixteen tuning combinations with no app, no battery and no firmware — an unusual amount of control in a wired IEM. The transparent shell shows the drivers, which is partly why I bought it.",
    dailyUse:
      "The default for music and for anything where I actually want to listen rather than just talk. Being wired, it plugs straight into the desktop without charging.",
    tradeoffs:
      "There are no independent third-party measurements of this model, so the published figures are catalogue numbers rather than verified results. The detachable cable uses a 2-pin connector, which is less universal than the 4-pin MMCX found on higher-end IEMs. The four switches are also fiddly to adjust in the dark, and the plastic housing is large enough that some ears find the fit awkward.",
    specifications: [
      { label: "Drivers", value: "2 × 10 mm dynamic per side" },
      { label: "Crossover", value: "Electronic, 3-band" },
      { label: "Tuning", value: "4 switches, 16 configurations" },
      { label: "Impedance", value: "22–40 Ω (Harman) / 16–22 Ω (bass)" },
      { label: "Sensitivity", value: "101–104 dB" },
      { label: "Frequency response", value: "20 Hz – 40 kHz" },
      { label: "Cable", value: "Detachable 0.75 mm, 120 cm OFC" },
      { label: "Connector", value: "0.75 mm 2-pin" },
    ],
    image: "/images/setup/audio/kz-castor-pro.webp",
  },
  {
    slug: "corsair-hs50",
    category: "audio",
    name: "Corsair HS50",
    brand: "Corsair",
    model: "HS50",
    status: "current",
    summary: "A wired 3.5mm headset that works on anything without a dongle or software.",
    role: "The universal headset for anything that is not a PC.",
    why: "The HS50's real advantage is that it needs nothing. It is a plain 3.5mm analogue headset, so it works over the headphone jack on a controller, a laptop, a phone with an adapter, or a monitor — no USB receiver, no pairing, no driver. For a device that mostly just needs to work, that beats every wireless headset here. The memory foam earpads and aluminium yokes are better than the price suggests.",
    dailyUse:
      "The grab-and-go headset. It is the one that plugs into a console or a laptop without anyone having to think about it.",
    tradeoffs:
      "Wired means the cable is part of the deal — 3.5mm reaches, but not across a room. Being pure analogue, the mic is fine for voice chat and poor for streaming. The 3.5mm TRRS plug assumes a combined headset jack; newer laptops have separated headphone and mic ports and need an adapter.",
    specifications: [
      { label: "Drivers", value: "50 mm" },
      { label: "Impedance", value: "32 Ω @ 1 kHz" },
      { label: "Connection", value: "Wired 3.5 mm analogue" },
      { label: "Microphone", value: "Detachable boom" },
      { label: "Weight", value: "331 g with microphone" },
      { label: "Earpads", value: "Memory foam" },
      { label: "Lighting", value: "RGB" },
      { label: "Battery", value: "None — not a wireless headset" },
    ],
    image: "/images/setup/audio/corsair-hs50.webp",
  },
  {
    slug: "steelseries-arctis-5",
    category: "audio",
    name: "SteelSeries Arctis 5",
    brand: "SteelSeries",
    model: "Arctis 5",
    status: "current",
    summary: "A wired USB headset with a retractable mic and a mix dial that actually solves a real problem.",
    role: "The wired PC headset, and the mixed-audio one.",
    why: "The ChatMix dial is the feature worth singling out. On the inline control you can hear your own voice mixed into the output while the microphone is still routed to the game, which is a real problem for anyone who has ever unmuted to hear themselves and then forgotten to mute again. The ski-goggle headband distributes weight without the clamping of a conventional band, the mic retracts into the cup so it cannot snag, and USB means surround and EQ work without extra software.",
    dailyUse:
      "The headset that stays on the PC. It is the one I put on for work calls where I want to switch between audio and voice without touching Windows settings.",
    tradeoffs:
      "This is the original wired Arctis 5, not the newer Arctis Nova — there is no battery and no wireless, which the Nova's naming makes easy to get wrong. 40mm is on the small side for an over-ear and the sound is less detailed than the Logitech's 50mm unit. The cloth earpads are cooler than leather but collect sweat.",
    specifications: [
      { label: "Drivers", value: "40 mm neodymium dynamic" },
      { label: "Impedance", value: "32 Ω" },
      { label: "Frequency response", value: "20 – 22,000 Hz" },
      { label: "Surround", value: "DTS Headphone:X 7.1" },
      { label: "Connection", value: "Wired USB-C and 3.5 mm" },
      { label: "Microphone", value: "Retractable ClearCast bidirectional" },
      { label: "Weight", value: "308 g" },
      { label: "Extras", value: "ChatMix dial, RGB" },
    ],
    image: "/images/setup/audio/steelseries-arctis-5.webp",
  },

  // ---------------------------------------------------------------- monitors
  {
    slug: "tar-g-1440p-180hz",
    category: "monitors",
    name: "TAR-G TARG270W",
    brand: "TAR-G",
    model: "TARG270W",
    status: "current",
    summary: "A 27-inch 1440p IPS running at 180Hz — the main high-refresh work display.",
    role: "The primary high-resolution, high-refresh display.",
    why: "180Hz is the number that makes this display worth having. It is above the 165Hz most panels settle for, and on a 1440p IPS panel the result is smooth motion without the colour and viewing-angle problems that come with pushing a TN that hard. 2560×1440 at 27 inches is the practical sweet spot: enough pixel density to read code comfortably, without needing GPU scaling. The height and rotation adjustable stand is standard at this price and not worth remarking on except that it is there.",
    dailyUse:
      "The main display for general work and for gaming. It carries the desktop, and it is the one I am looking at most of the day.",
    tradeoffs:
      "A 180Hz IPS panel of this specification is close to the point where the refresh rate is the marketing and the panel is the compromise — expect some colour shift at the edges off-axis, and IPS glow is possible in dark rooms. There is no local dimming or HDR worth the name, so it is a good SDR display and nothing more.",
    specifications: [
      { label: "Size", value: "27 inches" },
      { label: "Resolution", value: "2560 × 1440" },
      { label: "Refresh rate", value: "180 Hz" },
      { label: "Panel", value: "IPS" },
      { label: "Screen type", value: "Flat, frameless bezel" },
      { label: "Stand", value: "Height and rotation adjustable" },
    ],
    image: "/images/setup/monitors/tar-g-1440p-180hz.webp",
  },
  {
    slug: "zowie-xl2731",
    category: "monitors",
    name: "ZOWIE XL2731",
    brand: "ZOWIE",
    model: "XL2731",
    status: "current",
    summary: "A 27-inch 1080p TN at 144Hz — the fastest-response display in the setup.",
    role: "The competitive-play display, and the 3D Vision one.",
    why: "ZOWIE built this panel for esports and the design shows in the details rather than the spec sheet. The S Switch arc sits under the screen and puts brightness, Black eQualizer and crosshair options on physical dials, so settings can be changed mid-round without opening an OSD. Black eQualizer brightens specific parts of the image to make an opponent visible in a dark scene, which is the feature the brand is actually known for. At 144Hz with a TN panel, input lag is the lowest of anything here — and it supports NVIDIA 3D Vision over DVI.",
    dailyUse:
      "The display for competitive shooters, where response time matters more than pixels. 1080p is the wrong resolution for reading text, which is why it is not the main screen.",
    tradeoffs:
      "TN means genuinely poor viewing angles and washed-out colour compared with the IPS panel here — colour shifts as soon as you move off-centre, which is uncomfortable for desktop work. 1920×1080 at 27 inches is coarse for text. This is the non-K revision at 144Hz: it has no DyAc motion blur reduction, and unlike the XL2731K it has no S Switch arc — the on-screen menu is the only way to change settings.",
    specifications: [
      { label: "Size", value: "27 inches" },
      { label: "Panel", value: "TN" },
      { label: "Resolution", value: "1920 × 1080" },
      { label: "Refresh rate", value: "144 Hz" },
      { label: "Brightness", value: "320 nits (typical)" },
      { label: "Contrast", value: "1000:1" },
      { label: "Response time", value: "2.5 ms GtG" },
      { label: "Ports", value: "DVI-DL, HDMI 2.0 ×2, DisplayPort 1.2, headphone out" },
      { label: "Features", value: "Black eQualizer, S Switch arc, 3D Vision" },
    ],
    image: "/images/setup/monitors/zowie-xl2731.webp",
  },
  {
    slug: "dell-p2014ht",
    category: "monitors",
    name: "Dell P2014Ht",
    brand: "Dell",
    model: "P2014Ht",
    status: "current",
    summary: "A 19-inch 1600×900 IPS touch display — the always-on screen for reference and monitoring.",
    role: "The secondary display, permanently showing references and dashboards.",
    why: "This is the cheap, always-on panel. 1600×900 at 19 inches is a low pixel count by modern standards, but the point is that it is never the window I am working in — it holds a terminal, a dashboard, documentation or a chat client. Being IPS with 178° viewing angles means it is readable from an angle, unlike the TN panel here. The touch input is what distinguishes the Ht from the plain P2014H and it is what makes it usable as a control surface.",
    dailyUse:
      "The always-on reference screen. Anything that needs to be glanced at rather than read closely lives here, which frees the 1440p panel for actual work.",
    tradeoffs:
      "1600×900 is the weakest resolution in this list and 60Hz makes motion visibly choppy, so it is not for anything involving movement. 19 inches is small enough that text gets tight at native scaling. It is also an older commercial display that Dell no longer sells, so parts are increasingly hard to source.",
    specifications: [
      { label: "Size", value: "19.5 inches (20-inch class)" },
      { label: "Panel", value: "IPS" },
      { label: "Resolution", value: "1600 × 900" },
      { label: "Refresh rate", value: "60 Hz" },
      { label: "Brightness", value: "250 cd/m² (typical)" },
      { label: "Contrast", value: "1000:1" },
      { label: "Viewing angle", value: "178° / 178°" },
      { label: "Ports", value: "VGA and DisplayPort, plus touch input" },
      { label: "Colour gamut", value: "83% CIE1976" },
    ],
    image: "/images/setup/monitors/dell-p2014ht.webp",
  },
  {
    slug: "aoc-cu34g2x",
    category: "monitors",
    name: "AOC CU34G2X",
    brand: "AOC",
    model: "CU34G2X",
    status: "current",
    summary:
      "A 34-inch 1500R curved ultrawide at 3440×1440 and 144Hz — now running on half a panel.",
    role: "The half-working ultrawide, kept for the half of it that still lights up.",
    why: "3440×1440 at 34 inches gives roughly the vertical resolution of a 27-inch 16:9 panel with the width of two 16:9 monitors, which is the actual reason to own an ultrawide: two full applications side by side with no bezels and one cable. The 1500R curve is gentle enough to be comfortable over a long session while still placing the edges closer than a flat panel. VA gives a 3000:1 native contrast, which is the best contrast figure of anything in this setup, and the 1ms response is a marketing number on a VA panel but FreeSync plus 144Hz keeps motion clean. None of that matters as much as it once did, because the panel has since failed and taken half the display with it.",
    dailyUse:
      "It is on the desk, but it is no longer the wide workspace it was bought for. What survives is one full-height half of an ultrawide, which is narrower than the 27-inch panel next to it and no use for two side-by-side applications. It stays because a dead half is still a usable monitor and because the alternative is binning a panel that cost real money.",
    tradeoffs:
      "The panel has failed on one side, so this is now a half monitor. Half an ultrawide is a strange object to own: it is narrower than the 27-inch display it sits beside, and anything that relied on the extra width no longer works. The remaining faults are the ones the panel type already had — 1440p vertical means it was never the place for dense text, and VA panels smear on dark transitions — but they are now the least of its problems. Whether it is worth repairing depends entirely on whether the failure is the panel itself or the board driving it, and at this age nobody will say. It stays on the list because it is still physically here, not because it is still a good display.",
    fault: {
      headline: "Half the panel is dead",
      detail:
        "One full side of the display no longer lights up. The surviving half still runs at full resolution and refresh rate, so it is usable, but the panel is not. Everything above is written around what the monitor still does rather than what it was bought to do.",
      split: 0.5,
    },
    specifications: [
      { label: "Size", value: "34 inches" },
      { label: "Curvature", value: "1500R" },
      { label: "Panel", value: "VA" },
      { label: "Resolution", value: "3440 × 1440 (21:9)" },
      { label: "Refresh rate", value: "144 Hz" },
      { label: "Response time", value: "1 ms MPRT / 4 ms GtG" },
      { label: "Brightness", value: "300 cd/m²" },
      { label: "Contrast", value: "3000:1 native" },
      { label: "Adaptive sync", value: "AMD FreeSync, 30–144 Hz" },
      { label: "Ports", value: "2 × DisplayPort 1.4, 2 × HDMI 2.0, 4 × USB 3.2, audio out" },
      { label: "Known fault", value: "Panel failure — one side dead, half the display unusable" },
    ],
    image: "/images/setup/monitors/aoc-cu34g2x.webp",
  },

  // --------------------------------------------------------------- mousepads
  {
    slug: "hx-mpfsl",
    category: "mousepads",
    name: "HyperX Fury S Pro Gaming Surface (L)",
    brand: "HyperX",
    model: "Fury S Pro Gaming Surface",
    status: "current",
    summary: "A 450×400mm cloth mat — control over speed, sized for keyboard-and-mouse use.",
    role: "The single mouse surface in the setup, under whichever mouse is in use.",
    why: "The Fury S Pro is a cloth control surface rather than a hard pad, which means more deliberate movement and more consistent tracking at low speeds — the right choice for the work side of this setup, where precision beats slide. At 450×400mm it is a large rather than a full-desk mat, which keeps it usable alongside a keyboard rather than swallowing the whole desk. The stitched edge stops the fraying that eventually ruins cloth mats, and the rubber base keeps it from sliding.",
    dailyUse:
      "The surface under the mouse, sized so both the board and the mouse fit on the desk comfortably. Being cloth and washable, it is the more forgiving of the two approaches when a drink goes over it.",
    tradeoffs:
      "Cloth wears out and the weave flattens with use, unlike a hard pad which can last indefinitely. It also shows marks, and because it is not full-desk sized there is nowhere to rest a wrist at the edge. Control surfaces are the wrong choice for very fast flick movements where a hard pad would be faster.",
    specifications: [
      { label: "Part number", value: "HX-MPFS-S-L" },
      { label: "Size", value: "450 × 400 mm (Large)" },
      { label: "Thickness", value: "3–4 mm" },
      { label: "Surface", value: "Woven cloth, control" },
      { label: "Base", value: "Anti-slip rubber" },
      { label: "Edge", value: "Stitched" },
      { label: "Range", value: "Also made in S, M and XL" },
    ],
    image: "/images/setup/mousepads/hx-mpfsl.webp",
  },

  // ------------------------------------------------------------- controllers
  {
    slug: "xbox-one-tech-recon",
    category: "controllers",
    name: "Xbox Recon Tech Special Edition",
    brand: "Xbox",
    model: "Recon Tech Special Edition",
    status: "current",
    summary: "A 2017 Xbox One controller with a hybrid D-pad and double the wireless range.",
    role: "The backup Xbox controller, and the one for larger rooms.",
    why: "The Recon Tech is one of the few Xbox controllers with a hybrid D-pad, which is the feature platformers and fighting games need and the reason most controllers are unusable for them. It also carries a 3.5mm headphone jack, so game audio goes to a headset without a separate adapter, and Microsoft doubled the wireless range on this revision specifically for playing away from the console. Textured grips help in longer sessions.",
    dailyUse:
      "The second Xbox pad. It covers the games that need a real D-pad and doubles as the controller for playing further from the TV than the standard pad reaches.",
    tradeoffs:
      "This was a limited special edition and has been discontinued for years, so it exists only second-hand and the condition varies. It predates the Xbox Series layout, so the menu and share buttons are in the older positions. It has no USB-C and no Bluetooth pairing beyond the standard Xbox wireless.",
    specifications: [
      { label: "Platform", value: "Xbox One, One S, One X, Windows" },
      { label: "Released", value: "2017" },
      { label: "D-pad", value: "Hybrid disc-and-cross" },
      { label: "Wireless range", value: "Roughly double the standard controller" },
      { label: "Audio", value: "3.5 mm headphone jack" },
      { label: "Grips", value: "Textured" },
      { label: "Buttons", value: "9 plus menu and share" },
    ],
    image: "/images/setup/controllers/xbox-one-tech-recon.webp",
  },
  {
    slug: "xbox-one-white",
    category: "controllers",
    name: "Xbox Wireless Controller",
    brand: "Xbox",
    model: "Xbox Wireless Controller",
    status: "current",
    summary: "The standard Xbox pad in white — the default for anything that does not need a D-pad.",
    role: "The primary Xbox controller.",
    why: "This is the controller most Xbox games are designed around, and the asymmetry matters: every stick position is reachable without lifting the thumb, which is what makes it the comfortable choice for shooters and action games. It has the 3.5mm jack and the share button, works over 2.4GHz wireless with USB-C for charging, and Bluetooth on the current revision lets it pair with a PC or phone directly. It is the one that needs no explanation.",
    dailyUse:
      "The pad that stays plugged in. Most sessions go through this one, with the Recon Tech taking over for games that need a proper D-pad.",
    tradeoffs:
      "The offset stick layout is the wrong shape for platformers and for anything needing precise directional input, which is exactly what the other controller here is for. Newer revisions moved the share and menu buttons and added a Bluetooth pairing button, so second-hand units vary. It is also the controller most prone to drift on the left stick once the thumbsticks wear.",
    specifications: [
      { label: "Platform", value: "Xbox One and Series X|S, Windows, mobile" },
      { label: "Connectivity", value: "2.4 GHz wireless, Bluetooth, USB-C" },
      { label: "Buttons", value: "ABXY, menu, share, Xbox, View" },
      { label: "D-pad", value: "Hybrid disc on later revisions" },
      { label: "Audio", value: "3.5 mm headphone jack" },
      { label: "Features", value: "Impulse triggers, share button, rumble" },
      { label: "Colour", value: "White" },
    ],
    image: "/images/setup/controllers/xbox-one-white.webp",
  },
  {
    slug: "dualshock-4",
    category: "controllers",
    name: "DualShock 4",
    brand: "Sony",
    model: "DualShock 4",
    status: "current",
    summary: "The PlayStation pad, with the touchpad and speaker the Xbox controller does not have.",
    role: "The PlayStation controller.",
    why: "The touchpad is the reason, and it is not a gimmick — a large number of PlayStation games use swipes and taps on it for commands, inventory and map control, which is information a normal pad simply cannot send. The clickable pad also gives a second set of inputs for the same buttons. The built-in speaker handles system and social sounds without a headset, and the light bar reports player number.",
    dailyUse:
      "The PlayStation pad, and the one that goes with a PS4 when that is what is being played.",
    tradeoffs:
      "It is an older design and the touchpad has become an ergonomic liability — holding it with a thumb is awkward for long sessions and the capacitive surface stops registering when it gets sweaty. Battery life is around 19 hours, well short of the Xbox pad. The original model reports 1000Hz polling only via USB in later revisions, and Bluetooth polling is lower.",
    specifications: [
      { label: "Platform", value: "PlayStation 4" },
      { label: "Touchpad", value: "Clickable capacitive pad" },
      { label: "Battery", value: "Approx. 19 hours" },
      { label: "Connectivity", value: "Bluetooth 4.0 and USB" },
      { label: "Polling rate", value: "1000 Hz via USB on v2" },
      { label: "Sensors", value: "Six-axis accelerometer and gyroscope" },
      { label: "Extras", value: "Built-in speaker, 3.5 mm jack, light bar" },
    ],
    image: "/images/setup/controllers/dualshock-4.webp",
  },

  // --------------------------------------------------------------------- ups
  {
    slug: "apc-bv650",
    category: "ups",
    name: "APC Easy UPS BV650I",
    brand: "APC",
    model: "BV650I",
    status: "current",
    summary: "A 650VA line-interactive unit carrying the lighter end of the equipment.",
    role: "Backup power for the network and display side of the desk.",
    why: "BV650 is the smaller of the two units and it is matched to what is actually plugged into it: the router, the display and the network gear, which together sit well inside 375W. Line-interactive with automatic voltage regulation means brownouts and spikes are corrected without draining the battery at all, which is the common case here rather than a full outage. Four universal outlets on the rear cover the network stack without a power strip, and universal means the unit takes a Schuko plug straight from the wall or an IEC lead from a strip without either side needing an adapter.",
    dailyUse:
      "It stays plugged in permanently and does nothing visible unless the power fails. Its job is that a brownout does not take the router and the displays down at once.",
    tradeoffs:
      "650VA is not enough for a desktop and a monitor together, which is why the larger unit exists — splitting the load across the two is the whole arrangement. The stepped approximation to a sinewave output is fine for PC power supplies with their own filtering, but it will upset sensitive or older hardware. Universal outlets are the flexible choice — one box covers both a Schuko wall plug and an IEC lead — but the universal contacts are bulkier than dedicated sockets and are the first thing to inspect if a device ever refuses to charge from them. There is no USB communication port, so there is no automatic safe shutdown — if an outage outlasts the battery, everything downstream loses power anyway.",
    specifications: [
      { label: "Capacity", value: "650 VA / 375 W" },
      { label: "Topology", value: "Line-interactive with AVR" },
      { label: "Input", value: "230 V, Schuko CEE 7/7P" },
      { label: "Outputs", value: "4 × universal outlets, battery-backed" },
      { label: "Outlet variant", value: "Universal-socket build — the Schuko and IEC C13 variants of the same model carry different outlet counts" },
      { label: "Battery", value: "12 V 7 Ah sealed lead-acid" },
      { label: "Transfer time", value: "6 ms typical, 10 ms max" },
      { label: "Runtime", value: "Approx. 10 minutes at 120 W" },
      { label: "Recharge time", value: "6–8 hours" },
      { label: "Weight", value: "4.5 kg" },
      { label: "Warranty", value: "2 years" },
    ],
    image: "/images/setup/ups/apc-bv650.webp",
  },
  {
    slug: "apc-back-ups-bx1400ui",
    category: "ups",
    name: "APC Back-UPS BX1400UI",
    brand: "APC",
    model: "BX1400UI",
    status: "current",
    summary: "A 1400VA unit with enough headroom for the desktop itself.",
    role: "Backup power for the main computer.",
    why: "1400VA and 700W is the figure that makes this the unit that matters — it is the only one of the two with headroom for a desktop, a monitor and peripherals at the same time, and the reason the load is split across two boxes rather than one. Six battery-backed IEC outlets mean a full shutdown is a single clean action rather than a scramble. As a Back-UPS rather than an Easy UPS it sits in APC's better-supported line, though the feature set here is still deliberately basic.",
    dailyUse:
      "It carries the desktop, so an outage gives long enough to save work and shut down properly instead of watching the lights go out. It is the unit that has to be sized right, and it is.",
    tradeoffs:
      "This part is discontinued, so a replacement has to be second-hand and the battery — which is the component that actually fails — may be well past its life regardless of the unit's condition. There is no USB port on this model, so PowerChute cannot coordinate a safe shutdown and that has to be handled manually. Like the smaller unit, the output is a stepped sinewave.",
    specifications: [
      { label: "Capacity", value: "1400 VA / 700 W" },
      { label: "Topology", value: "Line-interactive with AVR" },
      { label: "Input", value: "230 V nominal, 150–280 V range" },
      { label: "Outputs", value: "6 × IEC C13 with battery backup" },
      { label: "Battery", value: "2 × 12 V 7.2 Ah sealed lead-acid (165 VAh)" },
      { label: "Transfer time", value: "8 ms typical, 10 ms max" },
      { label: "Output waveform", value: "Stepped approximation to sinewave" },
      { label: "Recharge time", value: "Approx. 8 hours" },
      { label: "Warranty", value: "2 years" },
      { label: "Status", value: "Discontinued part" },
    ],
    image: "/images/setup/ups/apc-back-ups-bx1400ui.webp",
  },
];

export function getSetupCategory(slug: string) {
  return setupCategories.find((category) => category.slug === slug);
}

export function getSetupDevice(categorySlug: string, deviceSlug: string) {
  return setupDevices.find(
    (device) => device.category === categorySlug && device.slug === deviceSlug
  );
}

export function getSetupDevices(categorySlug: string) {
  return setupDevices.filter((device) => device.category === categorySlug);
}