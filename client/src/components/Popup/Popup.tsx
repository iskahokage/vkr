import React, { FC, useRef } from 'react';
import { Toast } from 'primereact/toast';

interface IProps {
    message?: string;
}
const Popup: FC = ({message}: IProps) => {
    const toast = useRef<Toast>(null);
    const showSuccess = () => {
        console.log('asdasd')
        if(toast.current)
            toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
    }
    showSuccess()
    return (
        
        <div>
            asdasd + {message}
            <Toast ref={toast}>

            </Toast>
        </div>
    );
};

export default Popup;