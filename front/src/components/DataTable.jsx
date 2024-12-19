import React, { useState } from "react";
import styles from "../styles/DataTable.module.css";
import Pagination from "./Pagination.jsx";
import SearchBar  from "./SearchBar.jsx";
import { Link } from "react-router-dom";
import {ROUTES} from "../routes/routesPath.js";
import log from "eslint-plugin-react/lib/util/log.js";

const DataTable = ({ data, columns, seeJoinedTable, form}) => {

    const [isAdding, setIsAdding] = useState(false);
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
    const handleFormSubmit = (newData) => {
        setIsAdding(false);
    };

    return (
        <div className={styles.container}>
            {isAdding ? (
                <div className={styles.formOverlay}>
                    {React.cloneElement(form, { onSubmit: handleFormSubmit })}
                </div>
            ) : (
                <button className={styles.addButton} onClick={() => setIsAdding(true)}>
                    ➕ Add New
                </button>
            )}
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
                {currentData && currentData.length > 0 ? (
                    currentData.map((row, index) => (
                        <tr key={index}>
                            {columns.map((col) => (
                                <td key={col}>{row[col]}</td>
                            ))}
                            <td>
                                <button className={styles.editButton}>✏️</button>
                                <button className={styles.deleteButton}>🗑️</button>
                                <Link to={ROUTES.ORDERS_ITEMS_ROUTE}>
                                    {seeJoinedTable && <button className={styles.deleteButton}>👀</button>}
                                </Link>
                            </td>

                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length}>Aucune donnée disponible</td>
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
                <SearchBar placeholder="Search..." onSearch={handleSearch}/>
            </footer>
        </div>
    );
};

export default DataTable;
