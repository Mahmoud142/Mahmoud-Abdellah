import { FaLanguage } from "react-icons/fa6";
import { portfolioData } from "../../constants/data";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import "./Languages.css";

export function Languages() {
    return (
        <div id="languages" className="nav-section">
            <SectionHeading title="Languages" icon={<FaLanguage />} />

            <div className="languages-grid stagger-container">
                {portfolioData.languages.map((lang) => {
                    const cardClass = `language-card card-${lang.name.toLowerCase()} reveal`;
                    return (
                        <div key={lang.name} className={cardClass}>
                            {/* Translucent background letters */}
                            <div className="card-bg-letter" aria-hidden="true">
                                {lang.code}
                            </div>
                            
                            <div className="card-top">
                                <div className="card-title-group">
                                    <h3 className="language-name">{lang.name}</h3>
                                    <span className="language-proficiency">{lang.proficiency}</span>
                                </div>
                                <div className="language-badge" aria-hidden="true">
                                    {lang.code}
                                </div>
                            </div>

                            <div className="card-bottom">
                                <div className="progress-labels">
                                    <span className="level-label">{lang.level}</span>
                                    <span className="percentage-label">{lang.percentage}%</span>
                                </div>
                                <div className="progress-track">
                                    <div 
                                        className="progress-fill" 
                                        style={{ width: `${lang.percentage}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Languages;
