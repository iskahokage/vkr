import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { FC, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { AppDispatch } from '../../../redux/store';
import { fetchUserList } from '../../../redux/user/userSlice';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import { IUser } from '../../../types/user';
import { NavLink } from 'react-router-dom';
import { Button } from 'primereact/button';

const UserList: FC = () => {

    const {userList} = useAppSelector(({user}) => user)
    const toast = useRef<Toast>(null);
    const dispatch: AppDispatch = useAppDispatch()

    useEffect(() => {
        if(userList.length === 0){
            dispatch(fetchUserList({toast}))
        }
    }, [])

    const checkbox = (rowData: IUser) => {

// task: Сделать роут для деактивации        

        return <Checkbox checked={rowData.active as boolean}/>
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

    return (
        <div className='w-10 mx-auto'>
            <Toast ref={toast}/>
            <Card title='Список пользователей'>
                <DataTable value={userList} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}>
                <Column field='tin' header='ИНН'/>
                <Column field='surname' header='Фамилия'/>
                <Column field='name' header='Имя'/>
                <Column field='phone' header='Телефон'/>
                <Column field='address' header='Адрес'/>
                <Column field='active' body={checkbox}/>
                <Column body={actions}/>
                </DataTable>
            </Card>
        </div>
    );
};

export default UserList;