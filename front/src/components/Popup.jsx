import React from "react";

function Popup({ isVisible, onClose, children }) {
    if (!isVisible) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    padding: "20px",
                    width: "90%",
                    maxWidth: "500px",
                    position: "relative",
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "10px",
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            background: "none",
                            border: "none",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                            color: "#555",
                        }}
                    >
                        ✖
                    </button>
                </div>
                <div
                    style={{
                        marginTop: "10px",
                        fontSize: "1rem",
                        color: "#333",
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Popup;
