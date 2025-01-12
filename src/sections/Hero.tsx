"use client";
import Button from "@/components/my-custom/Button";
import github1 from "../assets/images/github-logo.png";
import github2 from "../assets/images/github-2.png";
import cursorImage from "../assets/images/cursor.png";
import msgImage from "../assets/images/message.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const router = useRouter();
  const handleRedirect = () => {
    router.push("/dashboard");
  };
  return (
    <section className="relative overflow-clip bg-neutral-950 bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)] py-[72px] text-white sm:py-24">
      <div className="absolute left-1/2 top-[calc(100%-96px)] h-[375px] w-[750px] -translate-x-1/2 rounded-[100%] border border-[#B48CDE] bg-neutral-950 bg-[radial-gradient(closest-side,#000_82%,#9560EB)] sm:top-[calc(100%-128px)] md:h-[768px] md:w-[1536px] lg:h-[1200px] lg:w-[2800px]"></div>
      <div className="container relative">
        <div className="flex items-center justify-center">
          <p className="flex items-center gap-2 rounded-lg border border-white/30 px-3 py-1">
            <span>&#10038;</span>
            <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text [-webkit-background-clip:text]">
              Version 1.0 is here
            </span>
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="relative inline-flex">
            <h1 className="text-center text-4xl font-bold tracking-tighter md:max-w-[560px] md:text-6xl lg:max-w-4xl">
              Supercharge Your Development Workflow with AI-Powered
              Collaboration!
            </h1>
            <motion.div
              className="absolute left-[500px] top-[56px] hidden sm:inline lg:left-[840px] lg:top-[46px]"
              drag
              dragSnapToOrigin
            >
              <Image
                src={github1}
                alt="github-vector"
                height="200"
                width="200"
                draggable="false"
                className="max-w-none"
              />
            </motion.div>
            <motion.div
              className="absolute right-[490px] top-[170px] hidden sm:inline lg:right-[800px] lg:top-[100px]"
              drag
              dragSnapToOrigin
            >
              <Image
                src={msgImage}
                alt="msg-vector"
                height="200"
                width="200"
                className="max-w-none"
                draggable="false"
              />
            </motion.div>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="mt-8 max-w-md text-center text-xl text-white/60 lg:max-w-lg">
            Simplify, Collaborate, Deliver—All in One Powerful Platform.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <Link href={'/dashboard'}>
            <Button variant="custom">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
