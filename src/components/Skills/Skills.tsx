import { FaCode } from "react-icons/fa6";
import { portfolioData } from "../../constants/data";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import type { IconType } from "react-icons";
// Assuming getSkillIcon, getSkillColor will be extracted to a utility or kept here.
// For now, let's keep them here, or I can import them from a util. I'll define them here so it compiles if they aren't moved.
import {
    SiBootstrap, SiCplusplus, SiCss, SiDocker, SiExpress, SiGit, SiGithub, SiHtml5,
    SiJavascript, SiLinux, SiMongodb, SiMysql, SiNestjs, SiNginx, SiNodedotjs,
    SiPostman, SiPython, SiReact, SiRedux, SiSocketdotio, SiTypescript, SiVercel,
    SiGitlab, SiRedis, SiGithubactions, SiJira, SiPostgresql
} from "react-icons/si";
import { TbApi, TbDatabaseCog } from "react-icons/tb";
import { FaDatabase, FaDiagramProject, FaNetworkWired, FaRocket, FaCode as FaCodeIcon, FaCircleCheck, FaRegCircleDot, FaAws } from "react-icons/fa6";
import "./Skills.css";

const SKILL_ICON_MAP: Record<string, IconType> = {
    "JavaScript (ES6+)": SiJavascript, TypeScript: SiTypescript, Python: SiPython,
    "C++": SiCplusplus, SQL: FaDatabase, HTML5: SiHtml5, CSS3: SiCss,
    "Node.js": SiNodedotjs, "Express.js": SiExpress, NestJS: SiNestjs,
    "RESTful API Design": TbApi, Microservices: FaNetworkWired,
    "Real-time Systems (Socket.io)": SiSocketdotio, "Redis Caching": SiRedis,
    "System Architecture": FaDiagramProject, "React.js": SiReact, React: SiReact,
    "Redux Toolkit": SiRedux, "Responsive Web Design": SiBootstrap,
    "State Management": SiRedux, Bootstrap: SiBootstrap,
    "Database Design & Optimization": TbDatabaseCog, "Docker & Docker Compose": SiDocker,
    Nginx: SiNginx, AWS: FaAws, "CI/CD Pipelines": SiGithubactions, Linux: SiLinux,
    "System Design": FaDiagramProject, "Agile / Scrum": SiJira, "Clean Code & SOLID": FaCodeIcon,
    "Design Patterns": FaRocket, "TDD / BDD": FaCircleCheck, Git: SiGit, GitHub: SiGithub,
    GitLab: SiGitlab, Jira: SiJira, Postman: SiPostman, Vercel: SiVercel, PostgreSQL: SiPostgresql,
    MySQL: SiMysql, MongoDB: SiMongodb, Redis: SiRedis,
};

const SKILL_COLOR_MAP: Record<string, string> = {
    "JavaScript (ES6+)": "#F7DF1E", TypeScript: "#3178C6", Python: "#3776AB",
    "C++": "#00599C", SQL: "#4479A1", HTML5: "#E34F26", CSS3: "#1572B6",
    "Node.js": "#339933", "Express.js": "#ffffff", NestJS: "#E0234E",
    "RESTful API Design": "#00f5ff", Microservices: "#FF9900",
    "Real-time Systems (Socket.io)": "#ffffff", "Redis Caching": "#DC382D",
    "System Architecture": "#00f5ff", "React.js": "#61DAFB", React: "#61DAFB",
    "Redux Toolkit": "#764ABC", "Responsive Web Design": "#7952B3",
    "State Management": "#764ABC", Bootstrap: "#7952B3", PostgreSQL: "#4169E1",
    MySQL: "#4479A1", MongoDB: "#47A248", Redis: "#DC382D",
    "Database Design & Optimization": "#4479A1", "Docker & Docker Compose": "#2496ED",
    AWS: "#FF9900", "CI/CD Pipelines": "#2088FF", Nginx: "#009639", Linux: "#FCC624",
    "System Design": "#00f5ff", "Agile / Scrum": "#0052CC", "Clean Code & SOLID": "#00f5ff",
    "Design Patterns": "#FF9900", "TDD / BDD": "#47A248", Git: "#F05032", GitHub: "#ffffff",
    GitLab: "#FC6D26", Jira: "#0052CC", Postman: "#FF6C37", Vercel: "#ffffff",
};

export function getSkillIcon(skill: string): IconType { return SKILL_ICON_MAP[skill] ?? FaRegCircleDot; }
export function getSkillColor(skill: string): string { return SKILL_COLOR_MAP[skill] ?? "var(--color-accent)"; }

export function Skills() {
    return (
        <div id="skills" className="nav-section">
            <SectionHeading title="Skills" icon={<FaCode />} />
            <section className="panel">
                <div className="skill-groups stagger-container">
                    {portfolioData.skillGroups.map((group) => (
                        <article className="skill-group reveal" key={group.title}>
                            <h3>{group.title}</h3>
                            <ul>
                                {group.items.map((item) => {
                                    const SkillIcon = getSkillIcon(item);
                                    const iconColor = getSkillColor(item);
                                    return (
                                        <li key={item}>
                                            <span className="skill-icon" style={{ color: iconColor }} aria-hidden="true">
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
