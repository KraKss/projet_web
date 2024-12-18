import { useState } from "react";

function Pagination({ totalPages, onPageChange }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setPage] = useState(currentPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            setPage(page);
            onPageChange(page);
        } else {
            setCurrentPage(totalPages);
            setPage(totalPages);
            onPageChange(totalPages);
        }
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (value === "" || /^[0-9]*$/.test(value)) {
            setPage(value);
        }
    };

    const handleInputBlur = () => {
        const page = parseInt(inputPage, 10);
        if (!isNaN(page)) {
            handlePageChange(page);
        } else {
            setPage(currentPage);
        }
    };

    const styles = {
        pagination: {
            display: "flex",
            justifyContent: "right",
            alignItems: "right",
            gap: "8px",
            marginTop: "20px",
            fontFamily: "Arial, sans-serif",
        },
        button: {
            backgroundColor: "#f4f4f4",
            border: "1px solid #ddd",
            color: "#333",
            padding: "8px 12px",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontSize: "14px",
        },
        buttonHover: {
            backgroundColor: "#ddd",
            color: "#000",
        },
        buttonActive: {
            backgroundColor: "#007bff",
            color: "white",
            borderColor: "#007bff",
        },
        buttonDisabled: {
            backgroundColor: "#eee",
            color: "#aaa",
            cursor: "not-allowed",
        },
        arrow: {
            fontWeight: "bold",
            fontSize: "18px",
            padding: "8px 12px",
        },
        pageInput: {
            display: "flex",
            alignItems: "center",
            gap: "5px",
            marginLeft: "10px",
        },
        input: {
            width: "35px",
            padding: "5px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            textAlign: "center",
        },
    };

    return (
        <div style={styles.pagination}>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                    ...styles.button,
                    ...(currentPage === 1 ? styles.buttonDisabled : {}),
                }}
                className="arrow"
            >
                &#9664;
            </button>
            <div style={styles.pageInput}>
                <input
                    type="text"
                    value={inputPage}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    style={styles.input}
                />
            </div>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                    ...styles.button,
                    ...(currentPage === totalPages ? styles.buttonDisabled : {}),
                }}
                className="arrow"
            >
                &#9654;
            </button>
        </div>
    );
}

export default Pagination;
