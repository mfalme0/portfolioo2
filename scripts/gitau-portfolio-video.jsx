// Gitau Portfolio — Professional Video Edit Script
// After Effects JSX — Responsive, Beat-Synced, Meta-Narrative Ending
// Usage: File > Scripts > Run Script File (or paste into ExtendScript Toolkit)

// ─── Config ───────────────────────────────────────────────────────────────────
var COMP_NAME = "Gitau Portfolio Edit";
var COMP_WIDTH = 1080;
var COMP_HEIGHT = 1920; // 9:16 default — change to 1080x1080 or 1920x1080 as needed
var COMP_FRAMERATE = 30;
var COMP_DURATION = 16; // seconds

// ─── Main ─────────────────────────────────────────────────────────────────────
var proj = app.project;
if (!proj) { alert("Open a project first."); } else { buildEdit(); }

function buildEdit() {
  // 1. Create main comp
  var comp = proj.items.addComp(COMP_NAME, COMP_WIDTH, COMP_HEIGHT, 1, COMP_DURATION, COMP_FRAMERATE);
  comp.bgColor = [0.04, 0.04, 0.06]; // dark background

  // 2. Create solids & layers
  var globalFX = comp.layers.addSolid([0,0,0], "GLOBAL_FX", COMP_WIDTH, COMP_HEIGHT, 1, COMP_DURATION);
  globalFX.adjustmentLayer = true;
  globalFX.guideLayer = false;

  // Motion Tile — edge wrap for camera shakes
  var motionTile = globalFX.property("ADBE Effect Parade").addProperty("ADBE Motion Tile");
  motionTile.property("ADBE Motion Tile Center").setValue([COMP_WIDTH/2, COMP_HEIGHT/2]);
  motionTile.property("ADBE Motion Tile Output Width").setValue(150);
  motionTile.property("ADBE Motion Tile Output Height").setValue(150);
  motionTile.property("ADBE Motion Tile Mirror Edges").setValue(true);

  // Posterize Time — cinematic 24fps feel
  var posterize = globalFX.property("ADBE Effect Parade").addProperty("ADBE PosterizeTime");
  posterize.property("ADBE PosterizeTime Freq").setValue(24);

  // ─── SECTIONS ───────────────────────────────────────────────────────────────

  // SEC 1: HYPE (0:00 – 0:10) — website screenshots, beat-punch, glitches
  buildHypeSection(comp);

  // SEC 2: THE CRASH (0:10 – ~0:11) — BSOD / Kernel Panic
  buildCrashSection(comp);

  // SEC 3: RESTART PROMPT (~0:11 – 0:13) — terminal rebuild simulation
  buildRestartSection(comp);

  // SEC 4: CRT STARTUP (~0:13 – 0:15) — hero reveal with analog TV effect
  buildCRTStartup(comp);

  // ─── EXPRESSIONS ────────────────────────────────────────────────────────────
  // (All position/scale expressions are embedded per-layer below)

  // Open the comp
  comp.openInViewer();
}

