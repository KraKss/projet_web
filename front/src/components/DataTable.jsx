import React, { useState } from "react";
import styles from "../styles/DataTable.module.css";
import Pagination from "./Pagination.jsx";
import SearchBar  from "./SearchBar.jsx";

const DataTable = ({ data, columns, actions }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const [searchQuery, setSearchQuery] = useState("");

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
            <table className={styles.profileTable}>
                <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col}>{col}</th>
                    ))}
                    {actions && <th>Actions</th>}
                </tr>
                </thead>
                <tbody>
                {currentData && currentData.length > 0 ? (
                    currentData.map((row, index) => (
                        <tr key={index}>
                            {columns.map((col) => (
                                <td key={col}>{row[col]}</td>
                            ))}
                            {actions && (
                                <td>
                                    <button className={styles.editButton} >✏️</button>
                                    <button className={styles.deleteButton}>🗑️</button>
                                </td>
                            )}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length + (actions ? 1 : 0)}>
                            No data available.
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
                <SearchBar placeholder="Search..." onSearch={handleSearch}  />
            </footer>
        </div>
    );
};

export default DataTable;
