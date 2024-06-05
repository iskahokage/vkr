import React, { ChangeEvent, FC, MouseEvent, useState } from "react";
import Input from "../Input/Input";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useAppDispatch } from "../../redux/hooks";
import { AppDispatch } from "../../redux/store";
import { fetchUserGRS } from "../../redux/user/userSlice";

const UserRegistration: FC = () => {

    const [TIN, setTIN] = useState<{pin: string}>({pin: ''})
    const disatch:AppDispatch = useAppDispatch();



    const onSubmit = (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set("pin", TIN.pin)

        disatch(fetchUserGRS(formData))
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTIN(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="w-10 mx-auto">
            <Card title="Регистрация нового пользователя">
                <form onSubmit={onSubmit} className="col-4">
                    <Input id="pin" name="pin" label="ИНН" handleChange={handleChange} />
                    <Button type="submit">Поиск</Button>
                </form>
            </Card>
        </div>
    );
};

export default UserRegistration;
