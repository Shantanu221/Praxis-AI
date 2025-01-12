import { cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const classes = cva("rounded-full border h-12 px-6 font-medium", {
  variants: {
    variant: {
      primary: "bg-[#17EAD9] text-neutral-950 border-[#17EAD9]",
      secondary: "border-white text-white bg-transparent",
      custom: "bg-white text-neutral-950",
    },
    size: {
      sm: "h-10",
    },
  },
});

const Button = (
  props: {
    variant: "primary" | "secondary" | "custom";
    size?: "sm";
  } & ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { variant, size, className, ...otherProps } = props;
  return (
    <button className={classes({ variant, size, className })} {...otherProps} />
  );
};

export default Button;
