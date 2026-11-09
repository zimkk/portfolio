import { PointerEvent, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useInView, useReducedMotion, useResolvedTheme } from '../hooks';

/*
 * The hero piece: a real 3D icosahedron (a d20), drawn as line art in SVG.
 * Each of the 20 faces is something real from my career. It drifts, rolls on
 * its own every few seconds and settles on a face. Hover a face to light it,
 * drag to spin it, click a face to roll it to the front, or press Roll.
 * Opposite faces add up to 21, like a real die. Face 20 is the job itself.
 */

type Face = { tag: 'qa' | 'full-stack' | 'ml' | 'security' | 'fde' | 'edu'; title: string; date?: string; detail: string; href?: string };


// Indexed by face number (1 to 20).
const FACES: Record<number, Face> = {
  1: { tag: 'qa', title: 'QA at Touchstone', date: 'Jul 2020', detail: 'Where I learned to test the unhappy path first.', href: '/about' },
  2: { tag: 'edu', title: 'BS Computer Science', date: '2020 to 2024', detail: 'Air University, Islamabad.', href: '/about' },
  3: { tag: 'full-stack', title: 'GridCore', date: 'Aug 2021 to Oct 2026', detail: 'Five years, from full-stack engineer to lead architect across web, mobile and desktop.', href: '/about' },
  4: { tag: 'security', title: 'CEH-P', detail: 'Certified Ethical Hacker, practical.', href: '/about' },
  5: { tag: 'security', title: 'PEH and ISO/IEC 27001', detail: 'Practical ethical hacking, and information security management.', href: '/about' },
  6: { tag: 'ml', title: 'transcription-analyzer', date: 'May 2024', detail: 'Speech, OCR, NLP and sentiment, stitched into one pipeline.', href: '/work/transcription-analyzer' },
  7: { tag: 'ml', title: 'Anthology', date: 'Oct 2026', detail: 'ML researcher on a part-time contract: inference optimisation, GPU kernels and research on frontier LLMs.', href: '/about' },
  8: { tag: 'full-stack', title: 'mynecraft', date: 'Jun 2026', detail: 'A voxel engine written by hand. Procedural worlds, lighting, physics and mobs, on two runtime dependencies.', href: '/work/mynecraft' },
  9: { tag: 'qa', title: 'Brilliant Gaming', date: 'Feb 2025', detail: 'Led an eight-person QA team on payment-critical flows.', href: '/about' },
  10: { tag: 'ml', title: 'legal-llm', date: 'Jul 2025', detail: 'Llama 3 fine-tuned with LoRA, with a second model checking every summary.', href: '/work/legal-intelligence' },
  11: { tag: 'fde', title: 'Outsentia', date: 'Oct 2026', detail: 'AI environment engineer, full time.', href: '/about' },
  12: { tag: 'fde', title: 'NDT Legacy Group', date: 'Aug 2025', detail: 'Client AI automation from discovery to production, with n8n, REST APIs and LLMs.', href: '/about' },
  13: { tag: 'full-stack', title: 'n8nhub', date: 'Sep 2025', detail: '2,000+ searchable n8n workflows, categorised and documented.', href: '/work/n8nhub' },
  14: { tag: 'fde', title: 'Schmoozzer', date: 'Oct 2025', detail: 'Automation with LLMs and n8n across seven or eight small businesses.', href: '/about' },
  15: { tag: 'fde', title: 'ny-monitor', date: 'Oct 2025', detail: 'Watches 60 county sites for personnel and contact changes, and fires webhooks.', href: '/work/ny-municipal-monitor' },
  16: { tag: 'full-stack', title: 'maps-lead-engine', date: 'Apr 2026', detail: 'A resumable Playwright scraper that picks up where it crashed. 258 tests.', href: '/work/maps-lead-engine' },
  17: { tag: 'fde', title: 'Uno OS', date: 'May 2026', detail: 'AI architect. The final technical call on an AI-native business OS.', href: '/about' },
  18: { tag: 'ml', title: 'wonderkit', date: 'Jun 2026', detail: 'Multi-tenant AI SaaS: swappable LLMs, durable agent runs, pgvector memory.', href: '/work/wonderkit' },
  19: { tag: 'security', title: 'vigil', date: 'Jul 2026', detail: 'Security research tooling that makes security part of the engineering record.', href: '/work/vigil' },
  20: { tag: 'fde', title: 'Forward deployed', date: 'now', detail: 'Natural 20. Everything on the other nineteen faces, working inside your team.', href: '/services/forward-deployed-engineer' },
};

