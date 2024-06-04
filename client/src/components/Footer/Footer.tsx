import React from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';

const Footer = () => {
    return (
        <div className='relative bottom-0 w-full flex flex-column justify-content-center align-items-center py-3 px-1 text-sm surface-ground' style={{minHeight: '150px'}}>
            <p className='text-center'>Кыргызский Национальный Университет <br /> им. Ж. Баласагына</p>
            <div className='footer flex gap-3 flex-wrap justify-content-center'>
                <p>&copy; 2024. Все права защищены.</p>
            </div>
        </div>
    );
};

export default Footer;