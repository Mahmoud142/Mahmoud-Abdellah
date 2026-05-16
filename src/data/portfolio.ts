import type { PortfolioData } from "../types";

export const portfolioData: PortfolioData = {
    name: "Mahmoud Abdellah",
    role: "Software Engineer",
    location: "Ismailia, Egypt",
    intro: "Software Engineer specializing in building scalable backend systems and high-quality frontend applications.",
    availability: "Available",
    heroBlurb: "",
    stats: [
        { label: "Graduation", value: "2026" },
        { label: "Focus", value: "Backend & Systems" },
        { label: "Track", value: "Enterprise Architecture" },
    ],
    education: [
        {
            institution: "Bachelor of Computer Science and Informatics",
            location: "Ismailia, Egypt",
            degree: "Suez Canal University",
            period: "Sep 2022 – Jun 2026",
            details: "",
        },
    ],
    skills: [
        "TypeScript",
        "JavaScript (ES6+)",
        "Python",
        "C++",
        "SQL",
        "HTML",
        "CSS",
        "Node.js",
        "Express.js",
        "NestJS",
        "API Design",
        "WebSockets (Socket.io)",
        "Backend Architecture",
        "React",
        "Redux Toolkit",
        "Bootstrap",
        "NoSQL",
        "MongoDB",
        "MySQL",
        "Docker",
        "Docker Compose",
        "Nginx",
        "SSL / HTTPS",
        "Linux",
        "AWS",
        "Git",
        "GitHub",
        "Postman",
        "Vercel",
    ],
    skillGroups: [
        {
            title: "Core Languages",
            items: [
                "TypeScript",
                "JavaScript (ES6+)",
                "Python",
                "C++",
                "SQL",
                "HTML5",
                "CSS3",
            ],
        },
        {
            title: "Backend Engineering",
            items: [
                "Node.js",
                "Express.js",
                "NestJS",
                "RESTful API Design",
                "Microservices",
                "Real-time Systems (Socket.io)",
                "Redis Caching",
                "System Architecture",
            ],
        },
        {
            title: "Databases & Storage",
            items: [
                "PostgreSQL",
                "MySQL",
                "MongoDB",
                "Redis",
                "Database Design & Optimization",
            ],
        },
        {
            title: "DevOps & Cloud",
            items: [
                "Docker & Docker Compose",
                "AWS",
                "CI/CD Pipelines",
                "Nginx",
                "Linux",
            ],
        },
        {
            title: "Software Methodologies",
            items: [
                "System Design",
                "Agile / Scrum",
                "Clean Code & SOLID",
                "Design Patterns",
                "TDD / BDD",
            ],
        },
        {
            title: "Frontend Development",
            items: [
                "React.js",
                "Redux Toolkit",
                "Responsive Web Design",
                "State Management",
                "Bootstrap",
            ],
        },
        {
            title: "Development Tools",
            items: ["Git", "GitHub", "GitLab", "Jira", "Postman", "Vercel"],
        },
    ],
    focusAreas: [
        "Software Engineer with a comprehensive command of the full stack, engineering sophisticated backend architectures and high-performance frontend applications with a focus on massive scale.",
        "A dedicated problem solver leveraging deep Data Structures and Algorithms expertise to architect efficient solutions for complex, high-concurrency technical challenges.",
        "Bridging the divide between server-side stability and client-side excellence by integrating modern software engineering principles into resilient, end-to-end digital solutions.",
    ],
    timeline: [
        {
            year: "2022",
            title: "Built core foundations",
            description:
                "Started Computer Science and focused on programming, algorithms, and problem solving.",
        },
        {
            year: "2023",
            title: "Focused on backend",
            description:
                "Built backend skills with Node.js, REST APIs, MongoDB, and MySQL.",
        },
        {
            year: "2024",
            title: "Shipped full-stack apps",
            description:
                "Combined React and Redux with my APIs to deliver end-to-end products.",
        },
        {
            year: "2025",
            title: "Worked in real teams",
            description:
                "Improved quality, collaboration, and delivery through professional training.",
        },
        {
            year: "2026",
            title: "Delivering production systems",
            description:
                "Building and deploying secure, maintainable applications for real users.",
        },
    ],
    projects: [
        {
            title: "Minify Analytics Platform",
            summary:
                "A high-throughput link management and real-time analytics platform built with NestJS and React 19.",
            stack: [
                "NestJS",
                "React.js",
                "TypeScript",
                "Redux Toolkit",
                "MongoDB",
            ],
            outcome:
                "Architected scalable NoSQL schemas and engineered secure 2FA flows for rigorous identity verification.",
            github: "https://github.com/Mahmoud142/minify-api",
            live: "https://minifyapp.vercel.app",
        },
        {
            title: "MindMate Healthcare",
            summary:
                "Real-time IoT telemetry platform for Alzheimer’s patients tracking with live GPS streaming.",
            stack: [
                "React.js",
                "Redux Toolkit",
                "Real-time Systems (Socket.io)",
                "Node.js",
            ],
            outcome:
                "Spearheaded low-latency tracking and designed fault-tolerant state management for critical medical dashboards.",
            github: "https://github.com/MindMate-Project/Web",
            live: "https://web-mindmate.vercel.app",
        },
        {
            title: "Enterprise E-Commerce API",
            summary:
                "Production-ready RESTful API designed for high-volume product catalogs and secure financial transactions.",
            stack: ["Node.js", "Express.js", "MongoDB", "RESTful API Design"],
            outcome:
                "Implemented rigorous RBAC and integrated Stripe for secure transactions and optimized image processing pipelines.",
            github: "https://github.com/Mahmoud142/ECommerce-api",
        },
        {
            title: "Secure Todo API",
            summary:
                "Advanced task management API with relational modeling and JWT-secured authentication flows.",
            stack: ["Node.js", "Express.js", "MySQL", "Database Design & Optimization"],
            outcome:
                "Demonstrated strong backend engineering with relational modeling and modern ORM-based development.",
            github: "https://github.com/Mahmoud142/todo-api",
        },
    ],
    contactLinks: [
        {
            label: "Email",
            href: "mailto:mahmoud.abdellah014@gmail.com",
        },
        { label: "GitHub", href: "https://github.com/Mahmoud142" },
        {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/mahmoud-3bdellah",
        },
        { label: "Facebook", href: "https://facebook.com/Mahmoud.3bdellah14" },
        {
            label: "Instagram",
            href: "https://www.instagram.com/mahmoud_abdellah_",
        },
        { label: "WhatsApp", href: "https://wa.me/201090268143" },
        { label: "X / Twitter", href: "https://x.com/Abo_3bdellah" },
    ],
};