// ─── HYPE SECTION ─────────────────────────────────────────────────────────────
function buildHypeSection(comp) {
  var w = comp.width, h = comp.height;
  var hypeDuration = 10;
  var start = 0;

  // Add a website screenshot layer (placeholder — user replaces with actual footage/image)
  var webShot = comp.layers.addSolid([0.1,0.1,0.15], "WEBSITE_HERO", w, h, 1, hypeDuration);
  webShot.startTime = start;
  webShot.enabled = false; // user replaces with footage
  webShot.property("ADBE Transform Group").property("ADBE Position").expression =
    "[thisComp.width/2, thisComp.height/2]";
  webShot.property("ADBE Transform Group").property("ADBE Anchor Point").expression =
    "[width/2, height/2]";

  // Scale expression: fit-to-comp (responsive)
  webShot.property("ADBE Transform Group").property("ADBE Scale").expression =
    'sX = (thisComp.width / width) * 100;\nsY = (thisComp.height / height) * 100;\n[sX, sY]';

  // Beat-Punch scale expression (audio amplitude driven)
  // User must have an audio layer named "AUDIO_TRACK"
  var beatPunch = webShot.property("ADBE Transform Group").property("ADBE Scale");
  beatPunch.expressionEnabled = true;
  beatPunch.expression =
    'audioLayer = thisComp.layer("AUDIO_TRACK");\n' +
    'amp = audioLayer.sampleImageSource([thisComp.width/2, thisComp.height/2], [0.5, 0.5], true, 1);\n' +
    'maxAmp = Math.max(amp[0], amp[1], amp[2]);\n' +
    's = ease(maxAmp, 0.05, 0.2, 100, 115);\n' +
    'base = [thisComp.width / width, thisComp.height / height] * 100;\n' +
    '[base[0] * (s / 100), base[1] * (s / 100)]';

  // Kinetic text: "BACKEND SYSTEMS"
  var kineticText = comp.layers.addText("BACKEND SYSTEMS");
  kineticText.startTime = start + 0.5;
  kineticText.duration = 1.5;
  var textDoc = kineticText.property("ADBE Text Properties").property("ADBE Text Document");
  textDoc.setValue(textDoc.value);
  kineticText.property("ADBE Transform Group").property("ADBE Position").expression =
    "[thisComp.width/2, thisComp.height/2]";
  styleTextLayer(kineticText, 80, "#FF0080");

  // Kinetic text: "CLOUD RELIABILITY"
  var kineticText2 = comp.layers.addText("CLOUD RELIABILITY");
  kineticText2.startTime = start + 2.5;
  kineticText2.duration = 1.5;
  styleTextLayer(kineticText2, 70, "#00DFD6");

  // Kinetic text: "IDENTITY & NOTIFICATIONS"
  var kineticText3 = comp.layers.addText("IDENTITY & NOTIFICATIONS");
  kineticText3.startTime = start + 4.5;
  kineticText3.duration = 1.5;
  styleTextLayer(kineticText3, 60, "#E8A33D");

  // Kinetic text: "SYSTEMS THINKING"
  var kineticText4 = comp.layers.addText("SYSTEMS THINKING");
  kineticText4.startTime = start + 6.5;
  kineticText4.duration = 1.5;
  styleTextLayer(kineticText4, 75, "#4a9eff");

  // RGB Split Glitch — adjustment layer over hype section
  var glitchFX = comp.layers.addSolid([0,0,0], "RGB_GLITCH", w, h, 1, hypeDuration);
  glitchFX.startTime = start;
  glitchFX.adjustmentLayer = true;
  glitchFX.guideLayer = false;

  // Add a noise-driven displacement for organic glitch effect
  var noiseLayer = comp.layers.addSolid([0.5,0.5,0.5], "GLITCH_NOISE", w, h, 1, hypeDuration);
  noiseLayer.startTime = start;
  noiseLayer.enabled = false; // hidden, drives displacement map

  // Set up the expressions for the RGB glitch using a Slider Control
  var glitchSlider = glitchFX.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
  glitchSlider.property("ADBE Slider Control-0001").expression =
    'audioLayer = thisComp.layer("AUDIO_TRACK");\n' +
    'amp = audioLayer.sampleImageSource([thisComp.width/2, thisComp.height/2], [0.5, 0.5], true, 1);\n' +
    'maxAmp = Math.max(amp[0], amp[1], amp[2]);\n' +
    'if (maxAmp > 0.15) { random(2, 8); } else { 0; }';
}

