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


export interface TimelineItem {
    year: string;
    title: string;
    description: string;
}

export interface LanguageItem {
    name: string;
    proficiency: string;
    level: string;
    percentage: number;
    code: string;
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
    languages: LanguageItem[];
}

export interface Project {
    title: string;
    summary: string;
    stack: string[];
    outcome: string;
    github?: string;
    live?: string;
}
export interface SkillGroup {
    title: string;
    items: string[];
}

