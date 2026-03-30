import { useEffect } from "react";

export function useScrollReveal() {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.15, 
        };

        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-revealed");
                    intersectionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        function observeElements() {
            // Find all reveal elements that haven't been revealed yet
            const revealElements = document.querySelectorAll(".reveal:not(.is-revealed)");
            revealElements.forEach((el) => intersectionObserver.observe(el));
        }

        // 1. Observe existing DOM elements on mount
        observeElements();

        // 2. Observe future DOM mutations to catch asynchronously loaded content (like the GitHub API requests)
        const mutationObserver = new MutationObserver(() => {
            observeElements();
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            mutationObserver.disconnect();
            intersectionObserver.disconnect();
        };
    }, []);
}
