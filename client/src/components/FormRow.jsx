import React from 'react'

const FormRow = ({name, labelText, type, ...rest}) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {labelText || name}
            </label>
            <input {...rest} type={type} id={name} name={name} className='form-input' required />
        </div>
    )
}

export default FormRow