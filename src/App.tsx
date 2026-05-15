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
} from "react-icons/si";
import { TbApi, TbDatabaseCog } from "react-icons/tb";

import type { GitHubRepo } from "./types";
import { portfolioData } from "./data/portfolio";
import { getGitHubRepos } from "./data/github";
import { useScrollReveal } from "./hooks/useScrollReveal";

const NAV_LINKS = [
    { id: "home", label: "Home" },
    { id: "education", label: "Education" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "github", label: "GitHub" },
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
    HTML: SiHtml5,
    CSS: SiCss,
    "Node.js": SiNodedotjs,
    "Express.js": SiExpress,
    NestJS: SiNestjs,
    "WebSockets (Socket.io)": SiSocketdotio,
    "API Design": TbApi,
    "Backend Architecture": FaDiagramProject,
    React: SiReact,
    "Redux Toolkit": SiRedux,
    Bootstrap: SiBootstrap,
    NoSQL: TbDatabaseCog,
    MongoDB: SiMongodb,
    MySQL: SiMysql,
    Docker: SiDocker,
    "Docker Compose": SiDocker,
    Nginx: SiNginx,
    "SSL / HTTPS": FaLock,
    Linux: SiLinux,
    AWS: FaAws,
    Postman: SiPostman,
    Git: SiGit,
    GitHub: SiGithub,
    Vercel: SiVercel,
};

function getSkillIcon(skill: string): IconType {
    return SKILL_ICON_MAP[skill] ?? FaRegCircleDot;
}

function formatRepoDate(updatedAt: string): string {
    const date = new Date(updatedAt);

    if (Number.isNaN(date.getTime())) {
        return "Updated just now";
    }

    const diffMs = Date.now() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 60) {
        return `Updated ${Math.max(diffMinutes, 1)}m ago`;
    }

    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours < 24) {
        return `Updated ${diffHours}h ago`;
    }

    const diffDays = Math.floor(diffHours / 24);

    if (diffDays < 30) {
        return `Updated ${diffDays}d ago`;
    }

    const diffMonths = Math.floor(diffDays / 30);

    if (diffMonths < 12) {
        return `Updated ${diffMonths}mo ago`;
    }

    const diffYears = Math.floor(diffMonths / 12);

    return `Updated ${diffYears}y ago`;
}

