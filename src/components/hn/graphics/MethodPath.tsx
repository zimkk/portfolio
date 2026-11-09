import { useEffect, useRef, useState } from 'react';
import { MethodIcon } from './glyphs';

const STEPS = [
  { icon: 'eye', title: 'Understand the work', body: 'Watch the workflow, read the logs, and talk to the people who run it today.' },
  { icon: 'flask', title: 'Prove the risky part', body: 'Build the smallest thing that tests the riskiest assumption, on real data.' },
  { icon: 'plug', title: 'Integrate it', body: 'Into your auth, your data and your deployment pipeline, not alongside them.' },
  { icon: 'pulse', title: 'Run and hand over', body: 'Monitor it, improve it, document it, and hand it over to the team properly.' },
] as const;

export default function MethodPath() {
  const track = useRef<HTMLDivElement>(null);
  const icons = useRef<(HTMLDivElement | null)[]>([]);
  const drawn = useRef<SVGPathElement>(null);
  const [geometry, setGeometry] = useState<{ d: string; width: number; marks: number[] }>({ d: '', width: 0, marks: [] });
  const [lit, setLit] = useState(0);

  // Build the path through the real icon centres, so it always lines up with the layout.
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const measure = () => {
      const base = element.getBoundingClientRect();
      const points = icons.current.map((icon) => {
        const rect = icon?.getBoundingClientRect();
        return rect ? [rect.left - base.left + rect.width / 2, rect.top - base.top + rect.height / 2] : [0, 0];
      });
      if (points.length < 2) return;
      let d = `M${points[0][0]} ${points[0][1]}`;
      for (let i = 1; i < points.length; i += 1) {
        const [x0, y0] = points[i - 1];
        const [x1, y1] = points[i];
        const mid = (x0 + x1) / 2;
        d += ` C${mid} ${y0} ${mid} ${y1} ${x1} ${y1}`;
      }
      // Stations light up by horizontal position on desktop, vertical position when stacked on mobile.
      const axis = Math.abs(points[points.length - 1][0] - points[0][0]) > Math.abs(points[points.length - 1][1] - points[0][1]) ? 0 : 1;
      const span = points[points.length - 1][axis] - points[0][axis] || 1;
      setGeometry({ d, width: base.width, marks: points.map((point) => (point[axis] - points[0][axis]) / span) });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Draw the path as the section scrolls through the viewport.
  useEffect(() => {
    const path = drawn.current;
    const element = track.current;
    if (!path || !element || !geometry.d) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    let frame = 0;
    const update = () => {
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (viewport * 0.78 - rect.top) / (rect.height * 0.75 + viewport * 0.15)));
      path.style.strokeDashoffset = `${length * (1 - progress)}`;
      const reached = geometry.marks.filter((mark) => progress >= mark - 0.02).length;
      setLit(reached);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [geometry]);

  return (
    <div ref={track} className="hn-method-track">
      <svg width={geometry.width} height="150" viewBox={`0 0 ${geometry.width || 1} 150`} aria-hidden="true">
        <path d={geometry.d} className="hn-method-path-bg" />
        <path ref={drawn} d={geometry.d} className="hn-method-path" />
      </svg>
      <ol className="hn-method-grid">
        {STEPS.map((step, index) => (
          <li key={step.title} className={`hn-step${index < lit ? ' is-on' : ''}`}>
            <div className="hn-step-icon" ref={(element) => { icons.current[index] = element; }}>
              <MethodIcon name={step.icon} />
            </div>
            <div>
              <h3><small className="hn-mono">Step 0{index + 1}</small>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
