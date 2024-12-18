import {forwardRef} from "react";
const InputFields = forwardRef(({ label, error, readOnly, ...props }, ref) => {
    return (
        <div>
            {label && <label htmlFor={props.name}>{label}</label>}
            <input
                ref={ref}
                {...props}
                readOnly={readOnly}
                style={{ backgroundColor: readOnly ? '#f0f0f0' : 'white' }}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
});

export default InputFields;