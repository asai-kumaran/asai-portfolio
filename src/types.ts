export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  status: 'Completed' | 'Ongoing' | 'Prototype';
  tags: string[];
  keyAchievements: string[];
  demoType: 'fan' | 'deepfake' | 'flood';
  role?: string;
  technologies?: string[];
}

export interface Education {
  id: string;
  institution: string;
  period: string;
  degree: string;
  details: string;
  scoreLabel: string;
  scoreValue: string;
  location: string;
}

export interface Skill {
  name: string;
  category: 'Languages' | 'Database' | 'Tools & Platforms' | 'Concepts';
  proficiency: number; // percentage for visualization/interactivity
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badgeColor: string;
  description: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  isAutoReplied: boolean;
}
