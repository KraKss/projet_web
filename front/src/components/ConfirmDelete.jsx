import styles from "../styles/ConfirmDelete.module.css";

const ConfirmDelete = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <h3>Confirmation</h3>
                <p>Voulez-vous vraiment supprimer <strong>{itemName}</strong> ?</p>
                <div className={styles.actions}>
                    <button className={styles.confirmButton} onClick={onConfirm}>
                        Oui
                    </button>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Non
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;
