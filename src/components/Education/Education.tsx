import { FaGraduationCap } from "react-icons/fa6";
import { portfolioData } from "../../constants/data";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import "./Education.css";

export function Education() {
    return (
        <div id="education" className="nav-section">
            <SectionHeading title="Education" icon={<FaGraduationCap />} iconColor="var(--heading-education)" />
            <section className="panel">
                <h2 className="align-center">Academic Background</h2>
                <div className="education-list stagger-container">
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
        </div>
    );
}
