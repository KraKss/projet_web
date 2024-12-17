import styles from '../styles/DataTable.module.css';

const DataTable = ({ data, columns, actions }) => {
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
                {data && data.length > 0 ? (
                    data.map((row, index) => (
                        <tr key={index}>
                            {/* Affiche chaque ligne de données dynamiquement */}
                            {columns.map((col) => (
                                <td key={col}>{row[col]}</td>
                            ))}
                            {actions && (
                                <td>
                                    {/*Laissez champs vides si pas de modif*/}
                                    <button className={styles.editButton}>✏️</button>
                                    <button className={styles.deleteButton}>🗑️</button>
                                </td>
                            )}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length + (actions ? 1 : 0)}>Aucune donnée disponible</td>
                    </tr>
                )}
                </tbody>
            </table>
            <footer className={styles.pagination}>
                <input type="text" placeholder="Search" className={styles.searchInput} />
                <span>1</span>
            </footer>
        </div>
    );
};

export default DataTable;
