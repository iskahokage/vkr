import React from 'react';
import {MegaMenu} from 'primereact/megamenu'
const Header = () => {
    const items = [
        {
            label: 'Company',
            root: true,
            items: [
                [
                    {
                        items: [
                            { label: 'Features', icon: 'pi pi-list', subtext: 'Subtext of item' },
                            { label: 'Customers', icon: 'pi pi-users', subtext: 'Subtext of item' },
                            { label: 'Case Studies', icon: 'pi pi-file', subtext: 'Subtext of item' }
                        ]
                    }
                ],
                [
                    {
                        items: [
                            { label: 'Solutions', icon: 'pi pi-shield', subtext: 'Subtext of item' },
                            { label: 'Faq', icon: 'pi pi-question', subtext: 'Subtext of item' },
                            { label: 'Library', icon: 'pi pi-search', subtext: 'Subtext of item' }
                        ]
                    }
                ],
                [
                    {
                        items: [
                            { label: 'Community', icon: 'pi pi-comments', subtext: 'Subtext of item' },
                            { label: 'Rewards', icon: 'pi pi-star', subtext: 'Subtext of item' },
                            { label: 'Investors', icon: 'pi pi-globe', subtext: 'Subtext of item' }
                        ]
                    }
                ],
                [
                    {
                        items: [{ image: 'https://primefaces.org/cdn/primereact/images/uikit/uikit-system.png', label: 'GET STARTED', subtext: 'Build spectacular apps in no time.' }]
                    }
                ]
            ]
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

    return (
        <>
            <MegaMenu model={items} orientation="horizontal" breakpoint="960px" className="p-3 surface-0 shadow-2" style={{ borderRadius: '3rem' }} />
        </>
    );
};

export default Header;