function App() {
    useScrollReveal();
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [reposError, setReposError] = useState<string | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    // Theme toggle state logic
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    useEffect(() => {
        const savedTheme = localStorage.getItem("portfolio-theme") as
            | "dark"
            | "light"
            | null;
        if (savedTheme) {
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
    const showNavAvatar = activeSection !== "home";

    // Fetch GitHub repos with caching (6-hour refresh)
    useEffect(() => {
        let active = true;

        async function loadRepos() {
            try {
                const reposData = await getGitHubRepos();
                if (active) {
                    setRepos(reposData);
                }
            } catch {
                if (active) {
                    setReposError("Unable to load repositories at the moment.");
                }
            }
        }

        void loadRepos();

        return () => {
            active = false;
        };
    }, []);

    useEffect(() => {
        function handleScroll() {
            setShowScrollTop(window.scrollY > 420);
            setIsScrolled(window.scrollY > 20);
            
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                setScrollProgress((window.scrollY / totalScroll) * 100);
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const sectionIds = NAV_LINKS.map((link) => link.id);
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter((section): section is HTMLElement => section !== null)
            .sort((first, second) => first.offsetTop - second.offsetTop);

        if (sections.length === 0) {
            return;
        }

        function updateActiveSectionFromScroll() {
            const scrollMarker = window.scrollY + NAVBAR_SCROLL_OFFSET + 18;
            let nextActive = sections[0].id as NavSectionId;

            for (const section of sections) {
                const sectionTop =
                    section.getBoundingClientRect().top + window.scrollY;

                if (sectionTop <= scrollMarker) {
                    nextActive = section.id as NavSectionId;
                } else {
                    break;
                }
            }

            // Ensure the last section is active near the bottom of the page.
            const bottomEdge = window.scrollY + window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;

            if (bottomEdge >= pageHeight - 4) {
                nextActive = sections[sections.length - 1].id as NavSectionId;
            }

            setActiveSection(nextActive);
        }

        function syncFromHash() {
            const hashId = window.location.hash.replace("#", "");

            if (sectionIds.includes(hashId as NavSectionId)) {
                setActiveSection(hashId as NavSectionId);
            }
        }

        window.addEventListener("scroll", updateActiveSectionFromScroll, {
            passive: true,
        });
        window.addEventListener("resize", updateActiveSectionFromScroll);
        syncFromHash();
        updateActiveSectionFromScroll();
        window.addEventListener("hashchange", syncFromHash);

        return () => {
            window.removeEventListener("scroll", updateActiveSectionFromScroll);
            window.removeEventListener("resize", updateActiveSectionFromScroll);
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

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
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
            <nav className={`navbar ${isScrolled ? "is-scrolled" : ""}`}>
                <div 
                    className="scroll-progress-bar" 
                    style={{ width: `${scrollProgress}%` }} 
                />
                <div className="navbar-brand">
                    <div className="navbar-avatar-wrapper">
                        <img
                            src="/images/profile.jpg"
                            alt="Mahmoud profile"
                            className="navbar-avatar"
                        />
                    </div>
                    <span className="navbar-name">{portfolioData.name}</span>
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
                        {theme === "dark" ? <FaSun /> : <FaMoon />}
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
                            <div className="location-badge">
                                <FaLocationDot aria-hidden="true" />
                                {portfolioData.location}
                            </div>
                        </div>
                        <h1 className="hero-animate hero-delay-1">
                            {portfolioData.name}
                            <span>{portfolioData.role}</span>
                        </h1>
                        <p className="hero-intro hero-animate hero-delay-2">{portfolioData.intro}</p>
                        {portfolioData.heroBlurb && (
                            <p className="hero-blurb hero-animate hero-delay-2">{portfolioData.heroBlurb}</p>
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
                                className={`hero-profile-image ${showNavAvatar ? "is-hidden" : "is-visible"}`}
                            />
                        </section>
                    </div>
                </section>

                <section className="panel nav-section" id="education">
                    <p className="eyebrow">
                        <FaGraduationCap aria-hidden="true" />
                        Education
                    </p>
                    <h2>Academic Background</h2>
                    <div className="education-list">
                        {portfolioData.education.map((edu) => (
                            <div className="education-item reveal" key={edu.institution}>
                                <div className="education-header">
                                    <div>
                                        <h3>{edu.institution}</h3>
                                        <p className="education-degree">{edu.degree}</p>
                                    </div>
                                    <div className="education-meta">
                                        <span className="education-period">{edu.period}</span>
                                        <span className="education-location">{edu.location}</span>
                                    </div>
                                </div>
                                {edu.details && <p className="education-details">{edu.details}</p>}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="content-grid about-stack-layout">
                    <section className="panel nav-section" id="about">
                        <p className="eyebrow">
                            <FaUser aria-hidden="true" />
                            About
                        </p>
                        <h2>Who am I?</h2>
                        <div className="about-text">
                            {portfolioData.focusAreas.map((area) => (
                                <p className="about-paragraph reveal" key={area}>
                                    {area}
                                </p>
                            ))}
                        </div>
                        <a
                            href="https://drive.google.com/file/d/1QopGpVKlf9oUcYkB3zBz4I2efCM5HQmL/view?usp=drive_link"
                            className="about-cv-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaFileArrowDown aria-hidden="true" />
                            View Resume
                        </a>
                    </section>

                    <section className="panel nav-section" id="skills">
                        <p className="eyebrow">
                            <FaCode aria-hidden="true" />
                            Skills
                        </p>
                        <h2>Technical capabilities</h2>
                        <div className="skill-groups">
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

                                            return (
                                                <li key={item}>
                                                    <span
                                                        className="skill-icon"
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
                </section>

                <section className="panel nav-section" id="projects">
                    <p className="eyebrow">
                        <FaRocket aria-hidden="true" />
                        Selected Work
                    </p>
                    <h2>Featured projects and real outcomes</h2>
                    <div className="projects-grid">
                        {portfolioData.projects.map((project) => (
                            <article
                                className="project-card reveal"
                                key={project.title}
                            >
                                <h3>{project.title}</h3>
                                <p>{project.summary}</p>
                                <div className="tag-cloud compact">
                                    {project.stack.map((item) => (
                                        <span key={item}>{item}</span>
                                    ))}
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

                <section className="panel nav-section" id="github">
                    <p className="eyebrow">
                        <SiGithub aria-hidden="true" />
                        GitHub Repositories
                    </p>
                    <h2>Latest repositories from GitHub</h2>
                    {reposError ? (
                        <p>{reposError}</p>
                    ) : (
                        <div className="repos-grid">
                            {repos.map((repo) => (
                                <article className="repo-card reveal" key={repo.id}>
                                    <h3>{repo.name}</h3>
                                    <p>{repo.description}</p>
                                    <div className="repo-meta">
                                        <span className="repo-pill">
                                            <FaServer aria-hidden="true" />
                                            <span>
                                                {repo.language || "N/A"}
                                            </span>
                                        </span>
                                        <span className="repo-pill">
                                            <FaRegClock aria-hidden="true" />
                                            <span>
                                                {formatRepoDate(repo.updatedAt)}
                                            </span>
                                        </span>
                                    </div>
                                    <a
                                        href={repo.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="github-link"
                                    >
                                        <FaCodeBranch aria-hidden="true" />
                                        <span>Open repository</span>
                                        <FaArrowUpRightFromSquare aria-hidden="true" />
                                    </a>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <section
                    className="panel contact-strip nav-section"
                    id="contact"
                >
                    <p className="eyebrow">
                        <FaEnvelope aria-hidden="true" />
                        Connect
                    </p>
                    <h2>Let&apos;s connect</h2>
                    <div className="contact-grid">
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

                <footer className="site-footer">
                    <div className="terminal-signature">
                        <span className="prompt-symbol">&gt;</span>
                        <span className="command-text">
                            Built by Mahmoud Abdellah
                        </span>
                        <span className="comment-text">/* &copy; 2026 */</span>
                        <span className="cursor-blink">_</span>
                    </div>
                </footer>

                <button
                    type="button"
                    className={`scroll-top-btn ${showScrollTop ? "is-visible" : ""}`}
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                >
                    <FaArrowUp aria-hidden="true" />
                </button>
            </main>
        </>
    );
}

export default App;
