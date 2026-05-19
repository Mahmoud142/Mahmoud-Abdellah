import { FaEnvelope, FaLocationDot } from "react-icons/fa6";
import { portfolioData } from "../../constants/data";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import { getContactClass, getContactIcon } from "../Hero/Hero";
import "./Contact.css";

export function Contact() {
    return (
        <div id="contact" className="nav-section">
            <SectionHeading title="Let's Connect" icon={<FaEnvelope />} />
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
    );
}
