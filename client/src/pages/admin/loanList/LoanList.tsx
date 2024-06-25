import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { AppDispatch } from "../../../redux/store";
import {
    fetchLoans,
    fetchLoansByUsedId,
    setPopup,
} from "../../../redux/loan/loanSlice";
import { Toast } from "primereact/toast";
import Loader from "../../../components/Loader/Loader";
import { Card } from "primereact/card";
import { ILoan } from "../../../types/loan";
import { FilterMatchMode } from "primereact/api";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import LoanEditor from "../../../components/LoanEditor/LoanEditor";
import { formatDateToMMDDYYYY } from "../../../helpers";
import { useLocation } from "react-router-dom";

const LoanList: FC = () => {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [selectedLoan, setSelectedLoan] = useState<any>();

    const toast = useRef<Toast>(null);
    const { loans, spin } = useAppSelector(({ loan }) => loan);
    const { user } = useAppSelector(({ auth }) => auth);
    const { pathname } = useLocation();
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        const isUser = pathname.split("/").includes("user");
        if (!isUser) {
            dispatch(fetchLoans({ toast }));
        } else if (isUser) {
            dispatch(fetchLoansByUsedId({ toast }));
        }
    }, [dispatch, pathname]);

    if (spin) {
        return <Loader />;
    }

    const representativeBodyTemplate = (rowData: ILoan) => {
        return (
            <div className="flex align-items-center gap-2">
                <span className="font-bold">{rowData?.tool}</span>
            </div>
        );
    };
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        if (user?.role === "admin") {
            return (
                <div className="grid formgrid justify-content-end">
                    <div className="md:pr-3">
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-search" />
                            <InputText
                                value={globalFilterValue}
                                onChange={onGlobalFilterChange}
                                placeholder="Поиск"
                            />
                        </IconField>
                    </div>
                    <div>
                        <Button
                            onClick={() => dispatch(setPopup(true))}
                            label="Новая служебка"
                            icon={"pi pi-plus"}
                            iconPos="right"
                            severity="success"
                        />
                    </div>
                </div>
            );
        }
        else {
            return (<></>)
        }
    };
    const actions = (rowData: ILoan) => {
        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    onClick={() => {
                        dispatch(setPopup(true));
                        setSelectedLoan(rowData);
                    }}
                />
            </>
        );
    };
    const DateCell = (rowData: ILoan) => {
        return <span>{formatDateToMMDDYYYY(new Date(rowData.loanDate))}</span>;
    };
    const ReturnDateCell = (rowData: ILoan) => {
        if (rowData.returnDate) {
            return (
                <span>
                    {formatDateToMMDDYYYY(
                        new Date(rowData?.returnDate as string)
                    )}
                </span>
            );
        }
    };
    return (
        <div className="w-10 mx-auto">
            <LoanEditor loan={selectedLoan} />
            <Toast ref={toast} />
            <Card title="Список служебных займов">
                <DataTable
                    filters={filters}
                    value={loans}
                    header={renderHeader}
                    rowGroupMode="rowspan"
                    groupRowsBy="tool"
                    sortMode="single"
                    sortField="tool"
                    sortOrder={1}
                >
                    <Column
                        field="tool"
                        header="Предмет"
                        body={representativeBodyTemplate}
                        className="w-14rem"
                    ></Column>
                    <Column field="user.name" header="Имя" />
                    <Column field="user.surname" header="Фамилия" />
                    <Column
                        field="serialNumber"
                        header="Серийный Номер"
                    ></Column>
                    <Column
                        field="loanDate"
                        header={"Дата служебного займа"}
                        body={DateCell}
                        align={"center"}
                    />
                    <Column
                        field="returnDate"
                        header={"Дата возврата"}
                        body={ReturnDateCell}
                        align={"center"}
                    />
                    {user?.role === "admin" ? (
                        <Column
                            body={actions}
                            header={"Изменить"}
                            align={"center"}
                        />
                    ) : (
                        <></>
                    )}
                </DataTable>
            </Card>
        </div>
    );
};

export default LoanList;
