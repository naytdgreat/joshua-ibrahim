"use client";

import React from "react";
import Link from "next/link";
import { X, FileDown, Eye, ShieldCheck, Printer } from "lucide-react";
import { Profile } from "@/types/portfolio";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

export default function CvModal({ isOpen, onClose, profile }: CvModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
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

        {/* Modal Header */}
        <div className="mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-[#FF6B2B] flex items-center justify-center mb-4">
            <FileDown className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-2xl text-zinc-900 dark:text-white">
            Curriculum Vitae (CV)
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm mt-1">
            Access {profile.name}&apos;s live curriculum vitae. Always synced with latest achievements.
          </p>
        </div>

        {/* Options list */}
        <div className="space-y-3 mb-6">
          {/* Live Printable & Downloadable CV */}
          <Link
            href="/cv"
            onClick={onClose}
            className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 hover:border-[#FF6B2B] group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 group-hover:bg-[#FF6B2B] text-[#FF6B2B] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-[#FF6B2B] transition-colors">
                  View & Download Live CV (PDF)
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Formatted for executive review • Save / Export as PDF
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
