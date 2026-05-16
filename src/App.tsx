import { useEffect, useState, type MouseEvent } from "react";
import type { IconType } from "react-icons";
import {
    FaArrowUpRightFromSquare,
    FaArrowUp,
    FaAws,
    FaBars,
    FaFacebook,
    FaCircleCheck,
    FaCodeBranch,
    FaDatabase,
    FaDiagramProject,
    FaEnvelope,
    FaFileArrowDown,
    FaGithub as FaGithubBrand,
    FaInstagram,
    FaLinkedin,
    FaLock,
    FaMoon,
    FaSun,
    FaRegClock,
    FaRegCircleDot,
    FaServer,
    FaWhatsapp,
    FaXmark,
    FaXTwitter,
    FaGraduationCap,
    FaUser,
    FaCode,
    FaRocket,
    FaLocationDot,
    FaArrowDown,
    FaNetworkWired,
} from "react-icons/fa6";
import {
    SiBootstrap,
    SiCplusplus,
    SiCss,
    SiDocker,
    SiExpress,
    SiGit,
    SiGithub,
    SiHtml5,
    SiJavascript,
    SiLinux,
    SiMongodb,
    SiMysql,
    SiNestjs,
    SiNginx,
    SiNodedotjs,
    SiPostman,
    SiPython,
    SiReact,
    SiRedux,
    SiSocketdotio,
    SiTypescript,
    SiVercel,
    SiGitlab,
    SiRedis,
    SiGithubactions,
    SiJira,
    SiPostgresql,
} from "react-icons/si";
import { TbApi, TbDatabaseCog } from "react-icons/tb";

import { portfolioData } from "./data/portfolio";
import { useScrollReveal } from "./hooks/useScrollReveal";

