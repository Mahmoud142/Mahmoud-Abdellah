import { ReactNode } from "react";

interface SectionHeaderProps {
    title: string;
    icon?: ReactNode;
}

export function SectionHeading({ title, icon }: SectionHeaderProps) {
    return (
        <div className="section-header reveal">
            {icon && (
                <span className="section-icon" aria-hidden="true">
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
