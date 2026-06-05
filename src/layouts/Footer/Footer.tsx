import { portfolioData } from "../../constants/data";
import { getContactClass, getContactIcon } from "../../components/Hero/Hero";
import { FaCircleCheck, FaChevronUp } from "react-icons/fa6";
import "./Footer.css";

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Left: Brand column */}
                    <div className="footer-brand-col">
                        <div className="footer-logo">
                            <span className="logo-symbol">&lt;/&gt;</span>
                            <span className="logo-text">{portfolioData.name}</span>
                        </div>
                        <p className="footer-bio">
                            Designing and engineering high-performance APIs, robust backend architectures, and clean user interfaces.
                        </p>
                        <div className="footer-socials">
                            {portfolioData.contactLinks.map((link) => (
                                <a
                                    href={link.href}
                                    key={link.label}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`footer-social-link ${getContactClass(link.label)}`}
                                    aria-label={link.label}
                                >
                                    {getContactIcon(link.label)}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Middle: Navigation Links */}
                    <div className="footer-nav-col">
                        <h4 className="footer-col-title">Navigation</h4>
                        <ul className="footer-nav-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#skills">Skills</a></li>
                            <li><a href="#projects">Projects</a></li>
                            <li><a href="#languages">Languages</a></li>
                            <li><a href="#contact">Connect</a></li>
                        </ul>
                    </div>

                    {/* Right: Technical Stats / Monitor */}
                    <div className="footer-stats-col">
                        <h4 className="footer-col-title">System Status</h4>
                        <div className="footer-terminal-console">
                            <div className="terminal-header">
                                <span className="term-dot term-dot-red"></span>
                                <span className="term-dot term-dot-yellow"></span>
                                <span className="term-dot term-dot-green"></span>
                                <span className="term-title">sys_monitor.sh</span>
                            </div>
                            <div className="terminal-body">
                                <div className="term-row">
                                    <span className="term-label">Environment:</span>
                                    <span className="term-val val-green">Production</span>
                                </div>
                                <div className="term-row">
                                    <span className="term-label">SSL:</span>
                                    <span className="term-val val-blue">Active (A+)</span>
                                </div>
                                 <div className="term-row">
                                    <span className="term-label">Deployment:</span>
                                    <span className="term-val val-blue">Vercel Edge</span>
                                </div>
                                <div className="term-row">
                                    <span className="term-label">Build Status:</span>
                                    <span className="term-val val-green">
                                        <FaCircleCheck className="icon-spin-slow" /> passing
                                    </span>
                                </div>
                                <div className="term-row">
                                    <span className="term-label">Stack:</span>
                                    <span className="term-val val-dim">TypeScript / React / Node</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <div className="terminal-signature">
                        <span className="prompt-symbol">&gt;</span>
                        <span className="command-text">
                            npx <span className="modern-name">{portfolioData.name.toLowerCase().replace(/\s+/g, "-")}</span>
                        </span>
                        <span className="comment-text">/* &copy; {new Date().getFullYear()} All Rights Reserved */</span>
                        <span className="cursor-blink">_</span>
                    </div>
                    
                    <button className="footer-scroll-top" onClick={scrollToTop} aria-label="Scroll to top">
                        <FaChevronUp />
                    </button>
                </div>
            </div>
        </footer>
    );
}
