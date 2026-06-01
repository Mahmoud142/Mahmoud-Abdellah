import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

import { Navbar } from "../layouts/Navbar/Navbar";
import { Footer } from "../layouts/Footer/Footer";
import { Hero } from "../components/Hero/Hero";
import { Education } from "../components/Education/Education";
import { About } from "../components/About/About";
import { Skills } from "../components/Skills/Skills";
import { CodingStats } from "../components/CodingStats/CodingStats";
import { Projects } from "../components/Projects/Projects";
import { Languages } from "../components/Languages/Languages";
import { Contact } from "../components/Contact/Contact";
import { ResumeModal } from "../components/ResumeModal/ResumeModal";

import type { MouseEvent as ReactMouseEvent } from "react";

const NAV_LINKS = [
    { id: "home", label: "Home" },
    { id: "education", label: "Education" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
] as const;

type NavSectionId = (typeof NAV_LINKS)[number]["id"];
const NAVBAR_SCROLL_OFFSET = 96;

export function Home() {
    useScrollReveal();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [theme, setTheme] = useState<"light" | "dark">("dark");
    const [activeSection, setActiveSection] = useState<NavSectionId>("home");
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("portfolio-theme");
        if (savedTheme === "light" || savedTheme === "dark") {
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
        }
    }, []);

    const toggleTheme = () => {
        const DARK_BG = "#0B0C10";
        const LIGHT_BG = "#F9FAFB";
        const newTheme = theme === "dark" ? "light" : "dark";
        const bg = newTheme === "light" ? LIGHT_BG : DARK_BG;
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("portfolio-theme", newTheme);
        // Sync inline styles for in-app browser armor
        document.documentElement.style.setProperty(
            "background-color",
            bg,
            "important",
        );
        if (document.body) {
            document.body.style.setProperty(
                "background-color",
                bg,
                "important",
            );
        }
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute("content", bg);
    };

    useEffect(() => {
        const sectionIds = NAV_LINKS.map((link) => link.id);
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter((section): section is HTMLElement => section !== null)
            .sort((first, second) => first.offsetTop - second.offsetTop);

        let ticking = false;

        function updateScrollState() {
            const totalScroll =
                document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0)
                setScrollProgress((window.scrollY / totalScroll) * 100);

            if (sections.length > 0) {
                const scrollMarker = window.scrollY + NAVBAR_SCROLL_OFFSET + 18;
                let nextActive = sections[0].id as NavSectionId;

                for (const section of sections) {
                    const sectionTop = section.offsetTop;
                    if (sectionTop <= scrollMarker) {
                        nextActive = section.id as NavSectionId;
                    } else break;
                }

                const bottomEdge = window.scrollY + window.innerHeight;
                const pageHeight = document.documentElement.scrollHeight;
                if (bottomEdge >= pageHeight - 4) {
                    nextActive = sections[sections.length - 1]
                        .id as NavSectionId;
                }
                setActiveSection((prev) => {
                    if (prev !== nextActive) return nextActive;
                    return prev;
                });
            }
            ticking = false;
        }

        // Add visual scroll reveals on section change or init
        function handleScroll() {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollState);
                ticking = true;
            }
        }

        function syncFromHash() {
            const hashId = window.location.hash.replace("#", "");
            if (sectionIds.includes(hashId as NavSectionId)) {
                setActiveSection(hashId as NavSectionId);
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });
        syncFromHash();
        handleScroll();
        window.addEventListener("hashchange", syncFromHash);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
            window.removeEventListener("hashchange", syncFromHash);
        };
    }, []);

    function handleNavClick(
        event: ReactMouseEvent<HTMLAnchorElement>,
        sectionId: string,
    ) {
        event.preventDefault();
        const target = document.getElementById(sectionId);
        if (!target) return;

        const targetTop =
            target.getBoundingClientRect().top +
            window.scrollY -
            NAVBAR_SCROLL_OFFSET;
        setActiveSection(sectionId as NavSectionId);
        setMobileMenuOpen(false);
        window.history.replaceState(null, "", `#${sectionId}`);
        window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
    }

    const handleResumeClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsResumeOpen(true);
    };

    return (
        <>
            <Navbar
                navLinks={NAV_LINKS}
                scrollProgress={scrollProgress}
                activeSection={activeSection}
                theme={theme}
                toggleTheme={toggleTheme}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                handleNavClick={handleNavClick}
                onResumeClick={handleResumeClick}
            />

            <main className="shell">
                <div className="background-orb orb-one" />
                <div className="background-orb orb-two" />
                <div className="background-orb orb-three" />

                <Hero />
                <Education />

                <section className="content-grid about-stack-layout">
                    <About />
                    <Skills />
                </section>

                <CodingStats />

                <Projects />
                <Languages />
                <Contact onResumeClick={handleResumeClick} />

                <Footer />
            </main>

            <ResumeModal
                isOpen={isResumeOpen}
                onClose={() => setIsResumeOpen(false)}
            />
        </>
    );
}

export default Home;
