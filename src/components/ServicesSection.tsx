"use client";

import React from "react";
import { Service } from "@/types/portfolio";
import { Layers, Smartphone, Server, Code2, CheckCircle2 } from "lucide-react";

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Smartphone":
        return <Smartphone className="w-6 h-6 text-[#FF6B2B]" />;
      case "Server":
        return <Server className="w-6 h-6 text-[#FF6B2B]" />;
      case "Code2":
        return <Code2 className="w-6 h-6 text-[#FF6B2B]" />;
      case "Layers":
      default:
        return <Layers className="w-6 h-6 text-[#FF6B2B]" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-zinc-50/70 dark:bg-zinc-900/30 border-y border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold text-[#FF6B2B] tracking-widest uppercase mb-3">
            What I Do
          </p>
          <h2 className="font-extrabold text-3xl sm:text-5xl text-zinc-900 dark:text-white tracking-tight">
            Specialized Engineering Services
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl text-base">
            From low-latency Go microservices and Next.js platforms to offline-first React Native mobile apps, delivering high-impact solutions built for speed, resilience, and scale.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const isHighlight = index === 0;
            return (
              <article
                key={service.id}
                className={`card-h group rounded-2xl p-7 border transition-all duration-300 flex flex-col justify-between ${
                  isHighlight
                    ? "bg-zinc-900 dark:bg-zinc-900/90 text-white border-zinc-800 hover:border-[#FF6B2B]"
                    : "bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white border-zinc-200/80 dark:border-zinc-800 hover:border-[#FF6B2B]"
                }`}
              >
                <div>
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-xl mb-6 transition-colors ${
                      isHighlight
                        ? "bg-zinc-800 group-hover:bg-[#FF6B2B]/20"
                        : "bg-orange-500/10 dark:bg-zinc-800 group-hover:bg-[#FF6B2B]/20"
                    }`}
                  >
                    {getIcon(service.icon)}
                  </div>

                  <h3
                    className={`font-bold text-xl mb-3 ${
                      isHighlight ? "text-white" : "text-zinc-900 dark:text-white"
                    }`}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isHighlight ? "text-zinc-400" : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Features list */}
                {service.features && service.features.length > 0 && (
                  <div
                    className={`pt-5 border-t ${
                      isHighlight ? "border-zinc-800" : "border-zinc-100 dark:border-zinc-800"
                    }`}
                  >
                    <ul className="flex flex-col gap-2 text-xs">
                      {service.features.map((feat, fIdx) => (
                        <li
                          key={fIdx}
                          className={`flex items-start gap-2 ${
                            isHighlight ? "text-zinc-300" : "text-zinc-600 dark:text-zinc-300"
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B2B] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
