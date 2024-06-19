import React, { ChangeEvent, FC, MouseEvent, useRef, useState } from "react";
import Input from "../Input/Input";
import { Card } from "primereact/card";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AppDispatch } from "../../redux/store";
import { fetchUserGRS } from "../../redux/user/userSlice";
import { IGRSResponse, INewUser, IUser } from "../../types/user";
import { roleOptions } from "../../helpers";
import { ProgressSpinner } from "primereact/progressspinner";
import UserAddress from "./UserAddress";
import { createUser as postUser } from "../../redux/user/userSlice";
import { Toast } from "primereact/toast";

const UserRegistration: FC = () => {
    const toast = useRef<Toast>(null);
    const { spin } = useAppSelector(({ user }) => user);
    const [userData, setUserData] = useState<INewUser>({
        email: "",
        name: "",
        surname: "",
        patronymic: "",
        password: "",
        avatar: "",
        phone: "",
        telegram_id: "",
        active: false,
        role: "",
        tin: "",
        address: "",
        legal_registered: {
            country: "",
            region: "",
            district: "",
            city: "",
            locality: "",
            street: "",
            house: "",
            room: "",
            postcode: "",
            mailbox_number: "",
        },
    });
    const dispatch: AppDispatch = useAppDispatch();

    const onClick = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("pin", userData.tin.trim());

        const { payload } = await dispatch(fetchUserGRS(formData));
        const response: IGRSResponse = payload.data;
        setUserData((prev) => ({
            ...prev,
            name: response.first_name,
            surname: response.last_name,
            email: response.email,
            address: response.address,
            legal_registered: {
                ...prev.legal_registered,
                ...response.legal_registered,
            },
        }));
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement> | DropdownChangeEvent
    ) => {
        setUserData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const createUser = (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(postUser({ userData, toast }));
    };

    return (
        <>
            <Toast ref={toast} />
            <form onSubmit={createUser} className="col-12 flex flex-column">
                <div className="col-12 flex-wrap flex lg:col-3 lg:flex-nowrap">
                    <div className="flex grid col-12">
                        <div className="col-10 p-0">
                            <Input
                                value={userData.tin}
                                id="tin"
                                name="tin"
                                label="ИНН"
                                handleChange={handleChange}
                            />
                        </div>
                        <div className="col-2 flex align-items-center p-0">
                            <Button
                                icon={
                                    spin ? (
                                        <ProgressSpinner
                                            style={{
                                                width: "14px",
                                                height: "14px",
                                            }}
                                            strokeWidth="8"
                                            fill="var(--surface-ground)"
                                            animationDuration=".5s"
                                        />
                                    ) : (
                                        "pi pi-search"
                                    )
                                }
                                style={{
                                    marginTop: "2px",
                                }}
                                disabled={userData.tin.trim().length < 14}
                                onClick={onClick}
                            />
                        </div>
                    </div>
                    <Input
                        value={userData.name}
                        id="name"
                        name="name"
                        label="Имя"
                        handleChange={handleChange}
                    />
                    <Input
                        value={userData.surname}
                        id="surname"
                        name="surname"
                        label="Фамилия"
                        handleChange={handleChange}
                    />
                    <Input
                        value={userData?.patronymic}
                        id="patronymic"
                        name="patronymic"
                        label="Отчество"
                        handleChange={handleChange}
                    />
                </div>
                <div className="col-12 flex-wrap flex lg:col-3 lg:flex-nowrap">
                    <Input
                        value={userData.email}
                        id="email"
                        name="email"
                        label="e-mail"
                        handleChange={handleChange}
                    />
                    <Input
                        value={userData.phone}
                        id="phone"
                        name="phone"
                        label="Номер телефона"
                        handleChange={handleChange}
                    />
                    <Input
                        value={userData.address}
                        id="address"
                        name="address"
                        label="Адрес"
                        handleChange={handleChange}
                    />
                    <Input
                        value={userData.telegram_id}
                        id="telegram_id"
                        name="telegram_id"
                        label="Телеграм"
                        handleChange={handleChange}
                    />
                </div>
                <div className="col-12 flex-wrap flex lg:col-3 lg:flex-nowrap">
                    <Input
                        value={userData.password}
                        id="password"
                        name="password"
                        label="Пароль"
                        handleChange={handleChange}
                    />
                    <div className="col-12 flex flex-column">
                        <label htmlFor="role">Роль</label>
                        <Dropdown
                            id="role"
                            onChange={handleChange}
                            value={userData.role}
                            options={roleOptions}
                            optionLabel="label"
                            optionValue="key"
                            name="role"
                        />
                    </div>
                </div>
                <Accordion activeIndex={0}>
                    <AccordionTab header="Адресные данные">
                        <UserAddress
                            address={userData.legal_registered}
                            setUserData={setUserData}
                        />
                    </AccordionTab>
                </Accordion>
                <Button
                    className="mt-2"
                    label="Создать пользователя"
                    type="submit"
                />
            </form>
        </>
    );
};

export default UserRegistration;
