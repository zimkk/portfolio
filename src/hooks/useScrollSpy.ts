import { useState, useEffect } from 'react';

const DEFAULT_OFFSET_RATIO = 0.35;

function getSectionTop(element: HTMLElement) {
  return element.getBoundingClientRect().top + window.scrollY;
}

export function useScrollSpy(sectionIds: readonly string[], enabled = true) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) {
      return;
    }

    let rafId = 0;

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const triggerLine = scrollY + window.innerHeight * DEFAULT_OFFSET_RATIO;
      const atPageBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 8;

      if (atPageBottom) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      let current = sectionIds[0];

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        if (getSectionTop(element) <= triggerLine) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [enabled, sectionIds]);

  return activeSection;
}

export default useScrollSpy;
