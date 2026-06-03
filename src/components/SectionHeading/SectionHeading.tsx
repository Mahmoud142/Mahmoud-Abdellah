import { ReactNode } from "react";

interface SectionHeaderProps {
    title: string;
    icon?: ReactNode;
    iconColor?: string;
}

export function SectionHeading({ title, icon, iconColor }: SectionHeaderProps) {
    return (
        <div className="section-header reveal">
            {icon && (
                <span 
                    className="section-icon" 
                    style={iconColor ? { color: iconColor } : undefined} 
                    aria-hidden="true"
                >
                    {icon}
                </span>
            )}
            <h1 className="main-section-title">{title}</h1>
            <div className="section-decor">
                <span className="pro-divider-line" />
            </div>
        </div>
    );
}
