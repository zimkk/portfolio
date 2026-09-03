import Reveal from './Reveal';

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  description?: string;
}

const SectionHeader = ({ index, label, title, description }: SectionHeaderProps) => (
  <Reveal className="mb-12 md:mb-16">
    <div className="flex items-baseline gap-3 mb-4">
      <span className="text-xs font-mono text-neutral-600">{index}</span>
      <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">{label}</span>
      <div className="flex-1 h-px bg-neutral-900" />
    </div>
    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">{title}</h2>
    {description && (
      <p className="mt-4 text-neutral-400 max-w-2xl leading-relaxed">{description}</p>
    )}
  </Reveal>
);

export default SectionHeader;
