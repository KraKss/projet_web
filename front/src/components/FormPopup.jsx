import { useState, useEffect } from "react";
import styles from "../styles/FormPopup.module.css";

const FormPopup = ({ isOpen, onClose, formFields, onSubmit, editMode, initialData, validationSchema }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editMode && initialData) {
            setFormData(initialData);
        } else {
            setFormData({});
        }
    }, [editMode, initialData]);

    const handleInputChange = (e, column) => {
        setFormData((prevData) => ({
            ...prevData,
            [column]: e.target.value,
        }));
    };

    const validateForm = async () => {
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({});
            return true;
        } catch (validationErrors) {
            const newErrors = {};
            validationErrors.inner.forEach((error) => {
                newErrors[error.path] = error.message;
            });
            setErrors(newErrors);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validateForm();
        if (isValid) {
            onSubmit(formData);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <h3>{editMode ? "Edit Item" : "Add New"}</h3>
                <form onSubmit={handleSubmit}>
                    {formFields.map((col) => (
                        <div key={col} className={styles.formField}>
                            <label htmlFor={col}>{col}</label>
                            <input
                                type="text"
                                id={col}
                                value={formData[col] || ""}
                                onChange={(e) => handleInputChange(e, col)}
                                required
                            />
                            {errors[col] && <span className={styles.error}>{errors[col]}</span>}
                        </div>
                    ))}
                    <div className={styles.buttons}>
                        <button type="submit">{editMode ? "Save Changes" : "Submit"}</button>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormPopup;