/* ---------- Vector + quaternion helpers ---------- */
type V = [number, number, number];
type Q = [number, number, number, number]; // w, x, y, z
const norm = (v: V): V => { const l = Math.hypot(...v) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
const dot = (a: V, b: V) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: V, b: V): V => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const qmul = (a: Q, b: Q): Q => [
  a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
  a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
  a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
  a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0],
];
const qnorm = (q: Q): Q => { const l = Math.hypot(...q) || 1; return [q[0] / l, q[1] / l, q[2] / l, q[3] / l]; };
const qaxis = (axis: V, angle: number): Q => { const [x, y, z] = norm(axis); const s = Math.sin(angle / 2); return [Math.cos(angle / 2), x * s, y * s, z * s]; };
const qrot = (q: Q, v: V): V => {
  const p: Q = [0, v[0], v[1], v[2]];
  const r = qmul(qmul(q, p), [q[0], -q[1], -q[2], -q[3]]);
  return [r[1], r[2], r[3]];
};
const qfromTo = (a: V, b: V): Q => {
  const d = dot(a, b);
  if (d < -0.9999) return qaxis(Math.abs(a[0]) < 0.9 ? cross(a, [1, 0, 0]) : cross(a, [0, 1, 0]), Math.PI);
  const c = cross(a, b);
  return qnorm([1 + d, c[0], c[1], c[2]]);
};
const qslerp = (a: Q, b: Q, t: number): Q => {
  let d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  let bb = b;
  if (d < 0) { d = -d; bb = [-b[0], -b[1], -b[2], -b[3]]; }
  if (d > 0.9995) return qnorm([a[0] + t * (bb[0] - a[0]), a[1] + t * (bb[1] - a[1]), a[2] + t * (bb[2] - a[2]), a[3] + t * (bb[3] - a[3])]);
  const th = Math.acos(d);
  const s = Math.sin(th);
  const wa = Math.sin((1 - t) * th) / s;
  const wb = Math.sin(t * th) / s;
  return [wa * a[0] + wb * bb[0], wa * a[1] + wb * bb[1], wa * a[2] + wb * bb[2], wa * a[3] + wb * bb[3]];
};
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/* ---------- Icosahedron geometry ---------- */
const PHI = (1 + Math.sqrt(5)) / 2;
const VERTS: V[] = ([
  [0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI],
  [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0],
  [PHI, 0, 1], [-PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, -1],
] as V[]).map(norm);

type Geo = { faces: Array<{ v: [number, number, number]; c: V; num: number }>; edges: Array<{ a: number; b: number; f: number[] }> };

function buildGeometry(): Geo {
  const edgeLen = Math.min(...VERTS.slice(1).map((v) => Math.hypot(v[0] - VERTS[0][0], v[1] - VERTS[0][1], v[2] - VERTS[0][2])));
  const near = (i: number, j: number) => Math.abs(Math.hypot(VERTS[i][0] - VERTS[j][0], VERTS[i][1] - VERTS[j][1], VERTS[i][2] - VERTS[j][2]) - edgeLen) < 1e-6;
  const faces: Geo['faces'] = [];
  for (let i = 0; i < 12; i += 1) for (let j = i + 1; j < 12; j += 1) for (let k = j + 1; k < 12; k += 1) {
    if (near(i, j) && near(j, k) && near(i, k)) {
      const c = norm([0, 1, 2].map((axis) => VERTS[i][axis] + VERTS[j][axis] + VERTS[k][axis]) as V);
      faces.push({ v: [i, j, k], c, num: 0 });
    }
  }
  // Number them like a real d20: opposite faces sum to 21.
  let next = 1;
  faces.forEach((face) => {
    if (face.num) return;
    const opposite = faces.findIndex((other) => dot(other.c, face.c) < -0.999);
    face.num = next;
    faces[opposite].num = 21 - next;
    next += 1;
  });
  const edges: Geo['edges'] = [];
  faces.forEach((face, fi) => {
    const [a, b, c] = face.v;
    [[a, b], [b, c], [a, c]].forEach(([p, q]) => {
      const lo = Math.min(p, q);
      const hi = Math.max(p, q);
      const existing = edges.find((edge) => edge.a === lo && edge.b === hi);
      if (existing) existing.f.push(fi);
      else edges.push({ a: lo, b: hi, f: [fi] });
    });
  });
  return { faces, edges };
}

