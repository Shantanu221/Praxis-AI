"use client";
import plusIcon from "@/assets/images/plus.svg";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    question: "How does Praxis handle meeting summaries?",
    answer:
      "Praxis uses AI to analyze meeting recordings, generate concise summaries, and highlight key issues for easy review.",
  },
  {
    question: "How does the credit-based system work?",
    answer:
      "Credits track feature usage like AI processing and meeting analysis. You can purchase additional credits through Stripe as needed.",
  },
  {
    question: "Does Praxis support private GitHub repositories?",
    answer:
      "Absolutely! Praxis uses GitHub tokens to securely access and integrate with private repositories.",
  },
  {
    question: "What is Praxis?",
    answer:
      "Praxis is an AI-powered platform designed to simplify collaborative coding with features like GitHub integration, meeting summaries, and intelligent code insights.",
  },
];

const AccordianItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      key={question}
      className="border-b border-white/30 py-7"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center">
        <span className="flex-1 text-lg font-bold">{question}</span>
        <span>
          {!isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-minus"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          )}
        </span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
              marginTop: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              marginTop: "16px",
            }}
            exit={{
              opacity: 0,
              height: 0,
              marginTop: 0,
            }}
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQs() {
  return (
    <section className="bg-black bg-gradient-to-b from-[#5D2CAB] to-black py-[72px] text-white md:py-24">
      <div className="container">
        <h2 className="mx-auto max-w-[648px] text-center text-4xl font-bold tracking-tighter md:text-5xl">
          Frequently asked questions
        </h2>
        <div className="mx-auto mt-12 max-w-[648px]">
          {items.map(({ question, answer }) => (
            <AccordianItem question={question} answer={answer} key={question} />
          ))}
        </div>
      </div>
    </section>
  );
}
