import  { useState } from "react";
import Popup from "../Popup.jsx";
import InputFields from "../InputFields.jsx";

const Form = ({ fields = [], onSubmit, register, handleSubmit }) => {
    const [isVisible, setIsVisible] = useState(false); // Contrôle du popup




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
                    <h2 style={{ textAlign: "center", color: "#333" }}>Add Profile</h2> {/* TODO changé le nom la et pk appuyé 2 fois sur le bouton*/}
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {fields.map((field, index) => (
                            <InputFields
                                key={index}
                                label={field.label}
                                name={field.name}
                                type={field.type || "text"}
                                placeholder={field.placeholder || ""}
                                defaultValue={field.defaultValue}
                                error={field.error}
                                readOnly={field.readOnly}
                                accept={field?.accept ?? ""}
                                {...register(field.name)}
                            />
                        ))}
                        <div style={{display: "flex", justifyContent: "center", marginTop: "15px"}}>
                            <button
                                type="submit"

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
