import { Card } from 'primereact/card';
import React, { FC } from 'react';
import UserRegistration from '../../components/UserRegistration/UserRegistration';
import UserAddress from '../../components/UserRegistration/UserAddress';
import { Accordion, AccordionTab } from 'primereact/accordion';

const NewUser: FC = () => {
    return (
        <div className="w-10 mx-auto">
            <Card title="Регистрация нового пользователя">
                <UserRegistration/>
            </Card>
        </div>
    );
};

export default NewUser;