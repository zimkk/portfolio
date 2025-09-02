"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Tab {
  title: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  type?: never;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
  onClick?: never;
  isActive?: never;
}

type TabItem = Tab | Separator;

interface DockNavigationProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export function DockNavigation({
  tabs,
  className,
  activeColor = "text-white",
}: DockNavigationProps) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const outsideClickRef = React.useRef(null);

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null);
  });

  const handleSelect = (index: number, onClick: () => void) => {
    setSelected(index);
    onClick();
    // Auto-collapse after a short delay (but active tab label will remain visible)
    setTimeout(() => setSelected(null), 2000);
  };

  const Separator = () => (
    <div className="mx-1 h-[24px] w-[1.2px] bg-white/30" aria-hidden="true" />
  );

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex items-center gap-1 rounded-2xl border border-white/20 bg-black/90 backdrop-blur-xl p-1 shadow-2xl",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        const isCurrentlySelected = selected === index;
        const isActive = tab.isActive;
        const shouldShowLabel = isCurrentlySelected || isActive;
        
        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={shouldShowLabel}
            onClick={() => handleSelect(index, tab.onClick)}
            transition={transition}
            className={cn(
              "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
              isCurrentlySelected
                ? cn("bg-white/15", activeColor)
                : isActive 
                  ? "bg-white/10 text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
            )}
          >
            <Icon size={20} />
            <AnimatePresence initial={false}>
              {shouldShowLabel && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden whitespace-nowrap"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
