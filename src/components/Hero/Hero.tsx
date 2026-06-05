import { portfolioData } from "../../constants/data";
import {
    FaArrowUpRightFromSquare,
    FaArrowDown,
    FaEnvelope,
    FaGithub,
    FaLinkedin,
    FaFacebook,
    FaInstagram,
    FaWhatsapp,
    FaTelegram,
    FaRegCircleDot,
} from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { RotatingText } from "../RotatingText/RotatingText";
import profileImg from "../../assets/images/Profile2.webp";
import "./Hero.css";

export function getContactColor(label: string) {
    const key = label.toLowerCase();
    if (key.includes("mail") || key.includes("email"))
        return "var(--brand-email)";
    if (key.includes("github")) return "var(--brand-github)";
    if (key.includes("linkedin")) return "var(--brand-linkedin)";
    if (key.includes("facebook")) return "var(--brand-facebook)";
    if (key.includes("instagram")) return "var(--brand-instagram)";
    if (key.includes("whatsapp")) return "var(--brand-whatsapp)";
    if (key.includes("telegram")) return "#24A1DE";
    if (key.includes("twitter") || key.includes("x"))
        return "var(--brand-twitter)";
    return "var(--color-accent)";
}

export function getContactIcon(label: string) {
    const key = label.toLowerCase();
    if (key.includes("mail") || key.includes("email"))
        return <FaEnvelope aria-hidden="true" />;
    if (key.includes("github")) return <FaGithub aria-hidden="true" />;
    if (key.includes("linkedin")) return <FaLinkedin aria-hidden="true" />;
    if (key.includes("facebook")) return <FaFacebook aria-hidden="true" />;
    if (key.includes("instagram")) return <FaInstagram aria-hidden="true" />;
    if (key.includes("whatsapp")) return <FaWhatsapp aria-hidden="true" />;
    if (key.includes("telegram")) return <FaTelegram aria-hidden="true" />;
    if (key.includes("twitter") || key.includes("x"))
        return <FaXTwitter aria-hidden="true" />;
    return <FaRegCircleDot aria-hidden="true" />;
}

export function getContactClass(label: string) {
    const key = label.toLowerCase();
    if (key.includes("mail") || key.includes("email")) return "contact-email";
    if (key.includes("github")) return "contact-github";
    if (key.includes("linkedin")) return "contact-linkedin";
    if (key.includes("facebook")) return "contact-facebook";
    if (key.includes("instagram")) return "contact-instagram";
    if (key.includes("whatsapp")) return "contact-whatsapp";
    if (key.includes("telegram")) return "contact-telegram";
    if (key.includes("twitter") || key.includes("x")) return "contact-x";
    return "contact-generic";
}

const ROTATING_PHRASES = [
    "Clean Architecture Enthusiast",
    "Full-Stack Builder",
    "API Architecture Enthusiast",
    "Open Source Contributor",
    "Passionate Developer",
];

export function Hero() {
    return (
        <section className="hero panel nav-section" id="home">
            <div className="hero-copy">
                <h1 className="hero-animate hero-delay-1">
                    {portfolioData.name}
                    <span className="hero-role-text">{portfolioData.role}</span>
                </h1>
                <div className="hero-rotating-wrapper hero-animate hero-delay-1">
                    <RotatingText phrases={ROTATING_PHRASES} interval={2800} />
                </div>
                <p className="hero-intro hero-animate hero-delay-2">
                    {portfolioData.intro}
                </p>
                {portfolioData.heroBlurb && (
                    <p className="hero-blurb hero-animate hero-delay-2">
                        {portfolioData.heroBlurb}
                    </p>
                )}

                <div className="hero-social-icons hero-animate hero-delay-3">
                    {portfolioData.contactLinks.map((link) => (
                        <a
                            href={link.href}
                            key={link.label}
                            target="_blank"
                            rel="noreferrer"
                            className="hero-social-icon"
                            aria-label={link.label}
                            title={link.label}
                            style={{ color: getContactColor(link.label) }}
                        >
                            {getContactIcon(link.label)}
                        </a>
                    ))}
                </div>
            </div>

            <div className="hero-side">
                <div className="hero-image-wrapper hero-animate hero-delay-2">
                    <div className="hero-moving-frame"></div>
                    <img
                        src={profileImg}
                        alt="Mahmoud Abdellah - Full-Stack Software Engineer &amp; Backend Developer"
                        className="hero-profile-image"
                        fetchPriority="high"
                        decoding="async"
                    />
                </div>
            </div>

            <div className="hero-explore-container hero-animate hero-delay-4">
                <button
                    className="hero-explore-btn"
                    onClick={() =>
                        document
                            .getElementById("education")
                            ?.scrollIntoView({ behavior: "smooth" })
                    }
                >
                    Explore My Work
                    <FaArrowDown />
                </button>
            </div>
        </section>
    );
}
