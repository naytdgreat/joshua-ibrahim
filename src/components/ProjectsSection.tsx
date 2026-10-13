"use client";

import React, { useState } from "react";
import { Project } from "@/types/portfolio";
import { ExternalLink, ArrowUpRight, Code, Layers, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function ProjectsSection({ projects, onSelectProject }: ProjectsSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const categories = [
    "All",
    "Enterprise & Healthcare",
    "Cross-Platform & Mobile",
    "Fintech & Events",
    "SaaS & E-Commerce",
    "Media & News",
  ];

  const filteredProjects = selectedFilter === "All"
    ? projects
    : projects.filter((p) => p.category.toLowerCase().includes(selectedFilter.toLowerCase()) || (selectedFilter === "Media & News" && (p.category.includes("Media") || p.category.includes("News") || p.category.includes("Crowdsourcing") || p.category.includes("Games"))));

  return (
    <section id="work" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold text-[#FF6B2B] tracking-widest uppercase mb-3">
              Portfolio
            </p>
            <h2 className="font-extrabold text-3xl sm:text-5xl text-zinc-900 dark:text-white tracking-tight">
              Selected Work & Systems
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mt-3 max-w-xl text-base">
              A collection of production platforms, healthcare management systems, offline mobile solutions, and web architectures.
            </p>
          </div>

          <a
            href="https://github.com/naytdgreat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-[#FF6B2B] dark:hover:text-[#FF6B2B] transition-colors nl self-start md:self-auto"
          >
            <span>Explore all repositories</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === cat
                  ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => {
            return (
              <article
                key={project.id}
                className="card-h group rounded-3xl overflow-hidden bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-[#FF6B2B] flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                {/* Visual Header / Card Top */}
                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header bar: category & tag */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-500/10 text-[#FF6B2B] border border-[#FF6B2B]/20">
                        {project.category}
                      </span>
                      {project.tag && (
                        <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                          {project.tag}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-2xl text-zinc-900 dark:text-white group-hover:text-[#FF6B2B] transition-colors mb-3 leading-snug">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                      {project.shortDescription}
                    </p>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-2 mb-6" aria-label="Tech stack">
                      {project.techStack.slice(0, 6).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs bg-white dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-750 px-2.5 py-1 rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 6 && (
                        <span className="text-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2.5 py-1 rounded-lg font-medium">
                          +{project.techStack.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Highlights bullet previews */}
                  <div className="border-t border-zinc-200/80 dark:border-zinc-800/80 pt-5 mt-auto">
                    <ul className="space-y-1.5 mb-6 text-xs text-zinc-600 dark:text-zinc-400">
                      {project.highlights.slice(0, 2).map((hl, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2B] shrink-0 mt-1.5" />
                          <span className="line-clamp-2">{hl}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Card Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-white hover:text-[#FF6B2B] dark:hover:text-[#FF6B2B] transition-colors cursor-pointer"
                      >
                        <span>View Architecture & Specs</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B2B]" />
                      </button>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 transition-colors"
                            title="GitHub Repo"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-[#FF6B2B]/10 hover:bg-[#FF6B2B] text-[#FF6B2B] hover:text-white border border-[#FF6B2B]/20 flex items-center justify-center transition-colors"
                            title="Live URL"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
