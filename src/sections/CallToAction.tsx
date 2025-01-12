"use client";
import helixImage from "@/assets/images/helix2.png";
import aiImage from "@/assets/images/ai-vector.png";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function CallToAction() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  return (
    <section
      className="bg-black py-[72px] text-center text-white md:py-24"
      ref={containerRef}
    >
      <div className="container relative md:max-w-[580px] lg:max-w-[630px]">
        <motion.div style={{ translateY }}>
          <Image
            src={helixImage}
            alt="helix"
            className="absolute left-[calc(100%+36px)] top-6"
          />
        </motion.div>
        <motion.div style={{ translateY }}>
          <Image
            src={aiImage}
            alt="vector"
            className="absolute -top-[100px] right-[calc(100%+25px)] size-48"
          />
        </motion.div>
        <h2 className="text-4xl font-bold tracking-tighter md:text-5xl">
          Try for Free
        </h2>
        <p className="mt-5 text-xl text-white/70">
          Ready to transform your development workflow? Start your journey
          today—your smarter, AI-powered development companion awaits!
        </p>
        <form className="mx-auto mt-10 flex max-w-sm flex-col gap-2.5 md:flex-row">
          <input
            type="email"
            placeholder="your@email.com"
            className="h-12 rounded-lg bg-white/20 px-5 font-medium placeholder:text-[#9CA3AF] md:flex-1"
          />
          <button className="h-12 rounded-lg bg-white px-5 text-black">
            Mail Me
          </button>
        </form>
      </div>
    </section>
  );
}
