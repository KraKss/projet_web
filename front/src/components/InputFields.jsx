import { forwardRef } from "react";

const InputFields = forwardRef(({ label, error, readOnly, ...props }, ref) => {
    return (
        <div style={styles.container}>
            {label && (
                <label htmlFor={props.name} style={styles.label}>
                    {label}
                </label>
            )}
            <input
                ref={ref}
                {...props}
                readOnly={readOnly}
                style={{
                    ...styles.input,
                    backgroundColor: readOnly ? "#f9f9f9" : "white",
                    borderColor: error ? "#dc3545" : "#ccc",
                }}
            />
            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
});

const styles = {
    container: {
        marginBottom: "15px",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Arial', sans-serif",
    },
    label: {
        marginBottom: "5px",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#333",
    },
    input: {
        padding: "10px 12px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        fontSize: "14px",
        outline: "none",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
    },
    error: {
        marginTop: "5px",
        fontSize: "12px",
        color: "#dc3545",
    },
};

export default InputFields;
