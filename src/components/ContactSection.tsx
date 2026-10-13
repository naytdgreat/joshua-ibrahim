"use client";

import React, { useState } from "react";
import { Profile } from "@/types/portfolio";
import { Mail, Phone, MapPin, Send, Check, Copy, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

interface ContactSectionProps {
  profile: Profile;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          recipientEmail: profile.email,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        const data = await res.json();
        // Graceful fallback: open mailto if all providers fail
        if (res.status === 502) {
          const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
            formData.subject || `Inquiry from ${formData.name}`
          )}&body=${encodeURIComponent(
            `From: ${formData.name} (${formData.email})\n\n${formData.message}`
          )}`;
          window.open(mailtoUrl, "_blank");
          setIsSuccess(true);
          setFormData({ name: "", email: "", subject: "", message: "" });
          setTimeout(() => setIsSuccess(false), 5000);
        } else {
          setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        }
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-zinc-900 dark:bg-zinc-900/90 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden text-white border border-zinc-800 shadow-2xl">
          {/* Ambient light glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 bg-[#FF6B2B]/20 rounded-full blur-[100px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-60 h-60 bg-[#FF6B2B]/10 rounded-full blur-[90px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 flex flex-col">
              <p className="text-xs font-semibold text-[#FF6B2B] tracking-widest uppercase mb-3">
                Get In Touch
              </p>
              <h2 className="font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-5">
                Let&apos;s build<br />something great.
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8">
                Available for software engineering roles, full-stack contracts, enterprise integrations, and architecture consulting. Let&apos;s discuss your roadmap.
              </p>

              {/* Direct Channels */}
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-800/60 border border-zinc-700/60 group hover:border-[#FF6B2B]/50 transition-colors">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors text-sm min-w-0"
                  >
                    <div className="w-9 h-9 rounded-xl bg-zinc-700 flex items-center justify-center text-[#FF6B2B] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="truncate">{profile.email}</span>
                  </a>
                  <button
                    onClick={() => handleCopy(profile.email, "email")}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedField === "email" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-800/60 border border-zinc-700/60 group hover:border-[#FF6B2B]/50 transition-colors">
                  <a
                    href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors text-sm"
                  >
                    <div className="w-9 h-9 rounded-xl bg-zinc-700 flex items-center justify-center text-[#FF6B2B] shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span>{profile.phone}</span>
                  </a>
                  <button
                    onClick={() => handleCopy(profile.phone, "phone")}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
                    title="Copy Phone"
                  >
                    {copiedField === "phone" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-800/60 border border-zinc-700/60 text-zinc-300 text-sm">
                  <div className="w-9 h-9 rounded-xl bg-zinc-700 flex items-center justify-center text-[#FF6B2B] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>{profile.location}</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3 mt-8">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold border border-zinc-700 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#FF6B2B]" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold border border-zinc-700 transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-[#FF6B2B]" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7 bg-zinc-950/60 rounded-2xl p-6 sm:p-8 border border-zinc-800">
              <h3 className="font-bold text-xl text-white mb-2">Send a Message</h3>
              <p className="text-zinc-400 text-xs mb-6">
                Fill in the details below and I&apos;ll get back to you promptly.
              </p>

              {isSuccess ? (
                <div className="p-6 rounded-xl bg-emerald-950/50 border border-emerald-700/50 text-center animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg text-emerald-300">Message Sent!</h4>
                  <p className="text-xs text-emerald-400 mt-1">
                    Thanks for reaching out. I&apos;ll get back to you at <strong>{formData.email || profile.email}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-950/50 border border-red-700/50 text-red-300 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-zinc-400 mb-1.5">
                        Your Name <span className="text-[#FF6B2B]">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-zinc-800/80 border border-zinc-700 text-white text-sm rounded-xl px-4 py-3 placeholder-zinc-500 focus:outline-none focus:border-[#FF6B2B] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-zinc-400 mb-1.5">
                        Email Address <span className="text-[#FF6B2B]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-zinc-800/80 border border-zinc-700 text-white text-sm rounded-xl px-4 py-3 placeholder-zinc-500 focus:outline-none focus:border-[#FF6B2B] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-medium text-zinc-400 mb-1.5">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project Opportunity / Technical Contract"
                      className="w-full bg-zinc-800/80 border border-zinc-700 text-white text-sm rounded-xl px-4 py-3 placeholder-zinc-500 focus:outline-none focus:border-[#FF6B2B] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-zinc-400 mb-1.5">
                      Message <span className="text-[#FF6B2B]">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, timeline, and goals..."
                      className="w-full bg-zinc-800/80 border border-zinc-700 text-white text-sm rounded-xl px-4 py-3 placeholder-zinc-500 focus:outline-none focus:border-[#FF6B2B] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="shimmer w-full bg-[#FF6B2B] hover:bg-[#FF8F5C] text-white font-bold text-sm py-3.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-[#FF6B2B]/20 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Preparing Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
