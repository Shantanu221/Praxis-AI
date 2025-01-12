"use client";
import Image from "next/image";
import productImage from "@/assets/images/screenshot2.png";
import Tag from "@/components/my-custom/Tag";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ProductShowcase() {
  const appImage = useRef<HTMLImageElement>(null);
  const { scrollYProgress } = useScroll({
    target: appImage,
    offset: ["start end", "end end"],
  });
  useEffect(() => {}, []);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  return (
    <section className="bg-neutral-950 bg-gradient-to-b from-black to-[#5D2CAB] py-[72px] text-white md:py-20">
      <div className="container">
        <div className="flex items-center justify-center">
          <Tag>Showcase</Tag>
        </div>
        <h2 className="mt-8 text-center text-4xl font-bold tracking-tighter md:text-5xl">
          Intuitive Interface
        </h2>
        <div className="mx-auto max-w-xl">
          <p className="mt-5 text-center text-xl text-white/70">
            Praxis handles the heavy lifting—meeting insights, commit summaries,
            and Q&A—so you can focus on building.
          </p>
        </div>
        <motion.div
          style={{
            opacity: opacity,
            rotateX: rotateX,
            transformPerspective: "800px",
          }}
        >
          <Image
            src={productImage}
            alt="product image"
            className="mt-14"
            draggable="false"
            ref={appImage}
          />
        </motion.div>
      </div>
    </section>
  );
}
