import { useEffect, useState } from "react";
import { FaXmark, FaDownload, FaArrowUpRightFromSquare } from "react-icons/fa6";
import "./ResumeModal.css";

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
    const [isFrameLoading, setIsFrameLoading] = useState(true);
    const [shouldPrefetch, setShouldPrefetch] = useState(false);

    useEffect(() => {
        // Wait 2.5 seconds after page loads to silently start prefetching the Google Drive preview
        const timer = setTimeout(() => {
            setShouldPrefetch(true);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isOpen) {
            // Force immediate prefetching if user clicks button before 2.5 seconds pass
            setShouldPrefetch(true);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const previewUrl = "https://drive.google.com/file/d/1tg17b8bzl_S9asNIjiGg1Ru9E6c2Fuxe/preview";
    const downloadUrl = "/Mahmoud_Abdellah_Resume.pdf";
    const newTabUrl = "https://drive.google.com/file/d/1tg17b8bzl_S9asNIjiGg1Ru9E6c2Fuxe/view?usp=drive_link";

    return (
        <div 
            className={`resume-modal-overlay ${isOpen ? "is-visible" : ""}`} 
            onClick={onClose} 
            role="dialog" 
            aria-modal="true"
        >
            <div className="resume-modal-container" onClick={(e) => e.stopPropagation()}>
                <header className="resume-modal-header">
                    <div className="resume-modal-title-wrapper">
                        <div className="resume-modal-title">
                            <h2>Mahmoud Abdellah – Resume</h2>
                            <span className="resume-modal-subtitle">Software Engineer</span>
                        </div>
                        {isFrameLoading && shouldPrefetch && (
                            <div className="resume-header-loading-badge">
                                <div className="resume-header-spinner" />
                                <span className="resume-header-loading-text">Fetching from Drive...</span>
                            </div>
                        )}
                    </div>
                    <div className="resume-modal-actions">
                        <a
                            href={downloadUrl}
                            download="Mahmoud_Abdellah_Resume.pdf"
                            className="resume-action-btn download-btn"
                            title="Download PDF"
                        >
                            <FaDownload />
                            <span>Download</span>
                        </a>
                        <a
                            href={newTabUrl}
                            className="resume-action-btn tab-btn"
                            title="Open in New Tab"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaArrowUpRightFromSquare />
                            <span>Open Direct</span>
                        </a>
                        <button className="resume-close-btn" onClick={onClose} aria-label="Close modal">
                            <FaXmark />
                        </button>
                    </div>
                </header>
                <div className="resume-modal-body">
                    {shouldPrefetch && (
                        <iframe
                            src={previewUrl}
                            width="100%"
                            height="100%"
                            title="Mahmoud Abdellah Resume Preview"
                            className="resume-iframe"
                            allow="autoplay"
                            onLoad={() => setIsFrameLoading(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
