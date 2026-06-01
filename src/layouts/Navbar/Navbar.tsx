import { MouseEvent, useEffect, useRef, useState } from "react";
import {
    FaMoon,
    FaSun,
    FaBars,
    FaXmark,
    FaFilePdf,
} from "react-icons/fa6";
import "./Navbar.css";

interface NavLink {
    id: string;
    label: string;
}

interface NavbarProps {
    navLinks: readonly NavLink[];
    scrollProgress: number;
    activeSection: string;
    theme: "light" | "dark";
    toggleTheme: () => void;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    handleNavClick: (e: MouseEvent<HTMLAnchorElement>, id: string) => void;
    onResumeClick: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export function Navbar({
    navLinks,
    scrollProgress,
    activeSection,
    theme,
    toggleTheme,
    mobileMenuOpen,
    setMobileMenuOpen,
    handleNavClick,
    onResumeClick,
}: NavbarProps) {
    const [indicatorStyle, setIndicatorStyle] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });
    const navLinksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!navLinksRef.current) return;

        // Find the active link
        const activeLink = navLinksRef.current.querySelector(
            "a.is-active",
        ) as HTMLAnchorElement;

        if (activeLink) {
            setIndicatorStyle({
                left: activeLink.offsetLeft,
                width: activeLink.offsetWidth,
                opacity: 1,
            });
        }
    }, [activeSection, navLinks]);

    return (
        <>
            <nav className="navbar">
                <div
                    className="scroll-progress-bar"
                    style={{ width: `${scrollProgress}%` }}
                />
                <div className="navbar-brand">
                    <span className="navbar-name">MA</span>
                </div>
                <div className="navbar-links" ref={navLinksRef}>
                    <div
                        className="nav-indicator"
                        style={{
                            left: indicatorStyle.left,
                            width: indicatorStyle.width,
                            opacity: indicatorStyle.opacity,
                        }}
                        aria-hidden="true"
                    />
                    {navLinks.map((link) => (
                        <a
                            href={`#${link.id}`}
                            key={link.id}
                            onClick={(e) => handleNavClick(e, link.id)}
                            className={
                                activeSection === link.id ? "is-active" : ""
                            }
                            aria-current={
                                activeSection === link.id ? "page" : undefined
                            }
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="navbar-actions">
                    <a
                        href="https://drive.google.com/file/d/1tg17b8bzl_S9asNIjiGg1Ru9E6c2Fuxe/view?usp=drive_link"
                        className="navbar-resume-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onResumeClick}
                    >
                        <span>Resume</span>
                        <FaFilePdf aria-hidden="true" />
                    </a>
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                        title="Toggle Theme"
                    >
                        {theme === "dark" ? <FaMoon /> : <FaSun />}
                    </button>
                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <FaXmark /> : <FaBars />}
                    </button>
                </div>
            </nav>
            <div
                className={`mobile-drawer-backdrop ${mobileMenuOpen ? "is-open" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
                aria-hidden="true"
            />
            <nav
                className={`mobile-drawer ${mobileMenuOpen ? "is-open" : ""}`}
                aria-label="Mobile navigation"
            >
                <div className="mobile-drawer-links">
                    {navLinks.map((link) => (
                        <a
                            href={`#${link.id}`}
                            key={link.id}
                            onClick={(e) => handleNavClick(e, link.id)}
                            className={
                                activeSection === link.id ? "is-active" : ""
                            }
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="https://drive.google.com/file/d/1tg17b8bzl_S9asNIjiGg1Ru9E6c2Fuxe/view?usp=drive_link"
                        className="mobile-resume-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                            setMobileMenuOpen(false);
                            onResumeClick(e);
                        }}
                    >
                        <span>Resume</span>
                        <FaFilePdf aria-hidden="true" />
                    </a>
                </div>
            </nav>
        </>
    );
}
