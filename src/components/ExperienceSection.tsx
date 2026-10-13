"use client";

import React from "react";
import { Experience } from "@/types/portfolio";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 bg-zinc-50/70 dark:bg-zinc-900/30 border-y border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold text-[#FF6B2B] tracking-widest uppercase mb-3">
            Career Journey
          </p>
          <h2 className="font-extrabold text-3xl sm:text-5xl text-zinc-900 dark:text-white tracking-tight">
            Work Experience
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-3 max-w-xl text-base">
            Proven track record leading engineering initiatives, building healthcare workflows, and managing technology operations.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-4 sm:ml-6 pl-6 sm:pl-10 space-y-12">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#FF6B2B] border-4 border-white dark:border-zinc-950 shadow-sm" />

              {/* Experience Card */}
              <div className="bg-white dark:bg-zinc-900/70 rounded-2xl p-7 sm:p-8 border border-zinc-200/90 dark:border-zinc-800 shadow-sm hover:border-[#FF6B2B]/60 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-extrabold text-2xl text-zinc-900 dark:text-white">
                        {exp.role}
                      </h3>
                      {exp.badge && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-500/10 text-[#FF6B2B] border border-[#FF6B2B]/20">
                          {exp.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-base font-semibold text-[#FF6B2B] mt-1">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#FF6B2B]" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="mt-5 space-y-3">
                  {exp.highlights.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6B2B] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
