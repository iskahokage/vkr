import React, { ChangeEvent, FC, MouseEvent, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IResetPassword } from "../../types/user";
import { useAppDispatch } from "../../redux/hooks";
import { AppDispatch } from "../../redux/store";
import { changePassword } from "../../redux/user/userSlice";
import { Toast } from "primereact/toast";
const PasswordReset: FC = () => {

    const toast = useRef<Toast>(null)
    const dispatch: AppDispatch = useAppDispatch()

    const [newPassword, setNewPassword] = useState<IResetPassword>({
        oldPassword: "",
        password: "",
        confirmPassword: "",
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name
        setNewPassword(prev => ({
            ...prev,
            [name]: value
        }))
    };

    const resetPassword = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(changePassword({newPassword, toast}))
    }

    return (
        <div className="sm:col-12">
            <Toast ref={toast}/>
            <p>Сбросить пароль</p>
            <div className="sm:col-12 md:col-6 flex flex-column">
                <label htmlFor="oldPassword">Старый пароль</label>
                <InputText onChange={handleChange} name="oldPassword" id="oldPassword" className="field" />
            </div>
            <div className="sm:col-12 md:col-6 flex flex-column">
                <label htmlFor="password">Новый пароль</label>
                <InputText onChange={handleChange} name="password" id="password" className="field" />
            </div>
            <div className="sm:col-12 md:col-6 flex flex-column">
                <label htmlFor="confirmPassword">Повторите пароль</label>
                <InputText onChange={handleChange} name="confirmPassword" id="confirmPassword" className="field" />
            </div>
            <div className="sm:col-12 md:col-6 flex flex-column text-center">
                <Button onClick={resetPassword} type="button" className="text-center block">
                    Изменить пароль
                </Button>
            </div>
        </div>
    );
};

export default PasswordReset;
