import styles from '../styles/DataTable.module.css';

const DataTable = ({ data, columns, seeJoinedTable }) => {
    return (
        <div className={styles.container}>
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
                {data && data.length > 0 ? (
                    data.map((row, index) => (
                        <tr key={index}>
                            {/* Affiche chaque ligne de données dynamiquement */}
                            {columns.map((col) => (
                                <td key={col}>{row[col]}</td>
                            ))}
                            <td>

                                <button className={styles.editButton}>✏️</button>
                                <button className={styles.deleteButton}>🗑️</button>
                                {seeJoinedTable && <button className={styles.deleteButton}>👀</button>}
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
            <footer className={styles.pagination}>
                <input type="text" placeholder="Search" className={styles.searchInput} />
                <span>1</span>
            </footer>
        </div>
    );
};

export default DataTable;
