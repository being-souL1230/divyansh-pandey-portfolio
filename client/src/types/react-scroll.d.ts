declare module "react-scroll" {
  import type { ComponentType, ReactNode } from "react";

  export interface LinkProps {
    to: string;
    smooth?: boolean;
    offset?: number;
    duration?: number;
    spy?: boolean;
    className?: string;
    onClick?: () => void;
    children?: ReactNode;
  }

  export const Link: ComponentType<LinkProps>;
}
