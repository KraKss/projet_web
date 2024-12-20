import { useState } from "react";
import styles from "../styles/DataTable.module.css";
import Pagination from "./Pagination.jsx";
import SearchBar from "./SearchBar.jsx";
import { Link } from "react-router-dom";
import FormPopup from "./FormPopup";
import ConfirmDelete from "./ConfirmDelete.jsx";

const DataTable = ({ data, columns, formFields, seeJoinedTable, onAddNew, onUpdateItem, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const [searchQuery, setSearchQuery] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const filteredData = data.filter((row) =>
        columns.some((col) =>
            row[col]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    const [deletePopup, setDeletePopup] = useState({ isOpen: false, item: null });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleAddNew = () => {
        setEditMode(false);
        setSelectedItem(null);
        setIsFormOpen(true);
    };

    const handleEditItem = (item) => {
        setEditMode(true);
        setSelectedItem(item);
        setIsFormOpen(true);
    };

    const handleDelete = (item) => {
        setDeletePopup({ isOpen: true, item });
    };

    const confirmDelete = async () => {
        if (deletePopup.item) {
            await onDelete(deletePopup.item);
        }
        setDeletePopup({ isOpen: false, item: null });
    };

    const cancelDelete = () => {
        setDeletePopup({ isOpen: false, item: null });
    };

    const handleFormSubmit = (formData) => {
        if (editMode) {
            onUpdateItem(selectedItem, formData);
        } else {
            onAddNew(formData);
        }
    };

    return (
        <div className={styles.container}>
            <button className={styles.addButton} onClick={handleAddNew}>
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
                {currentData && currentData.length > 0 ? (
                    currentData.map((row, index) => (
                        <tr key={index}>
                            {columns.map((col) => (
                                <td key={col}>{row[col]}</td>
                            ))}
                            <td>
                                <button className={styles.editButton} onClick={() => handleEditItem(row)}>✏️</button>
                                <button className={styles.deleteButton} onClick={() => handleDelete(row)}>🗑️</button>
                                {seeJoinedTable &&
                                    <Link to={`${seeJoinedTable.url}/${row.id}`}>
                                        <button className={styles.joinButton}>👀</button>
                                    </Link>
                                }
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
                <SearchBar placeholder="Search..." onSearch={handleSearch} />
            </footer>

            <FormPopup
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                formFields={formFields}
                onSubmit={handleFormSubmit}
                editMode={editMode}
                initialData={selectedItem}
            />

            <ConfirmDelete
                isOpen={deletePopup.isOpen}
                itemName={deletePopup.item?.name || "cet élément"}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default DataTable;
