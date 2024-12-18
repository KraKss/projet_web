import  { useState } from "react";
import Popup from "../Popup.jsx";
import InputFields from "../InputFields.jsx";

const Form = ({ fields = [], onSubmit }) => {
    const [isVisible, setIsVisible] = useState(false); // Contrôle du popup
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue || "" }), {})
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = () => {
        if (onSubmit) {
            onSubmit(formData);
            setIsVisible(false);
        }
    };

    const handleCancel = () => {
        setIsVisible(false);
    };

    return (
        <div>
            <button
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "1em",
                }}
                onClick={() => setIsVisible(true)}
            >
                Add Profile
            </button>

            <Popup isVisible={isVisible} onClose={handleCancel}>
                <div style={{ padding: "10px" }}>
                    <h2 style={{ textAlign: "center", color: "#333" }}>Add Profile</h2>
                    <form>
                        {fields.map((field, index) => (
                            <InputFields
                                key={index}
                                label={field.label}
                                name={field.name}
                                type={field.type || "text"}
                                placeholder={field.placeholder || ""}
                                value={formData[field.name]}
                                onChange={handleChange}
                                error={field.error}
                                readOnly={field.readOnly}
                            />
                        ))}
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
                            <button
                                type="button"
                                onClick={handleAdd}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#28a745",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "1em",
                                    marginRight: "10px",
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Popup>
        </div>
    );
};

export default Form;
