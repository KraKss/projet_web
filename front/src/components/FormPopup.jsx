import { useState, useEffect } from "react";
import styles from "../styles/FormPopup.module.css";

const FormPopup = ({ isOpen, onClose, formFields, onSubmit, editMode, initialData }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (editMode && initialData) {
            setFormData(initialData);
        } else {
            setFormData({});
        }
    }, [editMode, initialData]);

    const handleInputChange = (e, field) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: e.target.value,
        }));
    };

    const handleNestedInputChange = (e, parentField, childField) => {
        setFormData((prevData) => ({
            ...prevData,
            [parentField]: {
                ...prevData[parentField],
                [childField]: e.target.value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <h3>{editMode ? "Edit Item" : "Add New"}</h3>
                <form onSubmit={handleSubmit}>
                    {formFields.map((field) => {
                        if (typeof field === "string") {
                            return (
                                <div key={field} className={styles.formField}>
                                    <label htmlFor={field}>{field}</label>
                                    <input
                                        type="text"
                                        id={field}
                                        value={formData[field] || ""}
                                        onChange={(e) => handleInputChange(e, field)}
                                        required
                                    />
                                </div>
                            );
                        } else {
                            const [parentField, childFields] = Object.entries(field)[0];
                            return (
                                <div key={parentField} className={styles.formField}>
                                    <h4>{parentField.replace("_", " ").toUpperCase()}</h4>
                                    {childFields.map((childField) => (
                                        <div key={childField} className={styles.nestedFormField}>
                                            <label htmlFor={`${parentField}-${childField}`}>
                                                {childField}
                                            </label>
                                            <input
                                                type="text"
                                                id={`${parentField}-${childField}`}
                                                value={formData[parentField]?.[childField] || ""}
                                                onChange={(e) =>
                                                    handleNestedInputChange(
                                                        e,
                                                        parentField,
                                                        childField
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            );
                        }
                    })}
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
