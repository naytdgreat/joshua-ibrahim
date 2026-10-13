"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Profile, Education, Skills } from "@/types/portfolio";
import { GraduationCap, BookOpen } from "lucide-react";

interface AboutSectionProps {
  profile: Profile;
  education: Education;
  skills: Skills;
  onOpenCvModal: () => void;
}

export default function AboutSection({
  profile,
  education,
  skills,
  onOpenCvModal,
}: AboutSectionProps) {
  const [activeSkillCategory, setActiveSkillCategory] = useState<
    "all" | "languages" | "frontend" | "backend" | "devops"
  >("all");

  const skillTabs = [
    { id: "all", label: "All Skills" },
    { id: "languages", label: "Languages" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend & DBs" },
    { id: "devops", label: "DevOps & Tools" },
  ];

  const getFilteredSkills = () => {
    switch (activeSkillCategory) {
      case "languages":
        return skills.languages.map((s) => ({ ...s, group: "Languages" }));
      case "frontend":
        return skills.frontend.map((s) => ({ ...s, group: "Frontend" }));
      case "backend":
        return skills.backend.map((s) => ({ ...s, group: "Backend" }));
      case "devops":
        return skills.devopsAndTools.map((s) => ({ ...s, group: "DevOps" }));
      case "all":
      default:
        return [
          ...skills.languages.map((s) => ({ ...s, group: "Languages" })),
          ...skills.frontend.map((s) => ({ ...s, group: "Frontend" })),
          ...skills.backend.map((s) => ({ ...s, group: "Backend" })),
          ...skills.devopsAndTools.map((s) => ({ ...s, group: "DevOps" })),
        ];
    }
  };

  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait photo & Education card */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="relative w-full aspect-4/5 max-w-md mx-auto rounded-3xl overflow-hidden border-2 border-zinc-200/80 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-xl group">
              <Image
                src={profile.portraitUrl || "/images/joshua-portrait.jpg"}
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="font-bold text-lg">{profile.name}</p>
                <p className="text-xs text-zinc-300">
                  {profile.title} • {profile.location}
                </p>
              </div>
            </div>

            {/* Academic Education Box */}
            <div className="bg-zinc-50 dark:bg-zinc-900/60 rounded-3xl p-6 sm:p-7 border border-zinc-200/90 dark:border-zinc-800 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF6B2B]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-zinc-900 dark:text-white">
                    {education.institution}
                  </h4>
                  <p className="text-xs text-[#FF6B2B] font-semibold">
                    {education.degree}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between py-2.5 px-3.5 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 mb-4 text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">Duration: {education.period}</span>
              </div>

              <div>
                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#FF6B2B]" />
                  <span>Key Coursework</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {education.coursework.map((course, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 px-2.5 py-0.5 rounded-full"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio summary & Interactive Skills matrix */}
          <div className="lg:col-span-7 flex flex-col">
            <p className="text-xs font-semibold text-[#FF6B2B] tracking-widest uppercase mb-3">
              About Me
            </p>
            <h2 className="font-extrabold text-3xl sm:text-5xl text-zinc-900 dark:text-white tracking-tight leading-tight mb-6">
              Engineering with clarity, speed, and precision.
            </h2>

            <div className="text-zinc-600 dark:text-zinc-400 space-y-4 text-base leading-relaxed mb-8">
              <p>{profile.summary}</p>
              <p>
                I thrive at the intersection of robust systems engineering and user experience. Whether streamlining clinical workflows at Garki Hospital, deploying offline-first synchronization protocols, or fine-tuning Go microservices with Redis caching, my goal is always impactful, maintainable software.
              </p>
            </div>

            {/* Quick CV Button */}
            <div className="mb-10">
              <button
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF6B2B] hover:text-[#FF8F5C] nl cursor-pointer"
              >
                <span>View Full Curriculum Vitae & Credentials →</span>
              </button>
            </div>

            {/* Skills & Tech Stack Section */}
            <div className="pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-bold text-xl text-zinc-900 dark:text-white">
                    Technical Stack & Tooling
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Proficiencies across languages, frameworks, and infrastructure
                  </p>
                </div>

                {/* Filter buttons */}
                <div className="flex flex-wrap gap-1.5 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl">
                  {skillTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSkillCategory(tab.id as any)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${activeSkillCategory === tab.id
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills Tags Grid */}
              <div className="flex flex-wrap gap-2.5" role="list">
                {getFilteredSkills().map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    role="listitem"
                    className="stag inline-flex items-center gap-2 text-xs sm:text-sm bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 px-3.5 py-2 rounded-xl shadow-2xs hover:border-[#FF6B2B]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2B]" />
                    <span className="font-semibold">{skill.name}</span>
                    <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-mono">
                      {skill.level}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
