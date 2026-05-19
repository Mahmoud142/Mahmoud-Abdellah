import { FaCircleCheck, FaCodeBranch, FaArrowUpRightFromSquare } from "react-icons/fa6";
import type { IconType } from "react-icons";

interface Project {
    title: string;
    summary: string;
    stack: string[];
    outcome: string;
    github?: string;
    live?: string;
}

interface ProjectCardProps {
    project: Project;
    getSkillIcon: (skill: string) => IconType;
    getSkillColor: (skill: string) => string;
}

export function ProjectCard({ project, getSkillIcon, getSkillColor }: ProjectCardProps) {
    return (
        <article className="project-card reveal">
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className="tag-cloud compact">
                {project.stack.map((item) => {
                    const SkillIcon = getSkillIcon(item);
                    return (
                        <span key={item}>
                            <SkillIcon
                                className="tag-icon"
                                style={{ color: getSkillColor(item) }}
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
    );
}
