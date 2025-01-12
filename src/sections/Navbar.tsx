"use client";

import Image from "next/image";
import logoImage from "@/assets/images/logo.png";
import Button from "../components/my-custom/Button";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#feature" },
  { label: "Showcase", href: "#showcase" },
  { label: "FAQs", href: "#faqs" },
];

export default function Navbar() {
  return (
    <section className="sticky top-0 z-50 py-4 text-white">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-2 items-center overflow-clip rounded-full border border-white/15 bg-neutral-950/70 p-2 px-6 pl-4 backdrop-blur md:py-1 md:pr-3 lg:grid-cols-3 lg:pl-3">
          <div className="flex items-center gap-2">
            <Image
              src={logoImage}
              alt="praxis logo"
              className="h-12 w-auto md:h-16"
            />
            <h2 className="text-2xl font-semibold text-white/95 md:text-3xl">
              Praxis
            </h2>
          </div>
          <div className="hidden items-center justify-center lg:flex">
            <nav className="flex gap-6 font-medium">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center justify-end gap-4">
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
              className="feather feather-menu md:hidden"
            >
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <Link href="/sign-in">
              <Button
                variant="secondary"
                className="hidden items-center md:inline-flex"
              >
                Log In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                variant="primary"
                className="hidden items-center md:inline-flex"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
