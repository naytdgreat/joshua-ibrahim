export interface Profile {
  name: string;
  shortName: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  status: string;
  openToWork: boolean;
  summary: string;
  yearsExperience: string;
  projectsCompleted: string;
  clientSatisfaction: string;
  headshotUrl: string;
  portraitUrl: string;
  cvPdfUrl?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  gpa: string;
  coursework: string[];
}

export interface SkillItem {
  name: string;
  level: string;
}

export interface Skills {
  languages: SkillItem[];
  frontend: SkillItem[];
  backend: SkillItem[];
  devopsAndTools: SkillItem[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  badge?: string;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  tag?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export interface PortfolioData {
  profile: Profile;
  education: Education;
  skills: Skills;
  experiences: Experience[];
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
}
