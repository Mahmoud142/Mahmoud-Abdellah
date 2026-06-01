import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./ScrollToTop.css";

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isNearFooter, setIsNearFooter] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight;
        const winHeight = window.innerHeight;
        
        // Visibility
        const visible = scrollTop > 300;
        setIsVisible((prev) => (prev !== visible ? visible : prev));
        
        // Progress (0 to 100)
        const totalDocScrollLength = docHeight - winHeight;
        const progress = totalDocScrollLength > 0 ? (scrollTop / totalDocScrollLength) * 100 : 0;
        setScrollProgress(progress);

        // Footer Awareness (if within 150px of bottom)
        const nearFooter = scrollTop + winHeight >= docHeight - 150;
        setIsNearFooter((prev) => (prev !== nearFooter ? nearFooter : prev));
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Stroke dasharray for circle (circumference = 2 * pi * r)
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

    return (
        <button
            className={`scroll-to-top ${isVisible ? "visible" : ""} ${isNearFooter ? "near-footer" : ""} ${scrollProgress >= 99 ? "scroll-complete" : ""}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{ 
                '--glow-opacity': Math.min(scrollProgress / 100, 1) 
            } as React.CSSProperties}
        >
            <svg className="progress-ring" width="100%" height="100%" viewBox="0 0 50 50">
                <circle
                    className="progress-ring-circle-bg"
                    strokeWidth="2"
                    fill="transparent"
                    r={radius}
                    cx="25"
                    cy="25"
                />
                <circle
                    className="progress-ring-circle"
                    strokeWidth="2"
                    fill="transparent"
                    r={radius}
                    cx="25"
                    cy="25"
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: strokeDashoffset
                    }}
                />
            </svg>
            <div className="scroll-icon-wrapper">
                <FaArrowUp className="scroll-icon" />
            </div>
        </button>
    );
};
