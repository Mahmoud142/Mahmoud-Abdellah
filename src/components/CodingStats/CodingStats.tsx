import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";
import { FaBrain, FaArrowUpRightFromSquare, FaFlag } from "react-icons/fa6";
import "./CodingStats.css";

// Custom AtCoder Premium Inline SVG
function AtCoderIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="atcoder-brand-icon"
            style={{ width: "1.4rem", height: "1.4rem" }}
            {...props}
        >
            <path d="M12 2L1 21h22L12 2zm0 3.8L19.1 19H4.9L12 5.8z" />
        </svg>
    );
}

export function CodingStats() {
    // LeetCode Stats (Abo_abdellah14)
    const lcSolved = 549;
    const lcRankPercent = "Top 4%";
    const lcGlobalRank = "157,390";
    
    // Codeforces Stats (Mahmoud_Abdellah14)
    const cfRating = 1062;
    const cfRank = "Newbie";
    const cfSolved = 796;

    // CodeChef Stats (mahmoud14)
    const ccRating = 1548;
    const ccStars = "2★";
    const ccDiv = "Div 3";
    const ccSolved = 41;
    const ccEgyptRank = "108";

    // AtCoder Stats (Mahmoud_Abdellah)
    const acRating = 521;
    const acKyu = "8 Kyu";
    const acColor = "Brown";
    const acContests = 14;

    return (
        <div id="dsa-stats" className="nav-section coding-stats-section">
            <div className="section-header reveal">
                <div className="section-icon">
                    <FaBrain aria-hidden="true" />
                </div>
                <h2 className="main-section-title">CP & PS Profiles</h2>
                <div className="section-decor">
                    <div className="pro-divider-line" />
                </div>
            </div>

            <section className="coding-stats-grid stagger-container">
                {/* LeetCode Card */}
                <article className="coding-card leetcode-card reveal">
                    <div className="coding-card-bg-glow" />
                    <header className="coding-card-header">
                        <div className="brand-title">
                            <SiLeetcode className="leetcode-brand-icon" />
                            <h3>LeetCode</h3>
                        </div>
                        <a 
                            href="https://leetcode.com/u/Abo_abdellah14/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="profile-link-btn"
                            aria-label="View LeetCode Profile"
                        >
                            <FaArrowUpRightFromSquare />
                        </a>
                    </header>

                    <div className="card-dashboard-body">
                        {/* Solved Progress Circle */}
                        <div className="progress-visualizer">
                            <svg width="90" height="90" viewBox="0 0 100 100" className="progress-circle-svg">
                                <circle cx="50" cy="50" r="42" className="progress-circle-bg" />
                                <circle 
                                    cx="50" 
                                    cy="50" 
                                    r="42" 
                                    className="progress-circle-bar leetcode-bar" 
                                    style={{ strokeDasharray: `${2 * Math.PI * 42}`, strokeDashoffset: `${2 * Math.PI * 42 * (1 - lcSolved / 1000)}` }}
                                />
                            </svg>
                            <div className="progress-circle-text">
                                <span className="solved-count">{lcSolved}+</span>
                                <span className="solved-label">Solved</span>
                            </div>
                        </div>

                        {/* Details List */}
                        <div className="card-stats-details">
                            <div className="stat-pill-row">
                                <span className="platform-badge rank-top-badge">{lcRankPercent}</span>
                            </div>
                            <div className="compact-detail-item">
                                <span className="detail-label">Global Rank</span>
                                <span className="detail-value highlight-value">{lcGlobalRank}</span>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Codeforces Card */}
                <article className="coding-card codeforces-card reveal">
                    <div className="coding-card-bg-glow" />
                    <header className="coding-card-header">
                        <div className="brand-title">
                            <SiCodeforces className="codeforces-brand-icon" />
                            <h3>Codeforces</h3>
                        </div>
                        <a 
                            href="https://codeforces.com/profile/Mahmoud_Abdellah14" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="profile-link-btn"
                            aria-label="View Codeforces Profile"
                        >
                            <FaArrowUpRightFromSquare />
                        </a>
                    </header>

                    <div className="card-dashboard-body">
                        {/* Solved Progress Circle */}
                        <div className="progress-visualizer">
                            <svg width="90" height="90" viewBox="0 0 100 100" className="progress-circle-svg">
                                <circle cx="50" cy="50" r="42" className="progress-circle-bg" />
                                <circle 
                                    cx="50" 
                                    cy="50" 
                                    r="42" 
                                    className="progress-circle-bar codeforces-bar" 
                                    style={{ strokeDasharray: `${2 * Math.PI * 42}`, strokeDashoffset: `${2 * Math.PI * 42 * (1 - cfSolved / 1000)}` }}
                                />
                            </svg>
                            <div className="progress-circle-text">
                                <span className="solved-count">{cfSolved}+</span>
                                <span className="solved-label">Solved</span>
                            </div>
                        </div>

                        {/* Details List */}
                        <div className="card-stats-details">
                            <div className="compact-detail-item">
                                <span className="detail-label">Current Rating</span>
                                <span className="detail-value">{cfRating}</span>
                            </div>
                        </div>
                    </div>
                </article>

                {/* CodeChef Card */}
                <article className="coding-card codechef-card reveal">
                    <div className="coding-card-bg-glow" />
                    <header className="coding-card-header">
                        <div className="brand-title">
                            <SiCodechef className="codechef-brand-icon" />
                            <h3>CodeChef</h3>
                        </div>
                        <a 
                            href="https://www.codechef.com/users/mahmoud14" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="profile-link-btn"
                            aria-label="View CodeChef Profile"
                        >
                            <FaArrowUpRightFromSquare />
                        </a>
                    </header>

                    <div className="card-dashboard-body">
                        {/* Solved Progress Circle */}
                        <div className="progress-visualizer">
                            <svg width="90" height="90" viewBox="0 0 100 100" className="progress-circle-svg">
                                <circle cx="50" cy="50" r="42" className="progress-circle-bg" />
                                <circle 
                                    cx="50" 
                                    cy="50" 
                                    r="42" 
                                    className="progress-circle-bar codechef-bar" 
                                    style={{ strokeDasharray: `${2 * Math.PI * 42}`, strokeDashoffset: `${2 * Math.PI * 42 * (1 - ccSolved / 100)}` }}
                                />
                            </svg>
                            <div className="progress-circle-text">
                                <span className="solved-count">{ccSolved}+</span>
                                <span className="solved-label">Solved</span>
                            </div>
                        </div>

                        {/* Details List */}
                        <div className="card-stats-details">
                            <div className="stat-pill-row">
                                <span className="platform-badge rank-stars-badge">{ccStars} ({ccDiv})</span>
                            </div>
                            <div className="compact-detail-item">
                                <span className="detail-label">Rating / Country Rank</span>
                                <span className="detail-value">
                                    {ccRating} <span style={{ color: "#E24A3F", fontWeight: 800 }}>•</span> Egypt #{ccEgyptRank}
                                </span>
                            </div>
                        </div>
                    </div>
                </article>

                {/* AtCoder Card */}
                <article className="coding-card atcoder-card reveal">
                    <div className="coding-card-bg-glow" />
                    <header className="coding-card-header">
                        <div className="brand-title">
                            <AtCoderIcon />
                            <h3>AtCoder</h3>
                        </div>
                        <a 
                            href="https://atcoder.jp/users/Mahmoud_Abdellah" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="profile-link-btn"
                            aria-label="View AtCoder Profile"
                        >
                            <FaArrowUpRightFromSquare />
                        </a>
                    </header>

                    <div className="card-dashboard-body">
                        {/* Contests Played Circle */}
                        <div className="progress-visualizer">
                            <svg width="90" height="90" viewBox="0 0 100 100" className="progress-circle-svg">
                                <circle cx="50" cy="50" r="42" className="progress-circle-bg" />
                                <circle 
                                    cx="50" 
                                    cy="50" 
                                    r="42" 
                                    className="progress-circle-bar atcoder-bar" 
                                    style={{ strokeDasharray: `${2 * Math.PI * 42}`, strokeDashoffset: `${2 * Math.PI * 42 * (1 - acContests / 50)}` }}
                                />
                            </svg>
                            <div className="progress-circle-text">
                                <span className="solved-count">{acContests}+</span>
                                <span className="solved-label">Played</span>
                            </div>
                        </div>

                        {/* Details List */}
                        <div className="card-stats-details">
                            <div className="stat-pill-row">
                                <span className="platform-badge rank-kyu-badge">{acKyu} ({acColor})</span>
                            </div>
                            <div className="compact-detail-item">
                                <span className="detail-label">Current Rating</span>
                                <span className="detail-value">{acRating}</span>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
}
export default CodingStats;
