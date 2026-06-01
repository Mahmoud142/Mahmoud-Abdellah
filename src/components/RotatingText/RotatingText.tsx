import { useState, useEffect, useCallback } from "react";
import "./RotatingText.css";

interface RotatingTextProps {
    phrases: string[];
    interval?: number;
}

export function RotatingText({ phrases, interval = 3200 }: RotatingTextProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

    const currentPhrase = phrases[currentIndex];

    const typeSpeed = 55;
    const deleteSpeed = 35;
    const pauseDuration = interval;

    const tick = useCallback(() => {
        if (phase === "typing") {
            if (displayText.length < currentPhrase.length) {
                setDisplayText(currentPhrase.slice(0, displayText.length + 1));
            } else {
                setPhase("pause");
            }
        } else if (phase === "pause") {
            // After pause, start deleting
            const timer = setTimeout(() => setPhase("deleting"), pauseDuration);
            return () => clearTimeout(timer);
        } else if (phase === "deleting") {
            if (displayText.length > 0) {
                setDisplayText(displayText.slice(0, -1));
            } else {
                setCurrentIndex((prev) => (prev + 1) % phrases.length);
                setPhase("typing");
            }
        }
    }, [phase, displayText, currentPhrase, pauseDuration, phrases.length]);

    useEffect(() => {
        if (phase === "pause") {
            const timer = setTimeout(() => setPhase("deleting"), pauseDuration);
            return () => clearTimeout(timer);
        }

        const speed = phase === "typing" ? typeSpeed : deleteSpeed;
        const timer = setTimeout(tick, speed);
        return () => clearTimeout(timer);
    }, [tick, phase, pauseDuration]);

    return (
        <span className="rotating-text" aria-label={currentPhrase}>
            <span className="rotating-text-content">{displayText || "\u200b"}</span>
            <span className="rotating-text-cursor" aria-hidden="true" />
        </span>
    );
}
