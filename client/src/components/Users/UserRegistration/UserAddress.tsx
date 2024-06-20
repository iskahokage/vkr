import React, {
    ChangeEvent,
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import Input from "../../Input/Input";
import { INewUser, IUserAddress } from "../../../types/user";
import { FunctionDeclaration } from "typescript";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { AppDispatch } from "../../../redux/store";
import { fetchCountries } from "../../../redux/ref/refSlice";
import { Toast } from "primereact/toast";

interface UserAddressArgs {
    address: IUserAddress;
    setUserData: Dispatch<SetStateAction<INewUser>>;
}

const UserAddress: FC<UserAddressArgs> = ({ address, setUserData }) => {


    const {countries} = useAppSelector(({refs}) => refs)
    const toast = useRef<Toast>(null)
    const dispatch: AppDispatch = useAppDispatch()
    useEffect(() => {
        if(countries.length === 0)
            dispatch(fetchCountries({toast}))
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | DropdownChangeEvent) => {
        setUserData((prev) => ({
            ...prev,
            legal_registered: {
                ...prev.legal_registered,
                [e.target.name]: e.target.value,
            },
        }));
    };
    return (
        <>
            <Toast ref={toast}/>
            <div className="col-12 flex-wrap flex lg:col-3 lg:flex-nowrap">
                <div className="col-12 flex flex-column">
                    <label htmlFor="role">Страна</label>
                    <Dropdown
                        filter
                        id="country"
                        onChange={handleChange}
                        value={address?.country}
                        options={countries}
                        optionLabel="name"
                        optionValue="id"
                        name="country"
                    />
                </div>
                <Input
                    value={address?.region}
                    id="region"
                    name="region"
                    label="Регион"
                    handleChange={handleChange}
                />
                <Input
                    value={address?.district}
                    id="district"
                    name="district"
                    label="Район"
                    handleChange={handleChange}
                />
                <Input
                    value={address?.city}
                    id="city"
                    name="city"
                    label="Город"
                    handleChange={handleChange}
                />
            </div>
            <div className="col-12 flex-wrap flex lg:col-3 lg:flex-nowrap">
                <Input
                    value={address?.street}
                    id="street"
                    name="street"
                    label="Улица"
                    handleChange={handleChange}
                />
                <Input
                    value={address?.house}
                    id="house"
                    name="house"
                    label="Дом"
                    handleChange={handleChange}
                />
                <Input
                    value={address?.room}
                    id="room"
                    name="room"
                    label="Квартира"
                    handleChange={handleChange}
                />
                <Input
                    value={address?.postcode}
                    id="postcode"
                    name="postcode"
                    label="Почтовый индекс"
                    handleChange={handleChange}
                />
            </div>
        </>
    );
};

export default UserAddress;
