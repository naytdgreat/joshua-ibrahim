"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, FileDown, Mail, Sparkles, Terminal, Code } from "lucide-react";
import { Profile, Education } from "@/types/portfolio";

interface HeroProps {
  profile: Profile;
  education: Education;
  onOpenCvModal: () => void;
}

export default function Hero({ profile, education, onOpenCvModal }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background radial glows matching Folio Tailwind */}
      <div
        className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#FF6B2B]/10 dark:bg-[#FF6B2B]/15 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-0 w-80 h-80 bg-zinc-200/50 dark:bg-zinc-800/25 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Introduction & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Status pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-[#FF6B2B]/20 text-[#FF6B2B] text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B2B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B2B]"></span>
              </span>
              <span>{profile.status || "Available for work & contracts"}</span>
            </div>

            {/* Main Greeting Heading */}
            <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-zinc-900 dark:text-white leading-[1.08] mb-6">
              Hi, I&apos;m <span className="text-[#FF6B2B]">{profile.name}</span>
            </h1>

            {/* Subheading / Summary */}
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl mb-8">
              Full Stack Software Developer specializing in{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-200">
                Next.js, React, Golang, and PHP
              </strong>
              . I architect scalable backend systems, resilient microservices, and high-performance user interfaces.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#work"
                className="shimmer inline-flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-md shadow-black/5"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCvModal}
                className="inline-flex items-center justify-center gap-2 border border-zinc-300 dark:border-zinc-700 hover:border-[#FF6B2B] dark:hover:border-[#FF6B2B] text-zinc-800 dark:text-zinc-200 hover:text-[#FF6B2B] dark:hover:text-[#FF6B2B] text-sm font-semibold px-6 py-3.5 rounded-full transition-all cursor-pointer bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xs"
              >
                <FileDown className="w-4 h-4 text-[#FF6B2B]" />
                <span>Download CV</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white text-sm font-semibold px-5 py-3.5 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </div>

            {/* Key Stats Counter Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-12 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 w-full">
              <div>
                <p className="font-extrabold text-2xl sm:text-3xl text-zinc-900 dark:text-white">
                  {profile.yearsExperience}
                </p>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                  Years of Experience
                </p>
              </div>

              <div>
                <p className="font-extrabold text-2xl sm:text-3xl text-zinc-900 dark:text-white">
                  {profile.projectsCompleted}
                </p>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                  Production Projects
                </p>
              </div>

              <div>
                <p className="font-extrabold text-2xl sm:text-3xl text-zinc-900 dark:text-white">
                  {profile.clientSatisfaction}
                </p>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                  Commitment & Quality
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Profile Image with Folio badge accents */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-72 h-80 sm:w-84 sm:h-96 lg:w-96 lg:h-[430px]">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-[#FF6B2B]/20 via-zinc-200 dark:via-zinc-800 to-[#FF6B2B]/30 transform rotate-2 -z-10 blur-xs" />

              {/* Main photo frame */}
              <div className="w-full h-full rounded-3xl overflow-hidden border-2 border-zinc-200/80 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-2xl relative">
                <Image
                  src={profile.headshotUrl || "/images/joshua-headshot.jpg"}
                  alt={profile.name}
                  fill
                  sizes="(max-width: 768px) 320px, 420px"
                  priority
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Badge 1: Bottom-Left 'Open to projects' */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-[#FF6B2B] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                <span>Open to projects</span>
              </div>

              {/* Floating Badge 2: Top-Right Tech pill */}
              <div className="absolute -top-3 -right-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2">
                <Code className="w-3.5 h-3.5 text-[#FF6B2B]" />
                <span>Go • Next.js • React</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
