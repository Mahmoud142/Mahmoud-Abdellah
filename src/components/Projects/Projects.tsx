import { FaRocket } from "react-icons/fa6";
import { portfolioData } from "../../constants/data";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { getSkillIcon, getSkillColor } from "../Skills/Skills";
import "./Projects.css";

export function Projects() {
    return (
        <div id="projects" className="nav-section">
            <SectionHeading title="Projects" icon={<FaRocket />} iconColor="var(--heading-projects)" />
            <section className="panel">
                <div className="projects-grid stagger-container">
                    {portfolioData.projects.map((project, i) => (
                        <ProjectCard
                            key={project.title}
                            project={project as any}
                            index={i + 1}
                            getSkillIcon={getSkillIcon}
                            getSkillColor={getSkillColor}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
