/* VOLT preloader Figma rebuild — MARKS-ONLY concept (v2, matches the reference video frame).
 * Run when the Figma MCP Starter-plan allowance resets.
 *
 * Command (from any shell with the figma CLI connected):
 *   SCRIPT=$(cat ~/workspace/volt-energy/figma-preloader-script.js)
 *   figma call-tool --name use_figma --arguments-json \
 *     "{\"fileKey\":\"tB26Wo3K37suZQ7lRbLqYf\",\"script\":$(printf '%s' "$SCRIPT" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')}"
 *
 * What it does: rebuilds frame 1:2 ("01 Preloader") as PURE BLACK + the three
 * glowing VOLT slash marks only — NO can body, NO borders, NO text, NO progress
 * bar. Marks glow white-hot with green bloom; volumetric light beams burst
 * upward from within the marks; faint sparks. Exactly like the reference frame.
 */
(async () => {
  const VOLT = { r: 0.486, g: 1.0, b: 0.0 };
  const CORE = { r: 0.949, g: 1.0, b: 0.847 }; // near-white hot core
  const frame = await figma.getNodeByIdAsync("1:2");
  if (!frame) return { error: "frame 1:2 not found" };
  if (!("children" in frame)) return { error: "1:2 has no children" };

  const W = frame.width, H = frame.height;
  const cx = W / 2, cy = H / 2;

  for (const c of [...frame.children]) c.remove();

  const solid = (r, g, b, a = 1) => ({ type: "SOLID", color: { r, g, b }, opacity: a });
  const dropGlow = (color, radius, alpha) => ({
    type: "DROP_SHADOW", color: { ...color, a: alpha },
    offset: { x: 0, y: 0 }, radius, spread: 0, visible: true, blendMode: "NORMAL",
  });

  // Pure black full-bleed background
  const bg = figma.createRectangle();
  bg.resize(W, H);
  bg.fills = [solid(0, 0, 0)];
  bg.name = "bg pure black";
  frame.appendChild(bg);

  // Volumetric light beams bursting upward from WITHIN the marks
  for (const [angle, len] of [[-40, 0.52], [-24, 0.55], [-9, 0.58], [9, 0.58], [24, 0.55], [40, 0.52]]) {
    const beam = figma.createRectangle();
    beam.resize(30, H * len);
    beam.x = cx - 15; beam.y = cy - H * len + 30;
    beam.rotation = (angle * Math.PI) / 180;
    beam.fills = [{ type: "GRADIENT_LINEAR",
      gradientStops: [
        { position: 0, color: { ...VOLT, a: 0 } },
        { position: 1, color: { ...VOLT, a: 0.42 } },
      ],
      gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    }];
    beam.effects = [{ type: "LAYER_BLUR", radius: 18, visible: true }];
    beam.name = `beam ${angle}`;
    frame.appendChild(beam);
  }

  // Soft haze hugging the marks — the bloom they emit
  const bloom = figma.createEllipse();
  const bs = Math.min(W, H) * 0.46;
  bloom.resize(bs, bs);
  bloom.x = cx - bs / 2; bloom.y = cy - bs / 2;
  bloom.fills = [{ type: "GRADIENT_RADIAL",
    gradientStops: [
      { position: 0, color: { ...VOLT, a: 0.28 } },
      { position: 0.55, color: { ...VOLT, a: 0.1 } },
      { position: 1, color: { ...VOLT, a: 0 } },
    ],
    gradientTransform: [[1, 0, 0], [0, 1, 0]],
  }];
  bloom.name = "mark bloom";
  frame.appendChild(bloom);

  // The three torn slash marks — white-hot core, green bloom. NO can body.
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  function makeSlash(x, y, w, h) {
    const verts = [], segs = [];
    const steps = 9;
    const left = [], right = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      left.push({ x: x - w / 2 + (rnd() - 0.5) * w * 0.9, y: y + t * h });
      right.push({ x: x + w / 2 + (rnd() - 0.5) * w * 0.9, y: y + t * h });
    }
    left.forEach(v => verts.push(v));
    right.reverse().forEach(v => verts.push(v));
    for (let i = 0; i < verts.length; i++) segs.push({ start: i, end: (i + 1) % verts.length });
    const v = figma.createVector();
    v.vectorNetwork = { vertices: verts, segments: segs, regions: [{ windingRule: "NONZERO", loops: [verts.map((_, i) => i)] }] };
    v.fills = [solid(CORE.r, CORE.g, CORE.b)];
    v.effects = [
      dropGlow(CORE, 10, 0.95),
      dropGlow(VOLT, 34, 0.7),
      dropGlow(VOLT, 90, 0.35),
    ];
    return v;
  }

  const marks = figma.createFrame();
  marks.name = "claw marks only";
  const markSize = Math.min(W, H) * 0.34;
  marks.resize(markSize, markSize);
  marks.x = cx - markSize / 2; marks.y = cy - markSize / 2;
  marks.fills = [];
  const slashSpecs = [
    [markSize * 0.26, markSize * 0.16, markSize * 0.2, markSize * 0.68],
    [markSize * 0.5, markSize * 0.12, markSize * 0.24, markSize * 0.76],
    [markSize * 0.74, markSize * 0.16, markSize * 0.2, markSize * 0.68],
  ];
  slashSpecs.forEach(([sx, sy, sw, sh], i) => {
    const s = makeSlash(sx, sy, sw, sh);
    s.name = `slash ${i + 1}`;
    marks.appendChild(s);
  });
  frame.appendChild(marks);

  // Faint sparks drifting up from the marks
  seed = 77;
  for (let i = 0; i < 18; i++) {
    const sp = figma.createEllipse();
    const sz = 2 + rnd() * 4;
    sp.resize(sz, sz);
    sp.x = cx + (rnd() - 0.5) * markSize * 2.6;
    sp.y = cy - rnd() * markSize * 1.6;
    sp.fills = [solid(VOLT.r, VOLT.g, VOLT.b, 0.3 + rnd() * 0.4)];
    sp.effects = [dropGlow(VOLT, 10, 0.7)];
    sp.name = `spark ${i + 1}`;
    frame.appendChild(sp);
  }

  return {
    ok: true,
    frame: frame.id,
    name: frame.name,
    children: frame.children.length,
    note: "Preloader v2 rebuilt: pure black + glowing marks only + beams + sparks. No can, no borders, no text, no progress bar.",
  };
})();
