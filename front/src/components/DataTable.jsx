import React, { useState } from "react";
import styles from "../styles/DataTable.module.css";
import Pagination from "./Pagination.jsx";
import SearchBar from "./SearchBar.jsx";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/routesPath.js";

const DataTable = ({ data, columns, seeJoinedTable, onEdit, onAdd }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const rowsPerPage = 5;

    const filteredData = data.filter((row) =>
        columns.some((col) =>
            row[col]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        <div className={styles.container}>
            <button className={styles.addButton} onClick={onAdd}>
                ➕ Add New
            </button>
            <table className={styles.profileTable}>
                <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col}>{col}</th>
                    ))}
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentData.length > 0 ? (
                    currentData.map((row, index) => (
                        <tr key={index}>
                            {columns.map((col) => (
                                <td key={col}>{row[col]}</td>
                            ))}
                            <td>
                                <button
                                    className={styles.editButton}
                                    onClick={() => onEdit(row)}
                                    aria-label="Edit"
                                >
                                    ✏️
                                </button>
                                <button className={styles.deleteButton} aria-label="Delete">
                                    🗑️
                                </button>
                                {seeJoinedTable && (
                                    <Link to={ROUTES.ORDERS_ITEMS_ROUTE}>
                                        <button
                                            className={styles.deleteButton}
                                        >
                                            👀
                                        </button>
                                    </Link>
                                )}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length + 1} style={{ textAlign: "center" }}>
                            Aucune donnée disponible
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <footer>
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
                <SearchBar placeholder="Search..." onSearch={handleSearch} />
            </footer>
        </div>
    );
};

export default DataTable;
