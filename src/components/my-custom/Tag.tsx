import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Tag(props: HTMLAttributes<HTMLDivElement>) {
  const { className, children, ...otherProps } = props;
  return (
    <div
      className={twMerge(
        "inline-flex items-center gap-2 rounded-lg border border-white/30 px-3 py-1",
        className,
      )}
      {...otherProps}
    >
      <span>&#10038;</span>
      <span>{children}</span>
    </div>
  );
}
