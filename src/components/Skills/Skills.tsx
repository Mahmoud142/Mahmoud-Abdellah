import { FaCode } from "react-icons/fa6";
import { portfolioData } from "../../constants/data";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import type { IconType } from "react-icons";
// Assuming getSkillIcon, getSkillColor will be extracted to a utility or kept here.
// For now, let's keep them here, or I can import them from a util. I'll define them here so it compiles if they aren't moved.
import {
    SiBootstrap,
    SiC,
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
    SiSwagger,
} from "react-icons/si";
import { TbApi, TbDatabaseCog, TbDevices, TbTools, TbBinaryTree, TbHierarchy } from "react-icons/tb";
import {
    FaDatabase,
    FaDiagramProject,
    FaNetworkWired,
    FaRocket,
    FaCode as FaCodeIcon,
    FaCircleCheck,
    FaRegCircleDot,
    FaAws,
    FaCubes,
    FaJava,
    FaTerminal,
    FaServer,
    FaLaptopCode,
    FaCloud,
    FaBrain,
} from "react-icons/fa6";
import "./Skills.css";

const SKILL_ICON_MAP: Record<string, IconType> = {
    "JavaScript (ES6+)": SiJavascript,
    TypeScript: SiTypescript,
    "Data Structures & Algorithms (DSA)": TbBinaryTree,
    "Object-Oriented Programming (OOP)": TbHierarchy,
    Python: SiPython,
    Java: FaJava,
    C: SiC,
    "C++": SiCplusplus,
    SQL: FaDatabase,
    HTML5: SiHtml5,
    CSS3: SiCss,
    "Node.js": SiNodedotjs,
    "Express.js": SiExpress,
    NestJS: SiNestjs,
    "RESTful API Design": TbApi,
    "Swagger (OpenAPI)": SiSwagger,
    Microservices: FaNetworkWired,
    "Real-time Systems (Socket.io)": SiSocketdotio,
    "Redis Caching": SiRedis,
    "System Architecture": FaDiagramProject,
    "React.js": SiReact,
    React: SiReact,
    "Redux Toolkit": SiRedux,
    "Responsive Web Design": TbDevices,
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
    "Design Patterns": FaCubes,
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
    "Data Structures & Algorithms (DSA)": "var(--skill-dsa)",
    "Object-Oriented Programming (OOP)": "var(--skill-oop)",
    Python: "var(--skill-python)",
    Java: "var(--skill-java)",
    C: "var(--skill-c)",
    "C++": "var(--skill-cpp)",
    SQL: "var(--skill-sql)",
    HTML5: "var(--skill-html)",
    CSS3: "var(--skill-css)",
    "Node.js": "var(--skill-node)",
    "Express.js": "var(--skill-express)",
    NestJS: "var(--skill-nestjs)",
    "RESTful API Design": "var(--skill-api)",
    "Swagger (OpenAPI)": "var(--skill-swagger)",
    Microservices: "var(--skill-microservices)",
    "Real-time Systems (Socket.io)": "var(--skill-socket)",
    "Redis Caching": "var(--skill-redis)",
    "System Architecture": "var(--skill-arch)",
    "React.js": "var(--skill-react)",
    React: "var(--skill-react)",
    "Redux Toolkit": "var(--skill-redux)",
    "Responsive Web Design": "var(--skill-design)",
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

const CATEGORY_ICON_MAP: Record<string, IconType> = {
    "Core Languages": FaTerminal,
    "Core CS & Engineering": FaBrain,
    "Backend Engineering": FaServer,
    "Databases & Storage": FaDatabase,
    "DevOps & Cloud": FaCloud,
    "Software Methodologies": FaDiagramProject,
    "Frontend Development": FaLaptopCode,
    "Development Tools": TbTools,
};

const CATEGORY_COLOR_MAP: Record<string, string> = {
    "Core Languages": "var(--cat-languages)",
    "Core CS & Engineering": "var(--cat-concepts)",
    "Backend Engineering": "var(--cat-backend)",
    "Databases & Storage": "var(--cat-database)",
    "DevOps & Cloud": "var(--cat-devops)",
    "Software Methodologies": "var(--cat-methodologies)",
    "Frontend Development": "var(--cat-frontend)",
    "Development Tools": "var(--cat-tools)",
};

export function getCategoryIcon(title: string): IconType {
    return CATEGORY_ICON_MAP[title] ?? FaCodeIcon;
}

export function getCategoryColor(title: string): string {
    return CATEGORY_COLOR_MAP[title] ?? "var(--color-accent)";
}

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
                    {portfolioData.skillGroups.map((group) => {
                        const CategoryIcon = getCategoryIcon(group.title);
                        const categoryColor = getCategoryColor(group.title);
                        return (
                            <article
                                className="skill-group reveal"
                                key={group.title}
                                style={{ "--group-color": categoryColor } as React.CSSProperties}
                            >
                                <h3>
                                    <CategoryIcon className="category-icon" aria-hidden="true" />
                                    {group.title}
                                </h3>
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
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
