import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

import { Navbar } from "../layouts/Navbar/Navbar";
import { Footer } from "../layouts/Footer/Footer";
import { Hero } from "../components/Hero/Hero";
import { Education } from "../components/Education/Education";
import { About } from "../components/About/About";
import { Skills } from "../components/Skills/Skills";
import { Projects } from "../components/Projects/Projects";
import { Contact } from "../components/Contact/Contact";

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
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("portfolio-theme", newTheme);
    };

    useEffect(() => {
        const sectionIds = NAV_LINKS.map((link) => link.id);
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter((section): section is HTMLElement => section !== null)
            .sort((first, second) => first.offsetTop - second.offsetTop);

        let ticking = false;

        function updateScrollState() {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) setScrollProgress((window.scrollY / totalScroll) * 100);

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
                    nextActive = sections[sections.length - 1].id as NavSectionId;
                }
                setActiveSection(nextActive);
            }
            ticking = false;
        }

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

    function handleNavClick(event: ReactMouseEvent<HTMLAnchorElement>, sectionId: string) {
        event.preventDefault();
        const target = document.getElementById(sectionId);
        if (!target) return;

        const targetTop = target.getBoundingClientRect().top + window.scrollY - NAVBAR_SCROLL_OFFSET;
        setActiveSection(sectionId as NavSectionId);
        setMobileMenuOpen(false);
        window.history.replaceState(null, "", `#${sectionId}`);
        window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
    }

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

                <Projects />
                <Contact />

                <Footer />
            </main>
        </>
    );
}

export default Home;
