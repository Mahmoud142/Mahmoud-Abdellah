import { useEffect } from "react";

export function useScrollReveal(dependencies: React.DependencyList = []) {
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
            const revealElements = document.querySelectorAll(".reveal:not(.is-revealed)");
            revealElements.forEach((el) => intersectionObserver.observe(el));
        }

        observeElements();

        // Use a simple timeout to catch elements rendered slightly after mount
        const timeoutId = setTimeout(observeElements, 500);

        return () => {
            clearTimeout(timeoutId);
            intersectionObserver.disconnect();
        };
    }, dependencies);
}
