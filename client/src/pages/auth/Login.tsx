import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { login, setUser } from "../../redux/auth/authSlice";
import { IUser, IUserCredentials } from "../../types/user";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AppDispatch } from "../../redux/store";
import { Navigate, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

const Login = () => {
    const toast = useRef<Toast>(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [userCredentials, setUserCredentials] = useState<IUserCredentials>({
        email: "",
        password: "",
    });
    const {user} = useAppSelector(state => state.auth)

    
    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        if(user){
            navigate('/')
        }
    }, [])
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const action = await dispatch(login({credentials: userCredentials, toast}));
        const payload = action.payload as IUser;
        if (payload) {
            dispatch(setUser({ user: payload }));
            navigate("/");
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
        user ? <></> : <div className="w-4 mx-auto flex flex-column justify-content-center h-screen ">
            <Toast ref={toast}/>
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
