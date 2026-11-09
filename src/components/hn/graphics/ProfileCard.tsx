import { PointerEvent, useRef } from 'react';
import { useReducedMotion } from '../hooks';

/** "Who shows up", written as the source file it would be. Tilts with the pointer. */
export default function ProfileCard() {
  const reduced = useReducedMotion();
  const card = useRef<HTMLDivElement>(null);

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType === 'touch' || !card.current) return;
    const rect = card.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    card.current.style.transform = `rotateY(${px * 10}deg) rotateX(${-py * 8}deg)`;
  };
  const onLeave = () => {
    if (card.current) card.current.style.transform = '';
  };

  const lines = 8;
  return (
    <div className="hn-profile-wrap" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={card} className="hn-profile">
        <div className="hn-win-bar"><i /><i /><i /><span>hassan.ts</span><em>UTF-8 · TS</em></div>
        <div className="hn-profile-photo">
          <img src="/images/profile-hero.webp" width="768" height="768" loading="lazy" decoding="async" alt="Portrait of Hassan Nazir" />
          <span>assets/me.webp</span>
        </div>
        <div className="hn-code">
          <ol aria-hidden="true">{Array.from({ length: lines }, (_, index) => <li key={index} />)}</ol>
          <code>
            <span className="c">{'// the person who shows up'}</span>{'\n'}
            <span className="k">export const</span>{' hassan = {\n'}
            {'  role: '}<span className="s">'forward deployed engineer'</span>{',\n'}
            {'  based: ['}<span className="s">'Islamabad'</span>{', '}<span className="s">'Dubai'</span>{'],\n'}
            {'  speaks: ['}<span className="s">'en'</span>{', '}<span className="s">'ur'</span>{', '}<span className="s">'ts'</span>{', '}<span className="s">'py'</span>{'],\n'}
            {'  access: '}<span className="s">'production'</span>{',\n'}
            {'  handoffs: '}<span className="k">0</span>{',\n'}
            {'}'}<span className="k"> as const</span>{';'}<span className="hn-caret" aria-hidden="true" />
          </code>
        </div>
      </div>
    </div>
  );
}
