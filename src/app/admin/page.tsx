"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PortfolioData, Experience, Project } from "@/types/portfolio";
import {
  ShieldCheck,
  Save,
  Plus,
  Trash2,
  FileDown,
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Layers,
  GraduationCap,
  User,
  Cpu,
  Lock,
  LogOut,
  Eye,
  Printer,
} from "lucide-react";

export default function AdminPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "experience" | "projects" | "skills" | "education" | "cv">("profile");

  // Strict Password Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authenticating, setAuthenticating] = useState(false);

  useEffect(() => {
    // Check if session is already active via server cookie
    fetch("/api/admin/verify")
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        }
      })
      .catch(() => { })
      .finally(() => {
        // Load portfolio data
        fetch("/api/portfolio")
          .then((res) => res.json())
          .then((resData) => {
            setData(resData);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Failed to load portfolio data in admin:", err);
            setLoading(false);
          });
      });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthenticating(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });

      const resJson = await res.json();
      if (res.ok && resJson.success) {
        setIsAuthenticated(true);
        setPasswordInput("");
      } else {
        setAuthError(resJson.error || "Incorrect admin password.");
      }
    } catch {
      setAuthError("Failed to connect to authentication server.");
    } finally {
      setAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    setStatusMessage(null);

    try {
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resJson = await response.json();
      if (response.ok && resJson.success) {
        setStatusMessage({
          type: "success",
          text: "All features updated! Changes immediately reflect on your portfolio and downloadable Live CV.",
        });
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({
          type: "error",
          text: resJson.error || "Failed to save portfolio data.",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Network error occurred while saving.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleExportJson = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 text-white">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-[#FF6B2B]/10 text-[#FF6B2B] flex items-center justify-center mb-6 mx-auto">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-extrabold text-center mb-2 tracking-tight">Admin Authentication</h2>
          <p className="text-zinc-400 text-xs text-center mb-8 leading-relaxed">
            Please enter your administrator password configured in your environment to manage portfolio features.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-pw" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Admin Password
              </label>
              <input
                id="admin-pw"
                type="password"
                required
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setAuthError(null);
                }}
                className="w-full bg-zinc-800/90 border border-zinc-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6B2B] transition-colors"
                autoFocus
              />
              {authError && (
                <div className="p-3 mt-3 rounded-xl bg-red-950/60 border border-red-800/80 text-xs text-red-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={authenticating}
              className="w-full bg-[#FF6B2B] hover:bg-[#FF8F5C] text-white font-bold text-sm py-3.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-[#FF6B2B]/20 disabled:opacity-50"
            >
              {authenticating ? "Verifying..." : "Unlock Dashboard"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
            <Link
              href="/"
              className="text-xs font-medium text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B2B]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans pb-24">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 transition-colors"
              title="Back to portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white">Portfolio Admin</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#FF6B2B]/20 text-[#FF6B2B]">
                  Authenticated
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Updating {data.profile.name}&apos;s Live Portfolio & CV
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/cv"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3.5 py-2 rounded-xl border border-zinc-700 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-[#FF6B2B]" />
              <span>Preview Live CV</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </Link>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3.5 py-2 rounded-xl border border-zinc-700 transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </Link>

            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3.5 py-2 rounded-xl border border-zinc-700 transition-colors cursor-pointer"
              title="Download portfolio-data.json backup"
            >
              <FileDown className="w-3.5 h-3.5 text-[#FF6B2B]" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-[#FF6B2B] hover:bg-[#FF8F5C] text-white text-xs font-bold px-5 py-2 rounded-xl transition-all shadow-md shadow-[#FF6B2B]/20 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? "Saving..." : "Save Changes"}</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-red-950/60 hover:text-red-400 text-zinc-400 flex items-center justify-center transition-colors cursor-pointer border border-zinc-700"
              title="Lock / Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Status Alert Banner */}
      {statusMessage && (
        <div className="max-w-6xl mx-auto px-6 mt-6">
          <div
            className={`p-4 rounded-2xl flex items-center gap-3 text-sm ${statusMessage.type === "success"
              ? "bg-emerald-950/80 border border-emerald-700 text-emerald-200"
              : "bg-red-950/80 border border-red-700 text-red-200"
              }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 mt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-zinc-800 no-scrollbar">
          {[
            { id: "profile", label: "Profile & Summary", icon: User },
            { id: "experience", label: "Work Experience", icon: Briefcase },
            { id: "projects", label: "Projects & Systems", icon: Layers },
            { id: "skills", label: "Technical Skills", icon: Cpu },
            { id: "education", label: "Education", icon: GraduationCap },
            { id: "cv", label: "Live CV & Export", icon: FileDown },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${activeTab === tab.id
                  ? "bg-[#FF6B2B] text-white shadow-sm shadow-[#FF6B2B]/20"
                  : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Profile & Summary */}
        {activeTab === "profile" && (
          <div className="space-y-6 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8">
            <h3 className="font-bold text-xl text-white">Profile Details & Bio</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={data.profile.name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, name: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FF6B2B]"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Professional Title</label>
                <input
                  type="text"
                  value={data.profile.title}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, title: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FF6B2B]"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={data.profile.email}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, email: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FF6B2B]"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={data.profile.phone}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, phone: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FF6B2B]"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Location</label>
                <input
                  type="text"
                  value={data.profile.location}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, location: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FF6B2B]"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Work Availability Status</label>
                <input
                  type="text"
                  value={data.profile.status}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, status: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FF6B2B]"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">LinkedIn URL</label>
                <input
                  type="text"
                  value={data.profile.linkedin}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, linkedin: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FF6B2B]"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">GitHub URL</label>
                <input
                  type="text"
                  value={data.profile.github}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, github: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FF6B2B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">Professional Summary / CV Bio</label>
              <textarea
                rows={5}
                value={data.profile.summary}
                onChange={(e) =>
                  setData({
                    ...data,
                    profile: { ...data.profile, summary: e.target.value },
                  })
                }
                className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl p-4 focus:outline-none focus:border-[#FF6B2B]"
              />
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Years Experience</label>
                <input
                  type="text"
                  value={data.profile.yearsExperience}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, yearsExperience: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FF6B2B]"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Projects Count</label>
                <input
                  type="text"
                  value={data.profile.projectsCompleted}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, projectsCompleted: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FF6B2B]"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Satisfaction / Score</label>
                <input
                  type="text"
                  value={data.profile.clientSatisfaction}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, clientSatisfaction: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FF6B2B]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Work Experience */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl text-white">Work Experience</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Manage career milestones, roles, and bullet accomplishments.
                </p>
              </div>

              <button
                onClick={() => {
                  const newExp: Experience = {
                    id: `exp-${Date.now()}`,
                    role: "New Role",
                    company: "Company Name",
                    location: "Location",
                    period: "Month Year – Present",
                    highlights: ["Key achievement or responsibility"],
                  };
                  setData({
                    ...data,
                    experiences: [newExp, ...data.experiences],
                  });
                }}
                className="inline-flex items-center gap-2 bg-[#FF6B2B] hover:bg-[#FF8F5C] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Experience</span>
              </button>
            </div>

            <div className="space-y-6">
              {data.experiences.map((exp, idx) => (
                <div
                  key={exp.id}
                  className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-7 space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <span className="text-xs font-mono text-[#FF6B2B] font-bold">
                      Position #{idx + 1}
                    </span>
                    <button
                      onClick={() => {
                        setData({
                          ...data,
                          experiences: data.experiences.filter((e) => e.id !== exp.id),
                        });
                      }}
                      className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Job Title</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const updated = [...data.experiences];
                          updated[idx].role = e.target.value;
                          setData({ ...data, experiences: updated });
                        }}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...data.experiences];
                          updated[idx].company = e.target.value;
                          setData({ ...data, experiences: updated });
                        }}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => {
                          const updated = [...data.experiences];
                          updated[idx].location = e.target.value;
                          setData({ ...data, experiences: updated });
                        }}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Period</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => {
                          const updated = [...data.experiences];
                          updated[idx].period = e.target.value;
                          setData({ ...data, experiences: updated });
                        }}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl px-3 py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-2">
                      Accomplishments / Highlights (One per line)
                    </label>
                    <textarea
                      rows={4}
                      value={exp.highlights.join("\n")}
                      onChange={(e) => {
                        const updated = [...data.experiences];
                        updated[idx].highlights = e.target.value
                          .split("\n")
                          .filter((l) => l.trim().length > 0);
                        setData({ ...data, experiences: updated });
                      }}
                      className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl p-3"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Projects & Systems */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl text-white">Projects & Portfolio</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Manage systems, live URLs, stacks, and architecture highlights.
                </p>
              </div>

              <button
                onClick={() => {
                  const newProj: Project = {
                    id: `proj-${Date.now()}`,
                    title: "New Project System",
                    category: "Enterprise & Healthcare",
                    shortDescription: "Overview of system",
                    longDescription: "Detailed technical architecture",
                    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
                    highlights: ["Key achievement 1", "Key achievement 2"],
                    liveUrl: "",
                    githubUrl: "https://github.com/naytdgreat",
                    featured: true,
                    tag: "New",
                  };
                  setData({
                    ...data,
                    projects: [newProj, ...data.projects],
                  });
                }}
                className="inline-flex items-center gap-2 bg-[#FF6B2B] hover:bg-[#FF8F5C] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-6">
              {data.projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-7 space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <span className="text-xs font-mono text-[#FF6B2B] font-bold">
                      Project #{idx + 1}: {proj.title}
                    </span>
                    <button
                      onClick={() => {
                        setData({
                          ...data,
                          projects: data.projects.filter((p) => p.id !== proj.id),
                        });
                      }}
                      className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[idx].title = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Category</label>
                      <input
                        type="text"
                        value={proj.category}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[idx].category = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={proj.tag || ""}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[idx].tag = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Live URL (optional)</label>
                      <input
                        type="text"
                        value={proj.liveUrl || ""}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[idx].liveUrl = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        placeholder="https://..."
                        className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">GitHub Repo</label>
                      <input
                        type="text"
                        value={proj.githubUrl || ""}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[idx].githubUrl = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Tech Stack (Comma-separated)</label>
                      <input
                        type="text"
                        value={proj.techStack.join(", ")}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[idx].techStack = e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean);
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl px-3 py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Short Description</label>
                    <input
                      type="text"
                      value={proj.shortDescription}
                      onChange={(e) => {
                        const updated = [...data.projects];
                        updated[idx].shortDescription = e.target.value;
                        setData({ ...data, projects: updated });
                      }}
                      className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">
                      Deliverables / Highlights (One per line)
                    </label>
                    <textarea
                      rows={3}
                      value={proj.highlights.join("\n")}
                      onChange={(e) => {
                        const updated = [...data.projects];
                        updated[idx].highlights = e.target.value
                          .split("\n")
                          .filter((l) => l.trim().length > 0);
                        setData({ ...data, projects: updated });
                      }}
                      className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl p-3"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Technical Skills */}
        {activeTab === "skills" && (
          <div className="space-y-8 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8">
            <h3 className="font-bold text-xl text-white">Technical Skills & Categories</h3>

            <div>
              <h4 className="text-sm font-bold text-[#FF6B2B] mb-2">Languages</h4>
              <p className="text-xs text-zinc-400 mb-3">Comma-separated list</p>
              <input
                type="text"
                value={data.skills.languages.map((l) => l.name).join(", ")}
                onChange={(e) => {
                  const names = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                  setData({
                    ...data,
                    skills: {
                      ...data.skills,
                      languages: names.map((n) => ({ name: n, level: "Advanced" })),
                    },
                  });
                }}
                className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl p-3"
              />
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#FF6B2B] mb-2">Frontend & Mobile</h4>
              <p className="text-xs text-zinc-400 mb-3">Comma-separated list</p>
              <input
                type="text"
                value={data.skills.frontend.map((f) => f.name).join(", ")}
                onChange={(e) => {
                  const names = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                  setData({
                    ...data,
                    skills: {
                      ...data.skills,
                      frontend: names.map((n) => ({ name: n, level: "Expert" })),
                    },
                  });
                }}
                className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl p-3"
              />
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#FF6B2B] mb-2">Backend & Databases</h4>
              <p className="text-xs text-zinc-400 mb-3">Comma-separated list</p>
              <input
                type="text"
                value={data.skills.backend.map((b) => b.name).join(", ")}
                onChange={(e) => {
                  const names = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                  setData({
                    ...data,
                    skills: {
                      ...data.skills,
                      backend: names.map((n) => ({ name: n, level: "Advanced" })),
                    },
                  });
                }}
                className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl p-3"
              />
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#FF6B2B] mb-2">DevOps, Architecture & Tools</h4>
              <p className="text-xs text-zinc-400 mb-3">Comma-separated list</p>
              <input
                type="text"
                value={data.skills.devopsAndTools.map((d) => d.name).join(", ")}
                onChange={(e) => {
                  const names = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                  setData({
                    ...data,
                    skills: {
                      ...data.skills,
                      devopsAndTools: names.map((n) => ({ name: n, level: "Intermediate" })),
                    },
                  });
                }}
                className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl p-3"
              />
            </div>
          </div>
        )}

        {/* TAB 5: Education */}
        {activeTab === "education" && (
          <div className="space-y-6 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8">
            <h3 className="font-bold text-xl text-white">Academic Qualifications</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Institution</label>
                <input
                  type="text"
                  value={data.education.institution}
                  onChange={(e) =>
                    setData({
                      ...data,
                      education: { ...data.education, institution: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Degree / Certification</label>
                <input
                  type="text"
                  value={data.education.degree}
                  onChange={(e) =>
                    setData({
                      ...data,
                      education: { ...data.education, degree: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Period</label>
                <input
                  type="text"
                  value={data.education.period}
                  onChange={(e) =>
                    setData({
                      ...data,
                      education: { ...data.education, period: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-2.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">
                Key Coursework (Comma-separated)
              </label>
              <textarea
                rows={3}
                value={data.education.coursework.join(", ")}
                onChange={(e) =>
                  setData({
                    ...data,
                    education: {
                      ...data.education,
                      coursework: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    },
                  })
                }
                className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl p-3"
              />
            </div>
          </div>
        )}

        {/* TAB 6: Live CV & Export */}
        {activeTab === "cv" && (
          <div className="space-y-6 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8">
            <h3 className="font-bold text-xl text-white">Live Downloadable CV</h3>
            <p className="text-xs text-zinc-400">
              The CV is generated dynamically from your active data above. Any edits you make across Profile, Experience, Projects, Skills, and Education are instantly reflected on the live downloadable CV.
            </p>

            <div className="p-6 rounded-2xl bg-zinc-800/60 border border-zinc-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-base text-white">Live Formatted CV</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Ready for executive review, print-to-PDF export, and instant viewing.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/cv"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-[#FF6B2B] hover:bg-[#FF8F5C] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open & Print / Download CV</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
