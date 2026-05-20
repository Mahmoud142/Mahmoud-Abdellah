import { useEffect, useRef, useState } from "react";
import "./CursorFollower.css";

export function CursorFollower() {
    const spotlightRef = useRef<HTMLDivElement>(null);
    const [hidden, setHidden] = useState(true);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkDevice = () => {
            const touch =
                window.matchMedia("(pointer: coarse)").matches ||
                "ontouchstart" in window;
            setIsMobile(touch);
        };
        checkDevice();

        if (isMobile) return;

        const handleMouseMove = (e: MouseEvent) => {
            setHidden(false);
            if (spotlightRef.current) {
                spotlightRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
        };

        const handleMouseLeave = () => setHidden(true);
        const handleMouseEnter = () => setHidden(false);

        window.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("mouseleave", handleMouseLeave);
        document.body.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <div
            ref={spotlightRef}
            className={`cursor-spotlight ${hidden ? "is-hidden" : ""}`}
            aria-hidden="true"
        />
    );
}
