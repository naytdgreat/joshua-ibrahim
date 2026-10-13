"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X, ArrowUpRight, FileDown, ShieldCheck } from "lucide-react";
import { Profile } from "@/types/portfolio";

interface NavbarProps {
  profile: Profile;
  activeSection: string;
}

export default function Navbar({ profile, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    if (isCurrentlyDark) {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Experience", href: "#experience" },
    { name: "About", href: "#about" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-xs"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Brand Logo */}
        <Link
          href="#hero"
          className="font-bold text-xl md:text-2xl tracking-tight text-zinc-900 dark:text-white flex items-center gap-1 group"
        >
          <span>joshua</span>
          <span className="text-[#FF6B2B] group-hover:scale-125 transition-transform inline-block">.</span>
          <span className="text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">ibrahim</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-7 text-sm font-medium" role="list">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`nl transition-colors py-1 ${
                    isActive
                      ? "on text-zinc-950 dark:text-white font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Actions & Utilities */}
        <div className="flex items-center gap-3">
          {/* Live CV Link */}
          <Link
            href="/cv"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-[#FF6B2B] dark:hover:text-[#FF6B2B] border border-zinc-200 dark:border-zinc-800 hover:border-[#FF6B2B]/40 dark:hover:border-[#FF6B2B]/40 px-3.5 py-1.5 rounded-full transition-all"
            title="View & Download CV"
          >
            <FileDown className="w-3.5 h-3.5 text-[#FF6B2B]" />
            <span>CV</span>
          </Link>

          {/* Admin shortcut */}
          <Link
            href="/admin"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            title="Admin Dashboard"
            aria-label="Admin Dashboard"
          >
            <ShieldCheck className="w-4 h-4" />
          </Link>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700 transition-transform" />
            )}
          </button>

          {/* Hire Me CTA (Folio Shimmer Style) */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 shimmer bg-[#FF6B2B] hover:bg-[#FF8F5C] text-white text-sm font-semibold px-5 py-2 rounded-full shadow-sm shadow-[#FF6B2B]/20 transition-all"
          >
            <span>Hire me</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-3">
            <ul className="flex flex-col gap-3 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 text-zinc-700 dark:text-zinc-300 hover:text-[#FF6B2B] dark:hover:text-[#FF6B2B] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex flex-col gap-2.5">
              <Link
                href="/cv"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 py-2.5 rounded-xl text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <FileDown className="w-4 h-4 text-[#FF6B2B]" />
                <span>View & Download CV</span>
              </Link>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#FF6B2B] text-white py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-[#FF6B2B]/20"
              >
                <span>Hire me</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
