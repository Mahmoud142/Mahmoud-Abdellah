import { useEffect, useState } from "react";
import { FaXmark, FaDownload, FaArrowUpRightFromSquare } from "react-icons/fa6";
import "./ResumeModal.css";

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
    const [isFrameLoading, setIsFrameLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setIsFrameLoading(true); // Reset loading spinner every time modal is opened
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const previewUrl = "https://drive.google.com/file/d/1tg17b8bzl_S9asNIjiGg1Ru9E6c2Fuxe/preview";
    const downloadUrl = "https://drive.google.com/uc?export=download&id=1tg17b8bzl_S9asNIjiGg1Ru9E6c2Fuxe";
    const newTabUrl = "https://drive.google.com/file/d/1tg17b8bzl_S9asNIjiGg1Ru9E6c2Fuxe/view?usp=drive_link";

    return (
        <div className="resume-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <div className="resume-modal-container" onClick={(e) => e.stopPropagation()}>
                <header className="resume-modal-header">
                    <div className="resume-modal-title-wrapper">
                        <div className="resume-modal-title">
                            <h2>Mahmoud Abdellah – Resume</h2>
                            <span className="resume-modal-subtitle">Software Engineer</span>
                        </div>
                        {isFrameLoading && (
                            <div className="resume-header-loading-badge">
                                <div className="resume-header-spinner" />
                                <span className="resume-header-loading-text">Fetching from Drive...</span>
                            </div>
                        )}
                    </div>
                    <div className="resume-modal-actions">
                        <a
                            href={downloadUrl}
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
                    <iframe
                        src={previewUrl}
                        width="100%"
                        height="100%"
                        title="Mahmoud Abdellah Resume Preview"
                        className="resume-iframe"
                        allow="autoplay"
                        onLoad={() => setIsFrameLoading(false)}
                    />
                </div>
            </div>
        </div>
    );
}
