import clsx from "clsx";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return <div className={clsx("mx-auto w-full max-w-site px-6 md:px-12", className)}>{children}</div>;
}
