import Popup from "../Popup.jsx";
import InputFields from "../InputFields.jsx";

const Form = ({ fields = [], onSubmit, register, handleSubmit, onCancel }) => {
    return (
        <Popup isVisible={true} onClose={onCancel}>
            <div style={{ padding: "10px" }}>
                <h2 style={{ textAlign: "center", color: "#333" }}>Add</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {fields.map((field, index) => (
                        <InputFields
                            key={index}
                            label={field.label}
                            name={field.name}
                            type={field.type || "text"}
                            placeholder={field.placeholder || ""}
                            error={field.error}
                            readOnly={field.readOnly}
                            accept={field?.accept ?? ""}
                            {...register(field.name)}
                        />
                    ))}
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
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
    );
};

export default Form;
