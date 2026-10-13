"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PortfolioData } from "@/types/portfolio";
import { ArrowLeft, Printer } from "lucide-react";

export default function CvPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load portfolio data for CV:", err);
        setLoading(false);
      });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-600">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B2B]"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6">
        <p className="text-zinc-600">Failed to load CV information.</p>
      </div>
    );
  }

  const { profile, education, skills, experiences, projects } = data;

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 py-8 px-4 sm:px-6 font-sans">
      {/* Top Floating Control Bar (Hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 no-print bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 text-xs font-bold bg-[#FF6B2B] hover:bg-[#FF8F5C] text-white px-5 py-2.5 rounded-xl shadow-md shadow-[#FF6B2B]/20 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Download / Print CV (PDF)</span>
          </button>


        </div>
      </div>

      {/* Main Printable Document Canvas */}
      <main className="max-w-4xl mx-auto bg-white text-zinc-900 p-8 sm:p-14 rounded-2xl shadow-xl print-page border border-zinc-200 dark:border-zinc-800">
        {/* CV Header */}
        <div className="border-b-2 border-zinc-900 pb-6 mb-7 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-2 font-serif">
            {profile.name}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-700 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>{profile.location}</span>
            <span>|</span>
            <a href={`mailto:${profile.email}`} className="text-zinc-900 hover:underline">
              {profile.email}
            </a>
            <span>|</span>
            <span>{profile.phone}</span>
            <span>|</span>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-900 hover:underline">
              linkedin.com/in/joshua-ibrahim
            </a>
            <span>|</span>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-zinc-900 hover:underline">
              github.com/naytdgreat
            </a>
          </p>
        </div>

        {/* Summary */}
        <section className="mb-7">
          <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2.5">
            Summary
          </h2>
          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed text-justify">
            {profile.summary}
          </p>
        </section>

        {/* Education */}
        <section className="mb-7">
          <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2.5">
            Education
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
            <h3 className="font-bold text-sm text-zinc-900">
              {education.institution}, <span className="font-medium text-zinc-700">{education.degree}</span>
            </h3>
            <span className="text-xs text-zinc-600 font-medium">{education.period}</span>
          </div>

          <p className="text-xs text-zinc-600 leading-relaxed">
            <span className="font-semibold text-zinc-800">• Coursework:</span> {education.coursework.join(", ")}
          </p>
        </section>

        {/* Experience */}
        <section className="mb-7">
          <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-3">
            Experience
          </h2>
          <div className="space-y-5">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                  <h3 className="font-bold text-sm text-zinc-900">
                    {exp.role}, <span className="font-semibold text-zinc-700">{exp.company} – {exp.location}</span>
                  </h3>
                  <span className="text-xs text-zinc-600 font-medium">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-zinc-700 leading-relaxed">
                  {exp.highlights.map((point, pIdx) => (
                    <li key={pIdx} className="leading-snug">
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-7">
          <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-3">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="pb-3 border-b border-zinc-100 last:border-none">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                  <h3 className="font-bold text-sm text-zinc-900">
                    {proj.title}
                  </h3>
                  {proj.liveUrl && (
                    <span className="text-xs font-mono text-zinc-600">
                      {proj.liveUrl.replace("https://", "")}
                    </span>
                  )}
                </div>

                <ul className="list-disc list-inside space-y-1 text-xs text-zinc-700 leading-relaxed mb-1.5">
                  {proj.highlights.map((point, hIdx) => (
                    <li key={hIdx}>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-[11px] text-zinc-600">
                  <span className="font-semibold text-zinc-800">Tech Stack:</span> {proj.techStack.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies / Skills */}
        <section className="mb-4">
          <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2.5">
            Technologies
          </h2>
          <div className="space-y-1.5 text-xs text-zinc-700">
            <p>
              <strong className="text-zinc-900">Languages:</strong>{" "}
              {skills.languages.map((l) => l.name).join(", ")}
            </p>
            <p>
              <strong className="text-zinc-900">Frontend:</strong>{" "}
              {skills.frontend.map((f) => f.name).join(", ")}
            </p>
            <p>
              <strong className="text-zinc-900">Backend & Databases:</strong>{" "}
              {skills.backend.map((b) => b.name).join(", ")}
            </p>
            <p>
              <strong className="text-zinc-900">Infrastructure & Tools:</strong>{" "}
              {skills.devopsAndTools.map((d) => d.name).join(", ")}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
