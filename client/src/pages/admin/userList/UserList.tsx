import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { AppDispatch } from '../../../redux/store';
import { changeUserActivity, fetchUserList } from '../../../redux/user/userSlice';
import { Toast } from 'primereact/toast';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { IUser } from '../../../types/user';
import { NavLink } from 'react-router-dom';
import { Button } from 'primereact/button';
import Loader from '../../../components/Loader/Loader';
import { FilterMatchMode } from 'primereact/api';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

const UserList: FC = () => {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const {userList, spin} = useAppSelector(({user}) => user)
    const toast = useRef<Toast>(null);
    const dispatch: AppDispatch = useAppDispatch()

    useEffect(() => {
        if(userList.length === 0){
            dispatch(fetchUserList({toast}))
        }
    }, [dispatch])


    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const renderHeader = () => {
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
            </div>
        );
    };

    const checkbox = (rowData: IUser) => {

        const activeHandler = (e: CheckboxChangeEvent) => {
            dispatch(changeUserActivity({toast, id: rowData.id as number}))
        }

// task: Сделать роут для деактивации        

        return <Checkbox onChange={activeHandler} checked={rowData.active as boolean}/>
    }

    const actions = (rowData: IUser) => {
        return (
            <>
                <NavLink to={'../user/' + rowData.id}>
                    <Button icon='pi pi-pencil'/>
                </NavLink>
            </>
        )
    }
    if(spin){
        return <Loader/>
    }
    return (
        <div className='w-10 mx-auto'>
            <Toast ref={toast}/>
            <Card title='Список пользователей'>
                <DataTable value={userList} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} 
                    header={renderHeader} 
                    filters={filters}>
                <Column field='tin' header='ИНН'/>
                <Column field='surname' header='Фамилия'/>
                <Column field='name' header='Имя'/>
                <Column field='phone' header='Телефон'/>
                <Column field='address' header='Адрес'/>
                <Column field='active' header='Активность' body={checkbox} align={'center'}/>
                <Column body={actions}/>
                </DataTable>
            </Card>
        </div>
    );
};

export default UserList;