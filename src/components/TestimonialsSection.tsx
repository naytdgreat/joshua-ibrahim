"use client";

import React from "react";
import { Testimonial } from "@/types/portfolio";
import { Star, Quote } from "lucide-react";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="reviews" className="py-24 bg-zinc-50/70 dark:bg-zinc-900/30 border-y border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold text-[#FF6B2B] tracking-widest uppercase mb-3">
            Social Proof
          </p>
          <h2 className="font-extrabold text-3xl sm:text-5xl text-zinc-900 dark:text-white tracking-tight">
            Endorsements & Recommendations
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-3 max-w-xl text-base">
            Feedback from team leaders, medical directors, and product collaborators.
          </p>
        </div>

        {/* Grid of Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((test, idx) => {
            const isDarkHighlight = idx === 1;
            return (
              <blockquote
                key={test.id}
                className={`card-h rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 ${
                  isDarkHighlight
                    ? "bg-zinc-900 dark:bg-zinc-900/90 text-white border-zinc-800 hover:border-[#FF6B2B]"
                    : "bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white border-zinc-200/80 dark:border-zinc-800 hover:border-[#FF6B2B]"
                }`}
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-5" aria-label={`${test.rating} stars`}>
                    {Array.from({ length: test.rating || 5 }).map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className="w-4 h-4 fill-[#FF6B2B] text-[#FF6B2B]"
                      />
                    ))}
                  </div>

                  {/* Quote Body */}
                  <p
                    className={`text-sm leading-relaxed mb-6 italic ${
                      isDarkHighlight ? "text-zinc-300" : "text-zinc-600 dark:text-zinc-300"
                    }`}
                  >
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <footer className="pt-5 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B2B]/10 text-[#FF6B2B] font-extrabold text-sm flex items-center justify-center shrink-0">
                    {test.author.charAt(0)}
                  </div>
                  <div>
                    <p
                      className={`font-bold text-sm ${
                        isDarkHighlight ? "text-white" : "text-zinc-900 dark:text-white"
                      }`}
                    >
                      {test.author}
                    </p>
                    <p
                      className={`text-xs ${
                        isDarkHighlight ? "text-zinc-400" : "text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {test.role} • {test.company}
                    </p>
                  </div>
                </footer>
              </blockquote>
            );
          })}
        </div>
      </div>
    </section>
  );
}
