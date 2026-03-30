import { useEffect } from "react";

export function useScrollReveal() {
    useEffect(() => {
        // We use IntersectionObserver to detect when elements enter the viewport
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.15, // Trigger when 15% of the element is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-revealed");
                    // Stop observing once revealed to only animate in once
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Find all elements tagged with the .reveal utility class
        const revealElements = document.querySelectorAll(".reveal");
        revealElements.forEach((el) => observer.observe(el));

        return () => {
            revealElements.forEach((el) => observer.unobserve(el));
            observer.disconnect();
        };
    }, []);
}
