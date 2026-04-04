export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: 'software' | 'ai' | 'data';
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  extraLinks?: { label: string; url: string }[];
  metrics?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  image: string;
  quote: string;
  isCertification?: boolean;
  certLink?: string;
}

export interface ExperienceItem {
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
  subRole?: string;
  subPeriod?: string;
  subBullets?: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  gpa: string;
  coursework: string;
}

export interface Certification {
  title: string;
  issuer: string;
  url: string;
}

export type ProjectFilter = 'all' | 'software' | 'ai' | 'data';
