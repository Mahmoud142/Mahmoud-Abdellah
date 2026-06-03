import { FaUser } from "react-icons/fa6";
import { portfolioData } from "../../constants/data";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import "./About.css";

export function About() {
    return (
        <div id="about" className="nav-section">
            <SectionHeading title="About Me" icon={<FaUser />} iconColor="var(--heading-about)" />
            <section className="panel">
                <h2 className="align-left">Who am I?</h2>
                <div className="about-text stagger-container">
                    {portfolioData.focusAreas.map((area) => (
                        <p className="about-paragraph reveal" key={area}>
                            {area}
                        </p>
                    ))}
                </div>
            </section>
        </div>
    );
}
