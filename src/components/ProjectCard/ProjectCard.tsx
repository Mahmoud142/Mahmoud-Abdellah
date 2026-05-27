import { useState, useRef, MouseEvent, useCallback } from "react";
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
    index: number;
    getSkillIcon: (skill: string) => IconType;
    getSkillColor: (skill: string) => string;
}

export function ProjectCard({ project, index, getSkillIcon, getSkillColor }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
        if (!cardRef.current) return;
        
        const rect = cardRef.current.getBoundingClientRect();
        
        // Calculate mouse position relative to card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation (max 10 degrees)
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        // Calculate glare position
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;

        setIsHovered(true);
        setTiltStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
            "--glare-x": `${glareX}%`,
            "--glare-y": `${glareY}%`,
        } as React.CSSProperties);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        setTiltStyle({
            transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
            "--glare-x": "50%",
            "--glare-y": "50%",
        } as React.CSSProperties);
    }, []);

    return (
        <article 
            className="project-card reveal"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={tiltStyle}
        >
            <div className={`project-card-glare ${isHovered ? 'active' : ''}`} aria-hidden="true" />
            
            {/* Project number */}
            <span className="project-index">{String(index).padStart(2, '0')}</span>

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
