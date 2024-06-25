import { Dialog } from "primereact/dialog";
import {
    ChangeEvent,
    FC,
    MouseEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AppDispatch } from "../../redux/store";
import { createLoan, setPopup, updateLoan } from "../../redux/loan/loanSlice";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { IUser } from "../../types/user";
import { fetchUserList } from "../../redux/user/userSlice";
import { Toast } from "primereact/toast";
import { ILoan } from "../../types/loan";
import { baseUrl } from "../../helpers/interceptor";
import Input from "../Input/Input";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { NO_AVATAR } from "../../helpers";

interface ILoanProps {
    loan: any;
}

const LoanEditor: FC<ILoanProps> = ({ loan }) => {
    const { popup } = useAppSelector(({ loan }) => loan);
    const { userList } = useAppSelector(({ user }) => user);
    const toast = useRef<Toast>(null);

    const dispatch: AppDispatch = useAppDispatch();

    const emptyLoan = {
        id: "",
        userId: "",
        loanDate: new Date().toISOString(),
        tool: "",
        serialNumber: "",
        returnDate: null,
    };

    const [newLoan, setNewLoan] = useState<ILoan>(emptyLoan);

    useEffect(() => {
        if (userList.length === 0) {
            dispatch(fetchUserList({ toast }));
        }
        if (loan?.id) {
            setNewLoan({ ...loan });
        }
    }, [dispatch, loan, newLoan?.id]);

    const countryOptionTemplate = (option: IUser) => {
        return (
            <div className="flex align-items-center">
               {option.avatar ? (
                        <img
                            src={baseUrl + "/user/avatar/" + option.avatar}
                            className={`mr-2 flag`}
                            style={{ width: "18px" }}
                        />
                    ) : (
                        <img
                            src={NO_AVATAR}
                            className={`mr-2 flag`}
                            style={{ width: "18px" }}
                        />
                    )}
                <div>
                    {option.name} {option.surname}
                </div>
            </div>
        );
    };
    const selectedCountryTemplate = (option: IUser, props: any) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    {option.avatar ? (
                        <img
                            src={baseUrl + "/user/avatar/" + option.avatar}
                            className={`mr-2 flag`}
                            style={{ width: "18px" }}
                        />
                    ) : (
                        <img
                            src={NO_AVATAR}
                            className={`mr-2 flag`}
                            style={{ width: "18px" }}
                        />
                    )}

                    <div>
                        {option.name} {option.surname}
                    </div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement> | DropdownChangeEvent
    ) => {
        setNewLoan((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (newLoan.id) {
            dispatch(updateLoan({ toast, id: newLoan.id, body: newLoan }));
        } else {
            dispatch(createLoan({ toast, body: newLoan }));
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <Dialog
                className="w-10"
                header={`${newLoan.id ? "Изменение" : "Создание"}   служебки`}
                visible={popup}
                onHide={() => {
                    dispatch(setPopup(false));
                    setNewLoan(emptyLoan);
                }}
            >
                <div className="col-12 flex-wrap flex lg:col-3 lg:flex-nowrap">
                    <div className="col-12 flex flex-column">
                        <label htmlFor="role">Пользователь</label>
                        <Dropdown
                            value={newLoan.userId}
                            options={userList}
                            itemTemplate={countryOptionTemplate}
                            valueTemplate={selectedCountryTemplate}
                            optionValue="id"
                            optionLabel="name"
                            placeholder="Выберите пользователя"
                            onChange={handleChange}
                            name="userId"
                            filter
                        />
                    </div>
                    <Input
                        value={newLoan?.tool}
                        id="tool"
                        name="tool"
                        label="Предмет"
                        handleChange={handleChange}
                    />
                    <Input
                        value={newLoan?.serialNumber}
                        id="serialNumber"
                        name="serialNumber"
                        label="Серийный номер"
                        handleChange={handleChange}
                    />
                    <div className="col-12 flex flex-column">
                        <label htmlFor="role">Дата выдачи</label>
                        <Calendar
                            onChange={handleChange}
                            name="loanDate"
                            value={new Date(newLoan.loanDate)}
                        />
                    </div>
                </div>

                <div className="col-12 flex-wrap flex lg:col-3 lg:flex-nowrap">
                    <div className="col-12 flex flex-column">
                        <label htmlFor="role">Дата возврата</label>
                        <Calendar
                            onChange={handleChange}
                            name="returnDate"
                            value={
                                newLoan.returnDate
                                    ? new Date(newLoan.returnDate as string)
                                    : null
                            }
                        />
                    </div>
                </div>
                <Button
                    className="mt-2"
                    label={
                        newLoan.id ? "Изменить служебку" : "Создать служебку"
                    }
                    type="button"
                    onClick={handleClick}
                />
            </Dialog>
        </>
    );
};

export default LoanEditor;
