"use client";
import helixImage from "@/assets/images/helix2.png";
import aiImage from "@/assets/images/ai-vector.png";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useState } from "react";

export default function CallToAction() {
  const [email, setEmail] = useState("");
  const handleMailMeClick = () => {
    if (email) {
      // Construct the mailto link
      const subject = "Hello!";
      const body = "I wanted to reach out.";
      const mailtoLink = `mailto:shantanu.ingale22@gmail.com?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}%0AFrom: ${encodeURIComponent(email)}`;

      // Open the mailto link
      window.location.href = mailtoLink;
    } else {
      alert("Please enter your email before clicking 'Mail Me'.");
    }
  };
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
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="h-12 rounded-lg bg-white/20 px-5 font-medium placeholder:text-[#9CA3AF] md:flex-1"
            required
          />
          <button
            type="button"
            onClick={handleMailMeClick}
            className="h-12 rounded-lg bg-white px-5 text-black"
          >
            Mail Me
          </button>
        </form>
      </div>
    </section>
  );
}
