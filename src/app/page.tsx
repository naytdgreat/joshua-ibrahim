"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ProjectModal from "@/components/ProjectModal";
import CvModal from "@/components/CvModal";
import { PortfolioData, Project } from "@/types/portfolio";

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    // Fetch live portfolio data
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load portfolio data:", err);
        setLoading(false);
      });

    // Scroll spy for active navbar section
    const handleScroll = () => {
      const sections = ["contact", "reviews", "about", "experience", "work", "services", "hero"];
      const scrollPos = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#FF6B2B] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            Loading Portfolio...
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 p-6 text-center">
        <div>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Could not initialize portfolio data.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#FF6B2B] text-white rounded-xl text-xs font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-[#FF6B2B] selection:text-white relative">
      {/* Folio Navigation */}
      <Navbar profile={data.profile} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          profile={data.profile}
          education={data.education}
          onOpenCvModal={() => setIsCvModalOpen(true)}
        />

        {/* Services Section */}
        <ServicesSection services={data.services} />

        {/* Selected Work / Projects */}
        <ProjectsSection
          projects={data.projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Professional Experience */}
        <ExperienceSection experiences={data.experiences} />

        {/* About & Technical Skills */}
        <AboutSection
          profile={data.profile}
          education={data.education}
          skills={data.skills}
          onOpenCvModal={() => setIsCvModalOpen(true)}
        />

        {/* Recommendations & Social Proof */}
        <TestimonialsSection testimonials={data.testimonials} />

        {/* Contact Section */}
        <ContactSection profile={data.profile} />
      </main>

      {/* Footer */}
      <Footer profile={data.profile} />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
        profile={data.profile}
      />
    </div>
  );
}
