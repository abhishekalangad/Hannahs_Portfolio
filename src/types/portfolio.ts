export type PerspectiveMode = 'founder' | 'scholar';

export interface StatItem {
  value: string;
  label: string;
  description: string;
  icon?: string;
}

export interface VentureItem {
  id: string;
  title: string;
  role: string;
  period: string;
  category: 'E-Commerce' | 'Keynotes & Summits' | 'Pedagogy & Speech' | 'Analytics';
  lottiePath: string;
  badge: string;
  shortDesc: string;
  highlights: string[];
  tags: string[];
  link?: string;
  linkText?: string;
  domain?: string;
  metrics?: { label: string; value: string }[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  status: string;
  badge: string;
  lottiePath: string;
  desc: string;
  details: string[];
  modules?: string[];
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  icon: string;
  skills: { name: string; level: number; category?: string }[];
}

export interface AchievementItem {
  title: string;
  category: string;
  year: string;
  desc: string;
  icon: string;
}

export interface ModalDetailRecord {
  title: string;
  subtitle: string;
  period: string;
  narrative: string[];
  highlights: string[];
  tags?: string[];
  link?: string;
  linkText?: string;
  iframeUrl?: string;
}