// ─── CRASH SECTION (BSOD / Kernel Panic) ──────────────────────────────────────
function buildCrashSection(comp) {
  var w = comp.width, h = comp.height;
  var crashStart = 10;
  var crashDuration = 1.5;

  // Blue screen
  var bsod = comp.layers.addSolid([0, 0, 0.55], "BSOD", w, h, 1, crashDuration);
  bsod.startTime = crashStart;
  bsod.property("ADBE Transform Group").property("ADBE Position").expression =
    "[thisComp.width/2, thisComp.height/2]";
  bsod.property("ADBE Transform Group").property("ADBE Anchor Point").expression =
    "[width/2, height/2]";

  // BSOD text
  var bsodText = comp.layers.addText("FATAL_ERROR: Portfolio_Brain_Overload");
  bsodText.startTime = crashStart + 0.2;
  bsodText.duration = crashDuration - 0.2;
  bsodText.property("ADBE Transform Group").property("ADBE Position").expression =
    "[thisComp.width/2, thisComp.height/2]";
  styleTextLayer(bsodText, 36, "#FFFFFF", true);
  // Add a text box background expression via sourceRectAtTime
  bsodText.property("ADBE Transform Group").property("ADBE Scale").expression =
    's = thisComp.width / 1920;\n[s, s] * 100';

  // Sad face emoji
  var sadFace = comp.layers.addText(":(");
  sadFace.startTime = crashStart + 0.1;
  sadFace.duration = crashDuration - 0.1;
  sadFace.property("ADBE Transform Group").property("ADBE Position").expression =
    "[thisComp.width/2, thisComp.height/2 - 60]";
  styleTextLayer(sadFace, 120, "#FFFFFF", true);

  // Camera shake on crash
  var shakeLayer = comp.layers.addSolid([0,0,0], "CRASH_SHAKE", w, h, 1, 0.5);
  shakeLayer.startTime = crashStart;
  shakeLayer.adjustmentLayer = true;
  shakeLayer.guideLayer = false;
  shakeLayer.property("ADBE Transform Group").property("ADBE Position").expression =
    'freq = 40;\namplitude = 20;\nseedRandom(index, true);\n' +
    'x = transform.position[0] + (Math.random() - 0.5) * amplitude;\n' +
    'y = transform.position[1] + (Math.random() - 0.5) * amplitude;\n' +
    '[x, y]';
}

// ─── RESTART PROMPT ───────────────────────────────────────────────────────────
function buildRestartSection(comp) {
  var w = comp.width, h = comp.height;
  var restartStart = 11.5;
  var restartDuration = 1.8;

  // Black background
  var blackBg = comp.layers.addSolid([0,0,0], "RESTART_BG", w, h, 1, restartDuration);
  blackBg.startTime = restartStart;

  // Terminal text with simulated typing (Slider-driven Source Text)
  var termText = comp.layers.addText("System corrupted. Rebuilding Gitau.vercel.app... [Y/N]?");
  termText.startTime = restartStart + 0.2;
  termText.duration = restartDuration - 0.2;
  termText.property("ADBE Transform Group").property("ADBE Position").expression =
    "[thisComp.width/2, thisComp.height/2]";
  var textProp = termText.property("ADBE Text Properties").property("ADBE Text Document");
  var textVal = textProp.value;
  textVal.fillColor = [0.2, 1, 0.2]; // terminal green
  textVal.fontSize = Math.round(COMP_WIDTH / 20);
  textVal.font = "Courier New";
  textVal.text = "System corrupted. Rebuilding Gitau.vercel.app... [Y/N]?";
  textProp.setValue(textVal);

  // Slider control for typing effect
  var typingSlider = termText.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
  typingSlider.property("ADBE Slider Control-0001").expression =
    't = time - thisLayer.startTime;\n' +
    'totalChars = 52;\n' +
    'typingSpeed = 4; // chars per second\n' +
    'charCount = Math.min(Math.floor(t * typingSpeed), totalChars);\n' +
    'charCount;';

  // Source Text expression: show substring based on slider
  textProp.expression = 
    'txt = "System corrupted. Rebuilding Gitau.vercel.app... [Y/N]?";\n' +
    'n = Math.round(effect("Slider Control")("Slider"));\n' +
    'if (n >= txt.length) txt + " Y";\n' +
    'else txt.substring(0, n);';

  // Loading bar layer
  var loadBar = comp.layers.addSolid([0.2, 1, 0.2], "LOAD_BAR", w * 0.6, 6, 1, 0.8);
  loadBar.startTime = restartStart + 1.0;
  loadBar.property("ADBE Transform Group").property("ADBE Position").expression =
    "[thisComp.width/2, thisComp.height/2 + 60]";
  loadBar.property("ADBE Transform Group").property("ADBE Anchor Point").expression =
    "[width/2, height/2]";

  // Scale X expression to simulate loading progress
  loadBar.property("ADBE Transform Group").property("ADBE Scale").expression =
    't = time - thisLayer.startTime;\n' +
    'progress = Math.min(t / 0.8, 1);\n' +
    '[100 * progress, 100]';
}

