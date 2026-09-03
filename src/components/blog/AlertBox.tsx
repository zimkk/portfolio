import React from 'react';
import { Info, Lightbulb, AlertTriangle, AlertCircle, ShieldAlert } from 'lucide-react';

export type AlertType = 'note' | 'tip' | 'important' | 'warning' | 'caution';

interface AlertBoxProps {
  type: AlertType;
  title?: string;
  children: React.ReactNode;
}

const alertConfig: Record<
  AlertType,
  {
    icon: React.ElementType;
    border: string;
    bg: string;
    text: string;
    iconColor: string;
    defaultTitle: string;
  }
> = {
  note: {
    icon: Info,
    border: 'border-blue-500/40',
    bg: 'bg-blue-950/20',
    text: 'text-blue-200',
    iconColor: 'text-blue-400',
    defaultTitle: 'Note',
  },
  tip: {
    icon: Lightbulb,
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-950/20',
    text: 'text-emerald-200',
    iconColor: 'text-emerald-400',
    defaultTitle: 'Tip',
  },
  important: {
    icon: AlertCircle,
    border: 'border-cyan-500/40',
    bg: 'bg-cyan-950/20',
    text: 'text-cyan-200',
    iconColor: 'text-cyan-400',
    defaultTitle: 'Important',
  },
  warning: {
    icon: AlertTriangle,
    border: 'border-amber-500/40',
    bg: 'bg-amber-950/20',
    text: 'text-amber-200',
    iconColor: 'text-amber-400',
    defaultTitle: 'Warning',
  },
  caution: {
    icon: ShieldAlert,
    border: 'border-rose-500/40',
    bg: 'bg-rose-950/20',
    text: 'text-rose-200',
    iconColor: 'text-rose-400',
    defaultTitle: 'Caution',
  },
};

export const AlertBox: React.FC<AlertBoxProps> = ({ type, title, children }) => {
  const config = alertConfig[type] || alertConfig.note;
  const Icon = config.icon;

  return (
    <aside
      className={`my-6 rounded-xl border ${config.border} ${config.bg} p-4.5 text-sm backdrop-blur-sm`}
      role="note"
    >
      <div className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-wider">
        <Icon className={`h-4 w-4 ${config.iconColor}`} />
        <span className={config.iconColor}>{title || config.defaultTitle}</span>
      </div>
      <div className={`mt-2.5 leading-relaxed ${config.text} [&>p]:m-0`}>
        {children}
      </div>
    </aside>
  );
};

export default AlertBox;