const NAV_LINKS = [
    { id: "home", label: "Home" },
    { id: "education", label: "Education" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
] as const;

type NavSectionId = (typeof NAV_LINKS)[number]["id"];

const NAVBAR_SCROLL_OFFSET = 96;

const SKILL_ICON_MAP: Record<string, IconType> = {
    "JavaScript (ES6+)": SiJavascript,
    TypeScript: SiTypescript,
    Python: SiPython,
    "C++": SiCplusplus,
    SQL: FaDatabase,
    HTML5: SiHtml5,
    CSS3: SiCss,
    "Node.js": SiNodedotjs,
    "Express.js": SiExpress,
    NestJS: SiNestjs,
    "RESTful API Design": TbApi,
    Microservices: FaNetworkWired,
    "Real-time Systems (Socket.io)": SiSocketdotio,
    "Redis Caching": SiRedis,
    "System Architecture": FaDiagramProject,
    "React.js": SiReact,
    React: SiReact,
    "Redux Toolkit": SiRedux,
    "Responsive Web Design": SiBootstrap,
    "State Management": SiRedux,
    Bootstrap: SiBootstrap,
    "Database Design & Optimization": TbDatabaseCog,
    "Docker & Docker Compose": SiDocker,
    Nginx: SiNginx,
    AWS: FaAws,
    "CI/CD Pipelines": SiGithubactions,
    Linux: SiLinux,
    "System Design": FaDiagramProject,
    "Agile / Scrum": SiJira,
    "Clean Code & SOLID": FaCode,
    "Design Patterns": FaRocket,
    "TDD / BDD": FaCircleCheck,
    Git: SiGit,
    GitHub: SiGithub,
    GitLab: SiGitlab,
    Jira: SiJira,
    Postman: SiPostman,
    Vercel: SiVercel,
    PostgreSQL: SiPostgresql,
    MySQL: SiMysql,
    MongoDB: SiMongodb,
    Redis: SiRedis,
};

const SKILL_COLOR_MAP: Record<string, string> = {
    "JavaScript (ES6+)": "#F7DF1E",
    TypeScript: "#3178C6",
    Python: "#3776AB",
    "C++": "#00599C",
    SQL: "#4479A1",
    "SQL (PostgreSQL / MySQL)": "#4479A1",
    HTML5: "#E34F26",
    CSS3: "#1572B6",
    "Node.js": "#339933",
    "Express.js": "#ffffff",
    NestJS: "#E0234E",
    "RESTful API Design": "#00f5ff",
    Microservices: "#FF9900",
    "Real-time Systems (Socket.io)": "#ffffff",
    "Redis Caching": "#DC382D",
    "System Architecture": "#00f5ff",
    "React.js": "#61DAFB",
    React: "#61DAFB",
    "Redux Toolkit": "#764ABC",
    "Responsive Web Design": "#7952B3",
    "State Management": "#764ABC",
    Bootstrap: "#7952B3",
    PostgreSQL: "#4169E1",
    MySQL: "#4479A1",
    MongoDB: "#47A248",
    Redis: "#DC382D",
    "Database Design & Optimization": "#4479A1",
    "Docker & Docker Compose": "#2496ED",
    AWS: "#FF9900",
    "CI/CD Pipelines": "#2088FF",
    Nginx: "#009639",
    Linux: "#FCC624",
    "System Design": "#00f5ff",
    "Agile / Scrum": "#0052CC",
    "Clean Code & SOLID": "#00f5ff",
    "Design Patterns": "#FF9900",
    "TDD / BDD": "#47A248",
    Git: "#F05032",
    GitHub: "#ffffff",
    GitLab: "#FC6D26",
    Jira: "#0052CC",
    Postman: "#FF6C37",
    Vercel: "#ffffff",
};

function getSkillIcon(skill: string): IconType {
    return SKILL_ICON_MAP[skill] ?? FaRegCircleDot;
}

function getSkillColor(skill: string): string {
    return SKILL_COLOR_MAP[skill] ?? "var(--color-accent)";
}

function App() {
    useScrollReveal();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Theme toggle state logic
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        const savedTheme = localStorage.getItem("portfolio-theme");
        if (savedTheme === "light" || savedTheme === "dark") {
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("portfolio-theme", newTheme);
    };

    const [activeSection, setActiveSection] = useState<NavSectionId>("home");

    useEffect(() => {
        const sectionIds = NAV_LINKS.map((link) => link.id);
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter((section): section is HTMLElement => section !== null)
            .sort((first, second) => first.offsetTop - second.offsetTop);

        let ticking = false;

        function updateScrollState() {
            // 1. Update UI Scroll Progress

            const totalScroll =
                document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                setScrollProgress((window.scrollY / totalScroll) * 100);
            }

            // 2. Update Active Section
            if (sections.length > 0) {
                const scrollMarker = window.scrollY + NAVBAR_SCROLL_OFFSET + 18;
                let nextActive = sections[0].id as NavSectionId;

                for (const section of sections) {
                    // Caching offsetTop instead of getBoundingClientRect() to avoid forced reflows
                    const sectionTop = section.offsetTop;

                    if (sectionTop <= scrollMarker) {
                        nextActive = section.id as NavSectionId;
                    } else {
                        break;
                    }
                }

                const bottomEdge = window.scrollY + window.innerHeight;
                const pageHeight = document.documentElement.scrollHeight;

                if (bottomEdge >= pageHeight - 4) {
                    nextActive = sections[sections.length - 1]
                        .id as NavSectionId;
                }

                setActiveSection(nextActive);
            }
            ticking = false;
        }

        function handleScroll() {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollState);
                ticking = true;
            }
        }

        function syncFromHash() {
            const hashId = window.location.hash.replace("#", "");

            if (sectionIds.includes(hashId as NavSectionId)) {
                setActiveSection(hashId as NavSectionId);
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });
        syncFromHash();
        handleScroll();
        window.addEventListener("hashchange", syncFromHash);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
            window.removeEventListener("hashchange", syncFromHash);
        };
    }, []);

    function handleNavClick(
        event: MouseEvent<HTMLAnchorElement>,
        sectionId: NavSectionId,
    ) {
        event.preventDefault();
        const target = document.getElementById(sectionId);

        if (!target) {
            return;
        }

        const targetTop =
            target.getBoundingClientRect().top +
            window.scrollY -
            NAVBAR_SCROLL_OFFSET;

        setActiveSection(sectionId);
        setMobileMenuOpen(false);
        window.history.replaceState(null, "", `#${sectionId}`);
        window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
    }

    function getContactColor(label: string) {
        const key = label.toLowerCase();
        if (key.includes("mail") || key.includes("email")) return "var(--brand-email)";
        if (key.includes("github")) return "var(--brand-github)";
        if (key.includes("linkedin")) return "var(--brand-linkedin)";
        if (key.includes("facebook")) return "var(--brand-facebook)";
        if (key.includes("instagram")) return "var(--brand-instagram)";
        if (key.includes("whatsapp")) return "var(--brand-whatsapp)";
        if (key.includes("twitter") || key.includes("x")) return "var(--brand-twitter)";
        return "var(--color-accent)";
    }

    function getContactIcon(label: string) {
        const key = label.toLowerCase();

        if (key.includes("mail") || key.includes("email")) {
            return <FaEnvelope aria-hidden="true" />;
        }

        if (key.includes("github")) {
            return <FaGithubBrand aria-hidden="true" />;
        }

        if (key.includes("linkedin")) {
            return <FaLinkedin aria-hidden="true" />;
        }

        if (key.includes("facebook")) {
            return <FaFacebook aria-hidden="true" />;
        }

        if (key.includes("instagram")) {
            return <FaInstagram aria-hidden="true" />;
        }

        if (key.includes("whatsapp")) {
            return <FaWhatsapp aria-hidden="true" />;
        }

        if (key.includes("twitter") || key.includes("x")) {
            return <FaXTwitter aria-hidden="true" />;
        }

        return <FaRegCircleDot aria-hidden="true" />;
    }

    function getContactClass(label: string) {
        const key = label.toLowerCase();

        if (key.includes("mail") || key.includes("email")) {
            return "contact-email";
        }

        if (key.includes("github")) return "contact-github";
        if (key.includes("linkedin")) return "contact-linkedin";
        if (key.includes("facebook")) return "contact-facebook";
        if (key.includes("instagram")) return "contact-instagram";
        if (key.includes("whatsapp")) return "contact-whatsapp";
        if (key.includes("twitter") || key.includes("x")) return "contact-x";

        return "contact-generic";
    }

    return (
        <>
            <nav className="navbar">
                <div
                    className="scroll-progress-bar"
                    style={{ width: `${scrollProgress}%` }}
                />
                <div className="navbar-brand">
                    <span className="navbar-name">MA</span>
                </div>
                <div className="navbar-links">
                    {NAV_LINKS.map((link) => (
                        <a
                            href={`#${link.id}`}
                            key={link.id}
                            onClick={(event) => handleNavClick(event, link.id)}
                            className={
                                activeSection === link.id ? "is-active" : ""
                            }
                            aria-current={
                                activeSection === link.id ? "page" : undefined
                            }
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="navbar-actions">
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                        title="Toggle Theme"
                    >
                        <FaMoon />
                    </button>
                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <FaXmark /> : <FaBars />}
                    </button>
                </div>
            </nav>

            {/* Mobile drawer */}
            <div
                className={`mobile-drawer-backdrop ${mobileMenuOpen ? "is-open" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
                aria-hidden="true"
            />
            <nav
                className={`mobile-drawer ${mobileMenuOpen ? "is-open" : ""}`}
                aria-label="Mobile navigation"
            >
                <div className="mobile-drawer-links">
                    {NAV_LINKS.map((link) => (
                        <a
                            href={`#${link.id}`}
                            key={link.id}
                            onClick={(event) => handleNavClick(event, link.id)}
                            className={
                                activeSection === link.id ? "is-active" : ""
                            }
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </nav>

            <main className="shell">
                <div className="background-orb orb-one" />
                <div className="background-orb orb-two" />
                <div className="background-orb orb-three" />

                <section className="hero panel nav-section" id="home">
                    <div className="hero-copy">
                        <div className="hero-status-row hero-animate">
                            <div className="status-badge">
                                <span className="status-dot"></span>
                                {portfolioData.availability}
                            </div>
                            <a
                                href="https://drive.google.com/file/d/1QopGpVKlf9oUcYkB3zBz4I2efCM5HQmL/view?usp=drive_link"
                                className="resume-badge"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaArrowUpRightFromSquare aria-hidden="true" />
                                <span>Resume</span>
                            </a>
                        </div>
                        <h1 className="hero-animate hero-delay-1">
                            {portfolioData.name}
                            <span>{portfolioData.role}</span>
                        </h1>
                        <p className="hero-intro hero-animate hero-delay-2">
                            {portfolioData.intro}
                        </p>
                        {portfolioData.heroBlurb && (
                            <p className="hero-blurb hero-animate hero-delay-2">
                                {portfolioData.heroBlurb}
                            </p>
                        )}

                        <div className="hero-social-icons hero-animate hero-delay-3">
                            {portfolioData.contactLinks.map((link) => (
                                <a
                                    href={link.href}
                                    key={link.label}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hero-social-icon"
                                    aria-label={link.label}
                                    title={link.label}
                                    style={{ color: getContactColor(link.label) }}
                                >
                                    {getContactIcon(link.label)}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="hero-side">
                        <section className="panel inset-panel hero-image-card hero-animate hero-delay-2">
                            <img
                                src="/images/profile.jpg"
                                alt="Mahmoud profile"
                                className="hero-profile-image"
                                loading="lazy"
                                decoding="async"
                            />
                        </section>
                    </div>

                    <div className="hero-explore-container hero-animate hero-delay-4">
                        <button
                            className="hero-explore-btn"
                            onClick={() =>
                                document
                                    .getElementById("education")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            Explore Me
                            <FaArrowDown />
                        </button>
                    </div>
                </section>

                <div id="education" className="nav-section">
                    <div className="section-header reveal">
                        <FaGraduationCap
                            className="section-icon"
                            aria-hidden="true"
                        />
                        <h1 className="main-section-title">Education</h1>
                    </div>
                    <section className="panel">
                        <h2 className="align-center">Academic Background</h2>
                        <div className="education-list stagger-container">
                            {portfolioData.education.map((edu) => (
                                <div
                                    className="education-item reveal"
                                    key={edu.institution}
                                >
                                    <div className="education-header">
                                        <div>
                                            <h3>{edu.institution}</h3>
                                            <p className="education-degree">
                                                {edu.degree}
                                            </p>
                                        </div>
                                        <div className="education-meta">
                                            <span className="education-period">
                                                {edu.period}
                                            </span>
                                            <span className="education-location">
                                                {edu.location}
                                            </span>
                                        </div>
                                    </div>
                                    {edu.details && (
                                        <p className="education-details">
                                            {edu.details}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <section className="content-grid about-stack-layout">
                    <div id="about" className="nav-section">
                        <div className="section-header reveal">
                            <FaUser
                                className="section-icon"
                                aria-hidden="true"
                            />
                            <h1 className="main-section-title">About Me</h1>
                        </div>
                        <section className="panel">
                            <h2 className="align-left">Who am I?</h2>
                            <div className="about-text stagger-container">
                                {portfolioData.focusAreas.map((area) => (
                                    <p
                                        className="about-paragraph reveal"
                                        key={area}
                                    >
                                        {area}
                                    </p>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div id="skills" className="nav-section">
                        <div className="section-header reveal">
                            <FaCode
                                className="section-icon"
                                aria-hidden="true"
                            />
                            <h1 className="main-section-title">Skills</h1>
                        </div>
                        <section className="panel">
                            <div className="skill-groups stagger-container">
                                {portfolioData.skillGroups.map((group) => (
                                    <article
                                        className="skill-group reveal"
                                        key={group.title}
                                    >
                                        <h3>{group.title}</h3>
                                        <ul>
                                            {group.items.map((item) => {
                                                const SkillIcon =
                                                    getSkillIcon(item);
                                                const iconColor =
                                                    getSkillColor(item);

                                                return (
                                                    <li key={item}>
                                                        <span
                                                            className="skill-icon"
                                                            style={{
                                                                color: iconColor,
                                                            }}
                                                            aria-hidden="true"
                                                        >
                                                            <SkillIcon />
                                                        </span>
                                                        <span>{item}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </div>
                </section>

                <div id="projects" className="nav-section">
                    <div className="section-header reveal">
                        <FaRocket className="section-icon" aria-hidden="true" />
                        <h1 className="main-section-title">Projects</h1>
                    </div>
                    <section className="panel">
                        <div className="projects-grid stagger-container">
                            {portfolioData.projects.map((project) => (
                                <article
                                    className="project-card reveal"
                                    key={project.title}
                                >
                                    <h3>{project.title}</h3>
                                    <p>{project.summary}</p>
                                    <div className="tag-cloud compact">
                                        {project.stack.map((item) => {
                                            const SkillIcon =
                                                getSkillIcon(item);
                                            const iconColor =
                                                getSkillColor(item);
                                            return (
                                                <span key={item}>
                                                    <SkillIcon
                                                        className="tag-icon"
                                                        style={{
                                                            color: iconColor,
                                                        }}
                                                        aria-hidden="true"
                                                    />
                                                    {item}
                                                </span>
                                            );
                                        })}
                                    </div>
                                    <p className="project-outcome">
                                        <FaCircleCheck aria-hidden="true" />
                                        <span>{project.outcome}</span>
                                    </p>
                                    <div className="project-links">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                className="github-link"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <FaCodeBranch aria-hidden="true" />
                                                <span>GitHub</span>
                                                <FaArrowUpRightFromSquare aria-hidden="true" />
                                            </a>
                                        )}
                                        {project.live && (
                                            <a
                                                href={project.live}
                                                className="github-link live-link"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <FaArrowUpRightFromSquare aria-hidden="true" />
                                                <span>Live Demo</span>
                                            </a>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>

                <div id="contact" className="nav-section">
                    <div className="section-header reveal">
                        <FaEnvelope
                            className="section-icon"
                            aria-hidden="true"
                        />
                        <h1 className="main-section-title">
                            Let&apos;s Connect
                        </h1>
                    </div>
                    <section className="panel contact-strip">
                        <div className="contact-info-row reveal">
                            <div className="status-badge">
                                <span className="status-dot"></span>
                                <span>Available for opportunities</span>
                            </div>
                            <div className="location-badge">
                                <FaLocationDot aria-hidden="true" />
                                <span>{portfolioData.location}</span>
                            </div>
                        </div>
                        <div className="contact-grid stagger-container">
                            {portfolioData.contactLinks.map((link) => (
                                <a
                                    href={link.href}
                                    key={link.label}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`contact-card reveal ${getContactClass(link.label)}`}
                                >
                                    <span className="contact-icon">
                                        {getContactIcon(link.label)}
                                    </span>
                                    <span>{link.label}</span>
                                </a>
                            ))}
                        </div>
                    </section>
                </div>

                <footer className="site-footer">
                    <div className="terminal-signature">
                        <span className="prompt-symbol">&gt;</span>
                        <span className="command-text">
                            Built by {portfolioData.name}
                        </span>
                        <span className="comment-text">/* &copy; 2026 All Rights Reserved */</span>
                        <span className="cursor-blink">_</span>
                    </div>
                </footer>
            </main>
        </>
    );
}

export default App;
