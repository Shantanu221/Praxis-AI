"use client";
import Tag from "@/components/my-custom/Tag";
import documentIcon from "@/assets/images/document.png";
import meetingIcon from "@/assets/images/online-meeting.png";
import creditIcon from "@/assets/images/credit-card.png";
import Image from "next/image";
import { Feature } from "@/components/my-custom/Feature";

const features = [
  {
    title: "AI Summaries for GitHub",
    description:
      "From code to context—AI summaries at your fingertips and instant Q&A.",
    icon: documentIcon,
  },
  {
    title: "Meeting Insights",
    description: "Never miss a moment—AI meeting analysis & issue summaries.",
    icon: meetingIcon,
  },
  {
    title: "Credit Flexibility",
    description: "Only pay for what you use—credit-based access.",
    icon: creditIcon,
  },
];

export default function Features() {
  return (
    <section className="bg-black py-[72px] text-white md:py-24 lg:py-28">
      <div className="container">
        <div className="flex items-center justify-center">
          <Tag>Features</Tag>
        </div>
        <h2 className="mt-7 text-center text-3xl font-semibold tracking-tighter md:text-5xl">
          Empower Smarter Development with AI.
        </h2>
        <div className="mx-auto max-w-xl">
          <p className="mt-6 text-center text-xl text-white/65">
            Say goodbye to bottlenecks—Praxis simplifies coding with GitHub
            commit summaries, code Q&A, and AI-driven meeting insights. Built
            for modern developers.
          </p>
        </div>
        <div className="mt-16 flex flex-col gap-4 md:flex-row">
          {features.map(({ title, description, icon }) => (
            <Feature
              title={title}
              description={description}
              icon={icon}
              key={title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
