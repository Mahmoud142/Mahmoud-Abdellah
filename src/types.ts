export interface ContactLink {
    label: string;
    href: string;
}

export interface Stat {
    label: string;
    value: string;
}

export interface Project {
    title: string;
    summary: string;
    stack: string[];
    outcome: string;
    github?: string;
    live?: string;
}

export interface Education {
    institution: string;
    location: string;
    degree: string;
    period: string;
    details: string;
}

export interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    url: string;
    language: string;
    stars: number;
    updatedAt: string;
}

export interface TimelineItem {
    year: string;
    title: string;
    description: string;
}

export interface SkillGroup {
    title: string;
    items: string[];
}

export interface PortfolioData {
    name: string;
    role: string;
    location: string;
    intro: string;
    availability: string;
    heroBlurb: string;
    stats: Stat[];
    education: Education[];
    skills: string[];
    skillGroups: SkillGroup[];
    focusAreas: string[];
    timeline: TimelineItem[];
    projects: Project[];
    contactLinks: ContactLink[];
}
