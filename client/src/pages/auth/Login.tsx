import React, { ChangeEvent, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { login, setUser } from "../../redux/auth/authSlice";
import { IUser, IUserCredentials } from "../../types/user";
import { useAppDispatch } from "../../redux/hooks";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [userCredentials, setUserCredentials] = useState<IUserCredentials>({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const action = await dispatch(login(userCredentials));

        if (login.fulfilled.match(action)) {
            const payload = action.payload as IUser;
            dispatch(setUser({ user: payload }))
            navigate("/");
        } else {
            // Обработка ошибок
            console.error("Login failed", action.payload);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserCredentials((prev) => {
            return {    
                ...prev,
                [name]: value,
            };
        });
    };

    return (
        <div className="w-4 mx-auto flex flex-column justify-content-center h-screen ">
            <Card title="Авторизация">
                <form onSubmit={handleSubmit} className="formgrid grid w-25rem mx-auto gap-3">
                    <div className="col-12 flex flex-column">
                        <label htmlFor="email">e-mail</label>
                        <InputText onChange={handleChange} name="email" id="email" className="field" />
                    </div>
                    <div className="col-12 flex flex-column field">
                        <label htmlFor="password">Пароль</label>
                        <IconField iconPosition="right">
                            <InputIcon
                                className={`${isPasswordVisible ? "pi pi-eye" : "pi pi-eye-slash"} cursor-pointer`}
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                {" "}
                            </InputIcon>
                            <InputText
                                onChange={handleChange}
                                name="password"
                                id="password"
                                className="w-full"
                                type={isPasswordVisible ? "text" : "password"}
                            />
                        </IconField>
                    </div>
                    <div className="col-12 flex flex-column text-center">
                        <Button type="submit" className="text-center block">
                            Войти
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Login;
