import { MouseEvent } from "react";
import {
    FaMoon,
    FaBars,
    FaXmark,
    FaArrowUpRightFromSquare,
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
}: NavbarProps) {
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
                <div className="navbar-links">
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
                        href="https://drive.google.com/file/d/1luMA6Bizkg707XrhVHRVbLF81qD3WBux/view?usp=sharing"
                        className="navbar-resume-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>Resume</span>
                        <FaArrowUpRightFromSquare aria-hidden="true" />
                    </a>
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                        title="Toggle Theme"
                    >
                        <FaMoon />
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
                        href="https://drive.google.com/file/d/1luMA6Bizkg707XrhVHRVbLF81qD3WBux/view?usp=sharing"
                        className="mobile-resume-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span>Resume</span>
                        <FaArrowUpRightFromSquare aria-hidden="true" />
                    </a>
                </div>
            </nav>
        </>
    );
}
