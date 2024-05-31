import React from 'react';
import {MegaMenu} from 'primereact/megamenu'
const Header = () => {
    const items = [
        {
            label: 'Company',
            root: true,
        },
        {
            label: 'Resources',
            root: true,
        },
        {
            label: 'Contact',
            root: true,
        }
    ];

    const start = <p className='font-bold text-2xl'>
        ВКР КНУ
    </p>

    // const end = <img src="" alt="" />

    return (
        <>
            <MegaMenu model={items} start={start} orientation="horizontal" breakpoint="960px" className="h-5rem p-3  m-3 surface-0 shadow-2" style={{ borderRadius: '3rem' }} />
        </>
    );
};

export default Header;