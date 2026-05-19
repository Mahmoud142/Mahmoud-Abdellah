import { portfolioData } from "../../constants/data";
import "./Footer.css";

export function Footer() {
    return (
        <footer className="site-footer">
            <div className="terminal-signature">
                <span className="prompt-symbol">&gt;</span>
                <span className="command-text">Built by {portfolioData.name}</span>
                <span className="comment-text">/* &copy; 2026 All Rights Reserved */</span>
                <span className="cursor-blink">_</span>
            </div>
        </footer>
    );
}
