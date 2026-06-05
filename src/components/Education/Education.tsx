import { useState } from "react";
import { FaGraduationCap, FaGithub } from "react-icons/fa6";
import { portfolioData } from "../../constants/data";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import "./Education.css";

export function Education() {
    const [showDetails, setShowDetails] = useState(false);
    const [showCapabilities, setShowCapabilities] = useState(false);

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

                            {/* Expandable Details Button */}
                            <div className="education-expand-wrapper">
                                <button 
                                    className={`education-expand-btn ${showDetails ? 'is-active' : ''}`}
                                    onClick={() => setShowDetails(!showDetails)}
                                    aria-expanded={showDetails}
                                >
                                    <span>{showDetails ? "Hide Details" : "Academic Focus & Project"}</span>
                                    <span className="expand-btn-icon" aria-hidden="true"></span>
                                </button>
                            </div>

                            {/* Expandable Content Card */}
                            <div className={`education-expanded-content ${showDetails ? 'is-open' : ''}`}>
                                <div className="expanded-inner">
                                    <div className="curriculum-segment">
                                        <h4>Core Curriculum</h4>
                                        <div className="curriculum-tags">
                                            <span>Data Structures &amp; Algorithms</span>
                                            <span>Operating Systems</span>
                                            <span>Database Systems</span>
                                            <span>Software Engineering</span>
                                            <span>Systems &amp; Networks</span>
                                        </div>
                                    </div>
                                    <div className="project-segment">
                                        <h4>Graduation Project</h4>
                                        <div className="grad-project-card">
                                            <div className="project-header">
                                                <h5>MindMate Healthcare Platform</h5>
                                                <span className="project-badge">Graduation Project</span>
                                            </div>
                                            <div className="project-section">
                                                <h6>What is MindMate?</h6>
                                                <p className="project-summary">
                                                    MindMate is a full-stack platform designed to support Alzheimer's patients and their care networks. It combines a cross-platform Flutter mobile application, real-time location tracking, intelligent reminders, memory preservation, face recognition, and IoT integration — enabling caregivers and families to provide better, more responsive care.
                                                </p>
                                            </div>

                                            {/* Nested Capabilities Toggle Button */}
                                            <div className="capabilities-toggle-wrapper">
                                                <button 
                                                    className={`capabilities-toggle-btn ${showCapabilities ? 'is-active' : ''}`}
                                                    onClick={() => setShowCapabilities(!showCapabilities)}
                                                    aria-expanded={showCapabilities}
                                                >
                                                    <span>{showCapabilities ? "Hide Core Capabilities" : "View Core Capabilities"}</span>
                                                    <span className="expand-btn-icon" aria-hidden="true"></span>
                                                </button>
                                            </div>

                                            {/* Expandable Capabilities Grid */}
                                            <div className={`capabilities-expand-wrapper ${showCapabilities ? 'is-open' : ''}`}>
                                                <div className="capabilities-inner">
                                                    <div className="capabilities-grid">
                                                        <div className="capability-card">
                                                            <span className="capability-icon">🧩</span>
                                                            <div className="capability-info">
                                                                <strong>Face Recognition</strong>
                                                                <p>AI patient identification using InsightFace.</p>
                                                            </div>
                                                        </div>
                                                        <div className="capability-card">
                                                            <span className="capability-icon">📍</span>
                                                            <div className="capability-info">
                                                                <strong>Real-Time Location</strong>
                                                                <p>Live GPS telemetry via Socket.io and MQTT.</p>
                                                            </div>
                                                        </div>
                                                        <div className="capability-card">
                                                            <span className="capability-icon">💾</span>
                                                            <div className="capability-info">
                                                                <strong>Memory Preservation</strong>
                                                                <p>Media archive with metadata tags.</p>
                                                            </div>
                                                        </div>
                                                        <div className="capability-card">
                                                            <span className="capability-icon">⏰</span>
                                                            <div className="capability-info">
                                                                <strong>Smart Reminders</strong>
                                                                <p>Medication &amp; appointment schedules.</p>
                                                            </div>
                                                        </div>
                                                        <div className="capability-card">
                                                            <span className="capability-icon">🚨</span>
                                                            <div className="capability-info">
                                                                <strong>Alert System</strong>
                                                                <p>Instant safety notification protocols.</p>
                                                            </div>
                                                        </div>
                                                        <div className="capability-card">
                                                            <span className="capability-icon">🔐</span>
                                                            <div className="capability-info">
                                                                <strong>Role-Based Access</strong>
                                                                <p>Secure caregiver &amp; patient systems.</p>
                                                            </div>
                                                        </div>
                                                        <div className="capability-card">
                                                            <span className="capability-icon">📱</span>
                                                            <div className="capability-info">
                                                                <strong>Push Notifications</strong>
                                                                <p>Firebase FCM live alerts.</p>
                                                            </div>
                                                        </div>
                                                        <div className="capability-card">
                                                            <span className="capability-icon">📱</span>
                                                            <div className="capability-info">
                                                                <strong>Mobile Application</strong>
                                                                <p>Cross-platform Flutter mobile client.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="project-links">
                                                <a 
                                                    href="https://github.com/MindMate-Project" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="project-repo-link"
                                                >
                                                    <FaGithub /> View Repository
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