const LIGHT = norm([-0.45, 0.6, 0.75]);
const HALF = norm([LIGHT[0], LIGHT[1], LIGHT[2] + 1]);
const ORBIT_R = 1.36;
const ORBIT_TILT = qmul(qaxis([0, 0, 1], -0.24), qaxis([1, 0, 0], 0.34));
const SIZE = 440;
const C = SIZE / 2;
const R = 150;

export default function D20() {
  const reduced = useReducedMotion();
  const dark = useResolvedTheme() === 'dark';
  const geo = useMemo(buildGeometry, []);
  const uid = useId().replace(/:/g, '');
  const [wrapRef, inView] = useInView<HTMLDivElement>({ rootMargin: '0px' });
  const [, setFrame] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState(20);
  const hoveredRef = useRef<number | null>(null);
  hoveredRef.current = hovered;

  const faceIndexOf = useCallback((num: number) => geo.faces.findIndex((face) => face.num === num), [geo]);

  /** Orientation that puts a face square to the viewer, with a vertex pointing up. */
  const orientationFor = useCallback((num: number): Q => {
    const face = geo.faces[faceIndexOf(num)];
    const align = qfromTo(face.c, [0, 0, 1]);
    const tip = qrot(align, VERTS[face.v[0]]);
    const twist = qaxis([0, 0, 1], Math.atan2(tip[0], tip[1]));
    return qnorm(qmul(twist, align));
  }, [geo, faceIndexOf]);

  const q = useRef<Q>(qnorm(qmul(qaxis([1, 0.3, 0], 0.5), orientationFor(20))));
  const motion = useRef({
    mode: 'drift' as 'drift' | 'spin' | 'settle' | 'hold' | 'drag',
    t: 0,
    from: [1, 0, 0, 0] as Q,
    to: [1, 0, 0, 0] as Q,
    target: 20,
    spinAxis: [0, 1, 0] as V,
    spinSpeed: 0,
    inertia: [0, 0] as [number, number],
    lastInput: 0,
    idle: 0,
  });
  const drag = useRef<{ x: number; y: number; moved: number } | null>(null);

  const roll = useCallback((num?: number, spin = true) => {
    const m = motion.current;
    const target = num ?? (Math.floor(Math.random() * 20) + 1);
    m.target = target;
    m.t = 0;
    if (spin) {
      m.mode = 'spin';
      m.spinAxis = norm([Math.random() - 0.5, Math.random() - 0.5, Math.random() * 0.3]);
      m.spinSpeed = 14 + Math.random() * 6;
    } else {
      m.mode = 'settle';
      m.from = q.current;
      m.to = orientationFor(target);
    }
  }, [orientationFor]);

  // Animation loop.
  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (document.hidden) { last = now; return; }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const m = motion.current;
      m.t += dt;

      if (m.mode === 'drift') {
        if (!reduced) {
          const speed = hoveredRef.current !== null ? 0 : 0.28;
          q.current = qnorm(qmul(qaxis([0.35, 1, 0.12], speed * dt), q.current));
          m.idle += dt;
          if (m.idle > 6.5 && hoveredRef.current === null && now - m.lastInput > 6000) { m.idle = 0; roll(); }
        }
      } else if (m.mode === 'spin') {
        m.spinSpeed *= Math.pow(0.08, dt);
        q.current = qnorm(qmul(qaxis(m.spinAxis, m.spinSpeed * dt), q.current));
        if (m.t > 0.75) { m.mode = 'settle'; m.t = 0; m.from = q.current; m.to = orientationFor(m.target); }
      } else if (m.mode === 'settle') {
        const k = Math.min(1, m.t / 0.7);
        q.current = qslerp(m.from, m.to, ease(k));
        if (k >= 1) { m.mode = 'hold'; m.t = 0; setSelected(m.target); }
      } else if (m.mode === 'hold') {
        if (m.t > 3.2) { m.mode = 'drift'; m.idle = 0; }
      } else if (m.mode === 'drag') {
        const [vx, vy] = m.inertia;
        if (!drag.current && Math.hypot(vx, vy) > 0.02) {
          q.current = qnorm(qmul(qaxis([vy, vx, 0], Math.hypot(vx, vy) * dt), q.current));
          m.inertia = [vx * Math.pow(0.05, dt), vy * Math.pow(0.05, dt)];
        } else if (!drag.current) {
          m.mode = 'drift';
          m.idle = 0;
        }
      }
      setFrame((value) => (value + 1) % 1_000_000);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, roll, orientationFor]);

  // Pointer: drag to spin, click a face to roll it to the front.
  const onDown = (event: PointerEvent<SVGSVGElement>) => {
    drag.current = { x: event.clientX, y: event.clientY, moved: 0 };
    (event.currentTarget as Element).setPointerCapture?.(event.pointerId);
  };
  const onMove = (event: PointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = event.clientX - d.x;
    const dy = event.clientY - d.y;
    d.x = event.clientX;
    d.y = event.clientY;
    d.moved += Math.abs(dx) + Math.abs(dy);
    if (d.moved < 4) return;
    const m = motion.current;
    m.mode = 'drag';
    m.lastInput = performance.now();
    const angle = Math.hypot(dx, dy) * 0.012;
    if (angle > 0) q.current = qnorm(qmul(qaxis([dy, dx, 0], angle), q.current));
    m.inertia = [dx * 0.6, dy * 0.6];
  };
  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (d && d.moved < 4 && hoveredRef.current !== null) {
      motion.current.lastInput = performance.now();
      roll(hoveredRef.current, false);
    }
  };

  // Project the solid for this frame.
  const rotated = VERTS.map((v) => qrot(q.current, v));
  const px = (v: V) => [C + v[0] * R, C - v[1] * R] as const;
  const faceView = geo.faces.map((face) => {
    const n = qrot(q.current, face.c);
    const pts = face.v.map((i) => px(rotated[i]));
    return { face, n, pts, front: n[2] > 0.02 };
  });
  const front = faceView.filter((view) => view.front).sort((a, b) => a.n[2] - b.n[2]);
  const hiddenEdges = geo.edges.filter((edge) => edge.f.every((fi) => !faceView[fi].front));
  const interiorEdges = geo.edges.filter((edge) => edge.f.every((fi) => faceView[fi].front));
  const silhouette = geo.edges.filter((edge) => faceView[edge.f[0]].front !== faceView[edge.f[1]].front);
  const visibleVerts = new Set(front.flatMap((view) => view.face.v));
  const active = hovered ?? selected;
  const info = FACES[active];
  const axes: Array<[V, string]> = [[[1, 0, 0], 'x'], [[0, 1, 0], 'y'], [[0, 0, 1], 'z']];
  const line = (a: number, b: number) => {
    const [x1, y1] = px(rotated[a]);
    const [x2, y2] = px(rotated[b]);
    return `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
  };

  // The orbit is fixed in space; the satellite goes behind the die and back out.
  const now = performance.now() / 1000;
  const orbitPoint = (theta: number): V => qrot(ORBIT_TILT, [Math.cos(theta) * ORBIT_R, 0, Math.sin(theta) * ORBIT_R]);
  const orbit = Array.from({ length: 97 }, (_, index) => orbitPoint((index / 96) * Math.PI * 2));
  const orbitHalf = (behind: boolean) => {
    let d = '';
    orbit.forEach((point, index) => {
      if ((point[2] < 0) !== behind) return;
      const [ox, oy] = px(point);
      const prev = orbit[index - 1];
      d += `${prev && (prev[2] < 0) === behind ? 'L' : 'M'}${ox.toFixed(1)} ${oy.toFixed(1)}`;
    });
    return d;
  };
  const sat = orbitPoint(reduced ? 0.6 : now * 0.55);
  const [satX, satY] = px(sat);
  const satellite = <g className="hn-d20-sat" style={{ opacity: sat[2] < 0 ? 0.35 : 1 }}><circle cx={satX} cy={satY} r={7} className="halo" /><circle cx={satX} cy={satY} r={3.4} /></g>;

  return (
    <div ref={wrapRef} className="hn-d20">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="hn-d20-svg"
        role="group"
        aria-label="An icosahedron. Each face is a role, project or certification. Drag to spin, click a face to roll it to the front."
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={() => { drag.current = null; }}
        onPointerLeave={() => setHovered(null)}
      >
        <defs>
          <pattern id={`${uid}-hatch`} width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
            <line x1="0" y1="0" x2="0" y2="4.5" className="hn-d20-hatch-line" />
          </pattern>
        </defs>

        {/* Drafting: construction circle, ticks and centre mark */}
        <g className="hn-d20-draft">
          <circle cx={C} cy={C} r={R * 1.1} />
          {Array.from({ length: 24 }, (_, index) => {
            const a = (index / 24) * Math.PI * 2;
            const r1 = R * 1.1;
            const r2 = r1 + (index % 6 === 0 ? 9 : 4);
            return <line key={index} x1={C + Math.cos(a) * r1} y1={C + Math.sin(a) * r1} x2={C + Math.cos(a) * r2} y2={C + Math.sin(a) * r2} />;
          })}
          <path d={`M${C - 6} ${C}H${C + 6}M${C} ${C - 6}V${C + 6}`} />
        </g>

        <ellipse cx={C} cy={C + R * 1.24} rx={R * 0.74} ry={R * 0.085} className="hn-d20-shadow" />
        <ellipse cx={C} cy={C + R * 1.24} rx={R * 0.42} ry={R * 0.045} className="hn-d20-shadow" />

        {/* Orbit, back half, and the satellite when it is behind */}
        <path d={orbitHalf(true)} className="hn-d20-orbit is-back" />
        {sat[2] < 0 && satellite}

        {/* Hidden edges, dashed like a technical drawing */}
        {hiddenEdges.map((edge) => <path key={`h${edge.a}-${edge.b}`} d={line(edge.a, edge.b)} className="hn-d20-hidden" />)}

        {/* Faces: lit, hatched in shadow, with a bevel line */}
        {front.map(({ face, n, pts }) => {
          const lambert = dot(n, LIGHT);
          const spec = Math.pow(Math.max(0, dot(n, HALF)), 28);
          const v = dark
            ? Math.round(Math.min(120, 26 + Math.max(0, lambert) * 40 + spec * 30))
            : Math.round(Math.min(255, 206 + Math.max(0, lambert) * 40 + spec * 14));
          const isActive = face.num === active;
          const centre = pts.reduce((acc, p) => [acc[0] + p[0] / 3, acc[1] + p[1] / 3], [0, 0]);
          const inset = pts.map((p) => [centre[0] + (p[0] - centre[0]) * 0.82, centre[1] + (p[1] - centre[1]) * 0.82]);
          const poly = pts.map((p) => p.join(',')).join(' ');
          const hatch = Math.max(0, Math.min(0.75, (0.42 - lambert) * 1.6));
          return (
            <g
              key={face.num}
              className={`hn-d20-face${isActive ? ' is-on' : ''}${face.num === 20 ? ' is-nat' : ''}`}
              onPointerEnter={() => { setHovered(face.num); motion.current.lastInput = performance.now(); }}
            >
              <polygon points={poly} style={isActive ? undefined : { fill: `rgb(${v - 3},${v - 1},${Math.min(255, v + 3)})` }} />
              {!isActive && hatch > 0.02 && <polygon points={poly} fill={`url(#${uid}-hatch)`} className="hn-d20-hatch" style={{ opacity: hatch }} />}
              <polygon points={inset.map((p) => p.join(',')).join(' ')} className="hn-d20-bevel" style={{ opacity: isActive ? 0.55 : 0.25 + Math.max(0, lambert) * 0.75 }} />
              {spec > 0.25 && !isActive && !dark && <polygon points={inset.map((p) => p.join(',')).join(' ')} className="hn-d20-glint" style={{ opacity: Math.min(0.9, spec) }} />}
            </g>
          );
        })}

        {/* Edges: fine inside, heavy on the silhouette */}
        <path d={interiorEdges.map((edge) => line(edge.a, edge.b)).join('')} className="hn-d20-edge" />
        <path d={silhouette.map((edge) => line(edge.a, edge.b)).join('')} className="hn-d20-outline" />

        {/* Numbers printed flat on each face, foreshortened with it */}
        {front.map(({ face, n }) => {
          const centre = qrot(q.current, face.c).map((value) => value * 0.795) as V;
          // Screen-up projected onto the face plane: numbers stay upright and readable,
          // but still lie flat on the face and foreshorten with it.
          const lift = n[1];
          const upInPlane: V = [-n[0] * lift, 1 - n[1] * lift, -n[2] * lift];
          const up = Math.hypot(...upInPlane) > 0.15
            ? norm(upInPlane)
            : norm(qrot(q.current, VERTS[face.v[0]]).map((value, axis) => value - centre[axis]) as V);
          const right = cross(up, n);
          const [cx, cy] = px(centre);
          const s = 0.95;
          const matrix = `matrix(${(right[0] * s).toFixed(3)} ${(-right[1] * s).toFixed(3)} ${(-up[0] * s).toFixed(3)} ${(up[1] * s).toFixed(3)} ${cx.toFixed(1)} ${cy.toFixed(1)})`;
          const isActive = face.num === active;
          const underline = face.num === 6 || face.num === 9;
          return (
            <g key={`n${face.num}`} transform={matrix} className={`hn-d20-num${isActive ? ' is-on' : ''}${face.num === 20 ? ' is-nat' : ''}`} style={{ opacity: Math.min(1, 0.25 + n[2] * 0.95) }}>
              <text x="0.6" y="0.8" className="deboss">{face.num}</text>
              <text x="0" y="0">{face.num}</text>
              {underline && <line x1="-6" x2="6" y1="13" y2="13" />}
            </g>
          );
        })}

        {/* Vertex nodes */}
        {[...visibleVerts].map((index) => {
          const [vx, vy] = px(rotated[index]);
          return <circle key={`v${index}`} cx={vx} cy={vy} r={1.9} className="hn-d20-node" />;
        })}

        {/* Orbit, front half, and the satellite when it is in front */}
        <path d={orbitHalf(false)} className="hn-d20-orbit" />
        {sat[2] >= 0 && satellite}

        {/* Axis gizmo */}
        <g className="hn-d20-axes" transform={`translate(34 ${SIZE - 34})`}>
          {axes.map(([axis, label]) => {
            const v = qrot(q.current, axis);
            return (
              <g key={label} style={{ opacity: 0.45 + Math.max(0, v[2]) * 0.55 }}>
                <line x1="0" y1="0" x2={v[0] * 20} y2={-v[1] * 20} />
                <text x={v[0] * 27} y={-v[1] * 27 + 3}>{label}</text>
              </g>
            );
          })}
          <circle r="2" />
        </g>
      </svg>

      <div className="hn-d20-info" key={active}>
        <div className="hn-d20-meta hn-mono">
          <b>{String(active).padStart(2, '0')}</b>
          <span>{info.tag}</span>
          {info.date && <span>{info.date}</span>}
        </div>
        <p className="hn-d20-title">{info.title}</p>
        <p className="hn-d20-detail">{info.detail}</p>
      </div>

      <div className="hn-d20-controls">
        <button type="button" className="hn-btn hn-btn-ghost hn-d20-roll" onClick={() => { motion.current.lastInput = performance.now(); setHovered(null); roll(); }}>
          Roll the d20
        </button>
        {info.href && <Link to={info.href} className="hn-link">{info.href.startsWith('/work') ? 'Read about it' : info.href.startsWith('/services') ? 'What that means' : 'More on this'} <ArrowRight size={14} /></Link>}
      </div>
    </div>
  );
}
