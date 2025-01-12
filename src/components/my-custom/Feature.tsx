"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export const Feature = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: StaticImageData;
}) => {
  const offsetX = useMotionValue(-100);
  const offsetY = useMotionValue(-100);

  const maskImage = useMotionTemplate`radial-gradient(100px 100px at ${offsetX}px ${offsetY}px,black,transparent)`;

  const border = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      //e.x
      //e.y
      if (!border.current) return;
      const borderRect = border.current?.getBoundingClientRect();
      offsetX.set(e.x - borderRect?.x);
      offsetY.set(e.y - borderRect?.y);
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return (
    <div className="relative rounded-xl border border-white/30 px-5 py-10 text-center md:flex-1">
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-purple-400"
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
        ref={border}
      ></motion.div>
      <div className="inline-flex items-center justify-center">
        <Image src={icon} alt={title} className="size-9" />
      </div>
      <h3 className="mt-6 font-bold">{title}</h3>
      <p className="mt-2 text-white/70">{description}</p>
    </div>
  );
};
