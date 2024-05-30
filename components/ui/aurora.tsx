"use client";
import styles from "./aurora.module.css";
import { cn } from "../../lib/util/cn";
import React, { ElementType, ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  As?: ElementType
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  As = 'div',
  ...props
}: AuroraBackgroundProps) => {
  return (
    <As
      className={cn(
        "grow relative flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900  text-slate-950 transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            styles.aurora,
            showRadialGradient && styles.gradient,
            `
            filter blur-[10px] invert dark:invert-0
            after:animate-aurora
            `
          )}
        ></div>
      </div>
      {children}
    </As>
  );
};
