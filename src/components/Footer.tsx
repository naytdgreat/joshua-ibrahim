"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, ShieldCheck, FileText } from "lucide-react";
import { Profile } from "@/types/portfolio";

interface FooterProps {
  profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center font-bold text-lg text-zinc-900 dark:text-white mb-1">
            <span>joshua</span>
            <span className="text-[#FF6B2B]">.ibrahim</span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} {profile.name}. All rights reserved. • Full Stack Software Developer.
          </p>
        </div>

        {/* Links & Admin Access */}
        <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link
            href="/cv"
            className="hover:text-[#FF6B2B] transition-colors flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Interactive CV</span>
          </Link>

          <span>•</span>

          <Link
            href="/admin"
            className="hover:text-[#FF6B2B] transition-colors flex items-center gap-1 text-zinc-600 dark:text-zinc-300 font-semibold"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B2B]" />
            <span>Admin Section</span>
          </Link>

          <span>•</span>

          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-[#FF6B2B] text-zinc-700 dark:text-zinc-300 hover:text-[#FF6B2B] flex items-center justify-center transition-colors cursor-pointer"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
