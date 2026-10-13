"use client";

import React from "react";
import { Project } from "@/types/portfolio";
import { X, ExternalLink, CheckCircle2, Layers } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Tag */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-500/10 text-[#FF6B2B] border border-[#FF6B2B]/20">
            {project.category}
          </span>
          {project.tag && (
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {project.tag}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-2xl sm:text-3xl text-zinc-900 dark:text-white mb-4">
          {project.title}
        </h3>

        {/* Long Description */}
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
          {project.longDescription || project.shortDescription}
        </p>

        {/* Tech Stack Pills */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#FF6B2B]" />
            <span>Technologies & Architecture</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 px-3 py-1 rounded-lg font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Highlights / Achievements */}
        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
            System Highlights & Key Deliverables
          </h4>
          <ul className="space-y-2.5">
            {project.highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B2B] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FF6B2B] hover:bg-[#FF8F5C] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-[#FF6B2B]/20"
              >
                <span>Visit Live Application</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Repository</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white px-3 py-2 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
