import { FaEnvelope, FaLocationDot, FaFilePdf } from "react-icons/fa6";
import { portfolioData } from "../../constants/data";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import { getContactClass, getContactIcon } from "../Hero/Hero";
import "./Contact.css";

interface ContactProps {
    onResumeClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function Contact({ onResumeClick }: ContactProps) {
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
                        <span className="location-ping-container">
                            <span className="location-ping-ring"></span>
                            <FaLocationDot aria-hidden="true" className="location-live-icon" />
                        </span>
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

                {/* Mobile-Only Resume Button */}
                <div className="mobile-resume-container reveal">
                    <a
                        href="https://drive.google.com/file/d/1tg17b8bzl_S9asNIjiGg1Ru9E6c2Fuxe/view?usp=drive_link"
                        className="mobile-connect-resume-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onResumeClick}
                    >
                        <span>View Resume</span>
                        <FaFilePdf aria-hidden="true" />
                    </a>
                </div>
            </section>
        </div>
    );
}
