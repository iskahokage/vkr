import React, { ChangeEvent, FC, MouseEvent, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IResetPassword } from "../../types/user";
import { useAppDispatch } from "../../redux/hooks";
import { AppDispatch } from "../../redux/store";
import { changePassword } from "../../redux/user/userSlice";
const PasswordReset: FC = () => {

    const dispatch: AppDispatch = useAppDispatch()

    const [newPassword, setNewPassword] = useState<IResetPassword>({
        oldPassword: "",
        password: "",
        confirmPassword: "",
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name
        console.log(newPassword)
        setNewPassword(prev => ({
            ...prev,
            [name]: value
        }))
    };

    const resetPassword = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(changePassword(newPassword))
    }

    return (
        <div className="col-6">
            <p>Сбросить пароль</p>
            <div className="col-3 flex flex-column">
                <label htmlFor="oldPassword">Старый пароль</label>
                <InputText onChange={handleChange} name="oldPassword" id="oldPassword" className="field" />
            </div>
            <div className="col-3 flex flex-column">
                <label htmlFor="password">Новый пароль</label>
                <InputText onChange={handleChange} name="password" id="password" className="field" />
            </div>
            <div className="col-3 flex flex-column">
                <label htmlFor="confirmPassword">Повторите пароль</label>
                <InputText onChange={handleChange} name="confirmPassword" id="confirmPassword" className="field" />
            </div>
            <div className="col-3 flex flex-column text-center">
                <Button onClick={resetPassword} type="button" className="text-center block">
                    Изменить пароль
                </Button>
            </div>
        </div>
    );
};

export default PasswordReset;