// ─── CRT STARTUP (Final Reveal) ───────────────────────────────────────────────
function buildCRTStartup(comp) {
  var w = comp.width, h = comp.height;
  var crtStart = 13.3;
  var crtDuration = 2.7;

  // Website hero re-appears — user replaces solid with footage
  var heroReveal = comp.layers.addSolid([0.1,0.1,0.15], "HERO_REVEAL", w, h, 1, crtDuration);
  heroReveal.startTime = crtStart;
  heroReveal.enabled = false; // user replaces with hero footage/image
  heroReveal.property("ADBE Transform Group").property("ADBE Position").expression =
    "[thisComp.width/2, thisComp.height/2]";
  heroReveal.property("ADBE Transform Group").property("ADBE Anchor Point").expression =
    "[width/2, height/2]";
  heroReveal.property("ADBE Transform Group").property("ADBE Scale").expression =
    'sX = (thisComp.width / width) * 100;\nsY = (thisComp.height / height) * 100;\n[sX, sY]';

  // Flicker opacity
  heroReveal.property("ADBE Transform Group").property("ADBE Opacity").expression =
    't = time - thisComp.layer("HERO_REVEAL").startTime;\n' +
    'if (t < 0.3) { random(0, 1) * 100; }\n' +
    'else if (t < 0.6) { 100; }\n' +
    'else { 100; }';

  // ─── ORGANIC CRT STATIC (Displacement Map from Noise) ──────────────────────

  // Create a noise layer for the displacement map
  var noiseStatic = comp.layers.addSolid([0.5,0.5,0.5], "CRT_NOISE", w, h, 1, crtDuration);
  noiseStatic.startTime = crtStart;
  // Apply Fractal Noise to the noise layer
  var fractalNoise = noiseStatic.property("ADBE Effect Parade").addProperty("ADBE Fractal Noise");
  fractalNoise.property("ADBE Fractal Noise").setValue(1);
  fractalNoise.property("ADBE Fractal Noise Type").setValue(1); // Dynamic
  fractalNoise.property("ADBE Fractal Noise Brightness").setValue(40);
  fractalNoise.property("ADBE Fractal Noise Contrast").setValue(80);
  fractalNoise.property("ADBE Fractal Noise Evolution").expression = 'time * 60';
  fractalNoise.property("ADBE Fractal Scale").setValue(200);
  // Hide the noise layer (used as a map only)
  noiseStatic.enabled = true; // must be visible for displacement map to read it
  noiseStatic.guideLayer = true; // won't render

  // Displacement Map on the hero reveal layer
  var dispMap = heroReveal.property("ADBE Effect Parade").addProperty("ADBE Displacement Map");
  dispMap.property("ADBE Displacement Map Source Layer").setValue(noiseStatic.index);
  dispMap.property("ADBE Displacement Map Use For Horizontal").setValue(1); // Red
  dispMap.property("ADBE Displacement Map Use For Vertical").setValue(1); // Red
  dispMap.property("ADBE Displacement Map Max Horizontal Displacement").setValue(8);
  dispMap.property("ADBE Displacement Map Max Vertical Displacement").setValue(4);

  // ─── OPTICS COMPENSATION (CRT bulge) ────────────────────────────────────────

  var opticsComp = heroReveal.property("ADBE Effect Parade").addProperty("ADBE Optics Compensation");
  opticsComp.property("ADBE Optics Compensation Field Of View").setValue(60);
  opticsComp.property("ADBE Optics Compensation Reverse Lens Distortion").setValue(true);
  opticsComp.property("ADBE Optics Compensation FOV Orientation").setValue(1); // Horizontal
  // Animate FOV on/off
  opticsComp.property("ADBE Optics Compensation Field Of View").expression =
    't = time - thisLayer.startTime;\n' +
    'if (t < 1) { ease(t, 0, 1, 80, 60); } else { 60; }';

  // ─── SCANLINES (Venetian Blinds) ────────────────────────────────────────────

  var scanlines = heroReveal.property("ADBE Effect Parade").addProperty("ADBE Venetian Blinds");
  scanlines.property("ADBE Venetian Blinds Direction").setValue(90);
  scanlines.property("ADBE Venetian Blinds Width").setValue(3);
  scanlines.property("ADBE Venetian Blinds Feather").setValue(1);

  // Animate scanline intensity: strong at start, subtle after
  scanlines.property("ADBE Venetian Blinds Transition Completion").expression =
    't = time - thisLayer.startTime;\n' +
    'if (t < 0.8) { ease(t, 0, 0.8, 30, 12); } else { 12; }';

  // ─── CHROMATIC ABERRATION (Red/Blue shift) ──────────────────────────────────

  // Duplicate layer twice, shift color channels
  var redChannel = heroReveal.duplicate();
  redChannel.startTime = crtStart;
  redChannel.name = "HERO_RED";
  redChannel.guideLayer = false;

  var blueChannel = heroReveal.duplicate();
  blueChannel.startTime = crtStart;
  blueChannel.name = "HERO_BLUE";
  blueChannel.guideLayer = false;

  // Remove redundant effects from copies
  for (var i = redChannel.property("ADBE Effect Parade").numProperties; i > 0; i--) {
    redChannel.property("ADBE Effect Parade").property(i).remove();
  }
  for (var i = blueChannel.property("ADBE Effect Parade").numProperties; i > 0; i--) {
    blueChannel.property("ADBE Effect Parade").property(i).remove();
  }

  // Color shift: Red channel only
  var redShift = redChannel.property("ADBE Effect Parade").addProperty("ADBE Color Balance HLS");
  redShift.property("ADBE Color Balance HLS Hue").setValue(0);
  redShift.property("ADBE Color Balance HLS Lightness").setValue(0);
  redShift.property("ADBE Color Balance HLS Saturation").setValue(-100); // desaturate, we want only red

  // Actually let's use Channel Blur for a simpler approach
  // Remove and redo
  redShift.remove();
  var redChannelControl = redChannel.property("ADBE Effect Parade").addProperty("ADBE Shift Channels");
  redChannelControl.property("ADBE Shift Channels- Take Red From").setValue(5); // Full Red
  redChannelControl.property("ADBE Shift Channels- Take Green From").setValue(2); // Off
  redChannelControl.property("ADBE Shift Channels- Take Blue From").setValue(3); // Off
  redChannelControl.property("ADBE Shift Channels- Take Alpha From").setValue(4); // Alpha

  // Shift Red channel position
  redChannel.property("ADBE Transform Group").property("ADBE Position").expression =
    '[thisComp.width/2 + 3, thisComp.height/2]';

  // Blue channel shift
  var blueChannelControl = blueChannel.property("ADBE Effect Parade").addProperty("ADBE Shift Channels");
  blueChannelControl.property("ADBE Shift Channels- Take Red From").setValue(1); // Off
  blueChannelControl.property("ADBE Shift Channels- Take Green From").setValue(2); // Off
  blueChannelControl.property("ADBE Shift Channels- Take Blue From").setValue(5); // Full Blue
  blueChannelControl.property("ADBE Shift Channels- Take Alpha From").setValue(4); // Alpha

  blueChannel.property("ADBE Transform Group").property("ADBE Position").expression =
    '[thisComp.width/2 - 2, thisComp.height/2]';

  // Blend mode: Screen or Add
  heroReveal.blendingMode = BlendingMode.NORMAL;
  redChannel.blendingMode = BlendingMode.SCREEN;
  blueChannel.blendingMode = BlendingMode.SCREEN;

  // ─── CRT GLOW & FADE IN ─────────────────────────────────────────────────────

  // Deep glow on main layer
  var glow = heroReveal.property("ADBE Effect Parade").addProperty("ADBE Glo2");
  glow.property("ADBE Glo2-0001").setValue(20); // Glow Radius
  glow.property("ADBE Glo2-0002").setValue(0.8); // Glow Intensity
  glow.property("ADBE Glo2-0003").setValue(1); // Glow Threshold
  glow.property("ADBE Glo2-0005").setValue(0.3); // Glow Opacity

  // Fade in + flicker
  heroReveal.property("ADBE Transform Group").property("ADBE Opacity").expression =
    't = time - thisLayer.startTime;\n' +
    'if (t < 0.1) { 0; }\n' +
    'else if (t < 0.3) { ease(t, 0.1, 0.3, 0, 100) * (random() > 0.2 ? 1 : 0.3); }\n' +
    'else if (t < 0.6) { ease(t, 0.3, 0.6, 100, 100); }\n' +
    'else { 100; }';

  // CRT Hum audio effect — user provides audio layer
  // Add a subtle audio layer hint
  var crtHum = comp.layers.addSolid([0,0,0], "CRT_HUM_AUDIO_PLACEHOLDER", w, h, 1, crtDuration);
  crtHum.startTime = crtStart;
  crtHum.enabled = false;
  crtHum.guideLayer = true;

  // ─── FINAL ENDING TEXT ──────────────────────────────────────────────────────

  var endText = comp.layers.addText("gitau.vercel.app");
  endText.startTime = crtStart + 2;
  endText.duration = crtDuration - 2;
  endText.property("ADBE Transform Group").property("ADBE Position").expression =
    "[thisComp.width/2, thisComp.height - 80]";
  var endDoc = endText.property("ADBE Text Properties").property("ADBE Text Document").value;
  endDoc.fillColor = [1, 1, 1];
  endDoc.fontSize = Math.round(COMP_WIDTH / 15);
  endDoc.font = "Arial Black";
  endDoc.text = "gitau.vercel.app";
  endText.property("ADBE Text Properties").property("ADBE Text Document").setValue(endDoc);

  // Fade in
  endText.property("ADBE Transform Group").property("ADBE Opacity").expression =
    't = time - thisLayer.startTime;\n' +
    'ease(t, 0, 0.5, 0, 100);';
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function styleTextLayer(layer, fontSize, hexColor, bold) {
  var doc = layer.property("ADBE Text Properties").property("ADBE Text Document").value;
  doc.fillColor = hexToRGB(hexColor);
  doc.fontSize = Math.round(COMP_WIDTH / 1080 * fontSize);
  doc.font = bold ? "Arial Black" : "Arial Bold";
  doc.justification = ParagraphJustification.CENTER_JUSTIFY;
  layer.property("ADBE Text Properties").property("ADBE Text Document").setValue(doc);

  // Source Rect responsive expression for text size
  layer.property("ADBE Transform Group").property("ADBE Scale").expression =
    's = thisComp.width / 1920;\n[s, s] * 100';
}

function hexToRGB(hex) {
  var r = parseInt(hex.slice(1,3), 16) / 255;
  var g = parseInt(hex.slice(3,5), 16) / 255;
  var b = parseInt(hex.slice(5,7), 16) / 255;
  return [r, g, b];
}
