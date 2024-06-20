import { Card } from 'primereact/card';
import React, { FC } from 'react';
import UserRegistration from '../../../components/Users/UserRegistration/UserRegistration';
import { useParams } from 'react-router-dom';

const NewUser: FC = () => {
    const {id} = useParams();
    return (
        <div className="w-10 mx-auto">
            <Card title={id ? "Изменение данных пользователя" : "Регистрация нового пользователя"}>
                <UserRegistration/>
            </Card>
        </div>
    );
};

export default NewUser;