import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function JaliPattern(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56 56"
      fill="currentColor"
      {...props}
      className={cn("pointer-events-none", props.className)}
    >
      <path d="M28 22.031L22.031 28 28 33.969 33.969 28 28 22.031zM28 11.25L11.25 28 28 44.75 44.75 28 28 11.25zM28 0a28 28 0 100 56 28 28 0 000-56z" />
    </svg>
  );
}
