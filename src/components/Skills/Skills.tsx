import { FaCode } from "react-icons/fa6";
import { portfolioData } from "../../constants/data";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import type { IconType } from "react-icons";
// Assuming getSkillIcon, getSkillColor will be extracted to a utility or kept here.
// For now, let's keep them here, or I can import them from a util. I'll define them here so it compiles if they aren't moved.
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
import {
    FaDatabase,
    FaDiagramProject,
    FaNetworkWired,
    FaRocket,
    FaCode as FaCodeIcon,
    FaCircleCheck,
    FaRegCircleDot,
    FaAws,
} from "react-icons/fa6";
import "./Skills.css";

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
    "Clean Code & SOLID": FaCodeIcon,
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
    "JavaScript (ES6+)": "var(--skill-js)",
    TypeScript: "var(--skill-ts)",
    Python: "var(--skill-python)",
    "C++": "var(--skill-cpp)",
    SQL: "var(--skill-sql)",
    HTML5: "var(--skill-html)",
    CSS3: "var(--skill-css)",
    "Node.js": "var(--skill-node)",
    "Express.js": "var(--skill-express)",
    NestJS: "var(--skill-nestjs)",
    "RESTful API Design": "var(--skill-api)",
    Microservices: "var(--skill-microservices)",
    "Real-time Systems (Socket.io)": "var(--skill-socket)",
    "Redis Caching": "var(--skill-redis)",
    "System Architecture": "var(--skill-arch)",
    "React.js": "var(--skill-react)",
    React: "var(--skill-react)",
    "Redux Toolkit": "var(--skill-redux)",
    "Responsive Web Design": "var(--skill-bootstrap)",
    "State Management": "var(--skill-redux)",
    Bootstrap: "var(--skill-bootstrap)",
    PostgreSQL: "var(--skill-postgres)",
    MySQL: "var(--skill-mysql)",
    MongoDB: "var(--skill-mongodb)",
    Redis: "var(--skill-redis)",
    "Database Design & Optimization": "var(--skill-mysql)",
    "Docker & Docker Compose": "var(--skill-docker)",
    AWS: "var(--skill-aws)",
    "CI/CD Pipelines": "var(--skill-cicd)",
    Nginx: "var(--skill-nginx)",
    Linux: "var(--skill-linux)",
    "System Design": "var(--skill-design)",
    "Agile / Scrum": "var(--skill-agile)",
    "Clean Code & SOLID": "var(--skill-solid)",
    "Design Patterns": "var(--skill-patterns)",
    "TDD / BDD": "var(--skill-tdd)",
    Git: "var(--skill-git)",
    GitHub: "var(--skill-github)",
    GitLab: "var(--skill-gitlab)",
    Jira: "var(--skill-jira)",
    Postman: "var(--skill-postman)",
    Vercel: "var(--skill-vercel)",
};

export function getSkillIcon(skill: string): IconType {
    return SKILL_ICON_MAP[skill] ?? FaRegCircleDot;
}
export function getSkillColor(skill: string): string {
    return SKILL_COLOR_MAP[skill] ?? "var(--color-accent)";
}

export function Skills() {
    return (
        <div id="skills" className="nav-section">
            <SectionHeading title="Skills" icon={<FaCode />} />
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
                                    const SkillIcon = getSkillIcon(item);
                                    const iconColor = getSkillColor(item);
                                    return (
                                        <li
                                            key={item}
                                            style={
                                                {
                                                    "--skill-color": iconColor,
                                                } as React.CSSProperties
                                            }
                                        >
                                            <span
                                                className="skill-icon"
                                                style={{ color: iconColor }}
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
    );
}
