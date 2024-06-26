import React, { ChangeEventHandler, FC } from "react";
import { InputText } from "primereact/inputtext";

interface InputArgs {
    handleChange?: ChangeEventHandler<HTMLInputElement>
    name: string,
    id: string,
    label: string,
    value?: string,
}

const Input: FC<InputArgs> = ({handleChange, name, id, label, value}) => {
    return (
        <div className="col-12 flex flex-column">
            <label htmlFor={id}>{label}</label>
            <InputText onChange={handleChange} name={name} id={id} className="field" value={value}/>
        </div>
    );
};

export default Input;
