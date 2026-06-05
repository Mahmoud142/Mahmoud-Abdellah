import { FaUser, FaLaptopCode, FaBrain, FaNetworkWired } from "react-icons/fa6";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import "./About.css";

const ABOUT_CARDS = [
    {
        title: "Full-Stack & Systems",
        icon: FaLaptopCode,
        color: "var(--color-accent-secondary)", // Electric Blue
        description: "Software Engineer with a comprehensive command of the full stack, engineering sophisticated backend architectures and high-performance frontend applications with a focus on massive scale."
    },
    {
        title: "Algorithms & Logic",
        icon: FaBrain,
        color: "var(--color-accent)", // Neon Cyan
        description: "A dedicated problem solver leveraging deep Data Structures and Algorithms expertise to architect efficient solutions for complex, high-concurrency technical challenges."
    },
    {
        title: "Architecture & Clean Code",
        icon: FaNetworkWired,
        color: "var(--color-accent-tertiary)", // Deep Orchid
        description: "Bridging the divide between server-side stability and client-side excellence by integrating modern software engineering principles into resilient, end-to-end digital solutions."
    }
];

export function About() {
    return (
        <div id="about" className="nav-section">
            <SectionHeading title="About Me" icon={<FaUser />} iconColor="var(--heading-about)" />
            <section className="panel">
                <div className="about-cards stagger-container">
                    {ABOUT_CARDS.map((card) => {
                        const IconComponent = card.icon;
                        return (
                            <article 
                                className="about-card reveal" 
                                key={card.title}
                                style={{ "--card-color": card.color } as React.CSSProperties}
                            >
                                <h3>
                                    <IconComponent className="about-card-icon" aria-hidden="true" />
                                    {card.title}
                                </h3>
                                <p className="about-paragraph">{card.description}</p>
                            </article>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
