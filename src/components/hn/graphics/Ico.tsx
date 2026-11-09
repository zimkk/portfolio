/*
 * The "live" marker used across the site: a small icosahedron (a d20), drawn in
 * line art. Instead of blinking, its faces light up one at a time and chase
 * around the solid.
 *
 * Geometry is the classic 2D projection: an outer hexagon, a top face, a central
 * inverted triangle, and the faces fanning out to the rim. 24 x 24 units.
 */

const T = [12, 1.5];
const UL = [2.5, 6.6];
const UR = [21.5, 6.6];
const LL = [2.5, 17.4];
const LR = [21.5, 17.4];
const B = [12, 22.5];
const L = [6.5, 8.8];
const R = [17.5, 8.8];
const M = [12, 17.8];

const tri = (a: number[], b: number[], c: number[]) => `M${a[0]} ${a[1]}L${b[0]} ${b[1]}L${c[0]} ${c[1]}Z`;

// Faces in the order the light travels round: top, then clockwise, centre last.
const FACES = [
  tri(T, L, R),
  tri(T, R, UR),
  tri(UR, R, LR),
  tri(R, LR, M),
  tri(LR, M, B),
  tri(LL, M, B),
  tri(L, LL, M),
  tri(UL, L, LL),
  tri(UL, T, L),
  tri(L, R, M),
];

const HEX = `M${T}L${UR}L${LR}L${B}L${LL}L${UL}Z`.replace(/,/g, ' ');
const EDGES = [
  [T, L], [T, R], [L, R], [L, M], [R, M],
  [UL, L], [UR, R], [LL, L], [LL, M], [LR, R], [LR, M], [B, M],
].map(([a, b]) => `M${a[0]} ${a[1]}L${b[0]} ${b[1]}`).join('');

const CYCLE = 2.6;

function IcoShapes() {
  return (
    <>
      <path d={FACES[9]} className="hn-ico-core" />
      {FACES.map((d, index) => (
        <path key={index} d={d} className="hn-ico-face" style={{ animationDelay: `${(index * CYCLE) / FACES.length}s` }} />
      ))}
      <path d={HEX} className="hn-ico-edge" />
      <path d={EDGES} className="hn-ico-edge hn-ico-inner" />
    </>
  );
}

/** Standalone icon. Inherits colour for its edges; faces light in the accent. */
export default function Ico({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={`hn-ico ${className}`.trim()} aria-hidden="true">
      <IcoShapes />
    </svg>
  );
}
