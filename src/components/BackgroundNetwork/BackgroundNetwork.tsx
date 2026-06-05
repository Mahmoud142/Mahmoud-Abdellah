import { useEffect, useRef } from "react";
import "./BackgroundNetwork.css";

class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.4; // Very slow movement
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.2 + 0.8;
    }

    update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls smoothly
        if (this.x < 0 || this.x > canvasWidth) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvasHeight) this.vy = -this.vy;
    }

    draw(ctx: CanvasRenderingContext2D, color: string) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }
}

export function BackgroundNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;

        // Mouse interaction
        let mouseX = -1000;
        let mouseY = -1000;

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            // Calculate number of particles based on screen area to keep density consistent
            const density = Math.floor((canvas.width * canvas.height) / 12000);
            const particleCount = Math.min(density, 120); // Cap it for performance
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Determine theme colors dynamically from CSS variables or attributes
            const isLightMode =
                document.documentElement.getAttribute("data-theme") === "light";
            // Cyan/Blue theme mapping:
            const particleColor = isLightMode
                ? "rgba(79, 70, 229, 0.45)"
                : "rgba(0, 229, 229, 0.4)";
            const lineColorRGB = isLightMode ? "79, 70, 229" : "0, 229, 229";

            particles.forEach((p) => {
                p.update(canvas.width, canvas.height);

                // Mouse interaction - slight repel to create a magnetic feel
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    p.x += dx * 0.015;
                    p.y += dy * 0.015;
                }

                p.draw(ctx, particleColor);

                // Draw connecting lines to nearby particles
                particles.forEach((p2) => {
                    if (p === p2) return;
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        // Opacity fades as distance increases - boosted max opacity to 0.28 for clearer luminous links
                        ctx.strokeStyle = `rgba(${lineColorRGB}, ${0.28 - (distance / 120) * 0.28})`;
                        ctx.lineWidth = 0.95;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", updateCanvasSize);
        window.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        updateCanvasSize();
        animate();

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="background-network"
            aria-hidden="true"
        />
    );
}
