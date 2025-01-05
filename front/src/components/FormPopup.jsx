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

    const validateForm = async () => {
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({});
            return true;
        } catch (validationErrors) {
            const newErrors = {};
            validationErrors.inner.forEach((error) => {
                const path = error.path.split(".");
                if (path.length === 1) {
                    newErrors[path[0]] = error.message;
                } else {
                    const [parent, child] = path;
                    newErrors[parent] = {
                        ...(newErrors[parent] || {}),
                        [child]: error.message,
                    };
                }
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
            setFormData([]);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <h3>{editMode ? "Edit Item" : "Add New"}</h3>
                <form onSubmit={handleSubmit}>
                    {formFields.map((field) => {
                        if (field === "image") {
                            return (
                                <div key={field} className={styles.formField}>
                                    <label htmlFor={field}>{field}</label>
                                    <input
                                        type="file"
                                        id={field}
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                [field]: file,
                                            }));
                                        }}
                                    />
                                    {errors[field] && <span className={styles.error}>{errors[field]}</span>}
                                </div>
                            );
                        } else if (typeof field === "string") {
                            return (
                                <div key={field} className={styles.formField}>
                                    <label htmlFor={field}>{field}</label>
                                    <input
                                        type="text"
                                        id={field}
                                        value={formData[field] || ""}
                                        onChange={(e) => handleInputChange(e, field)}
                                    />
                                    {errors[field] && <span className={styles.error}>{errors[field]}</span>}
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
                                                    handleNestedInputChange(e, parentField, childField)
                                                }
                                            />
                                            {errors[parentField]?.[childField] && (
                                                <span className={styles.error}>
                                                    {errors[parentField][childField]}
                                                </span>
                                            )}
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
