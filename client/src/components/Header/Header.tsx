import React, { MouseEvent, useEffect, useRef } from "react";
import { MegaMenu } from "primereact/megamenu";
import { Avatar } from "primereact/avatar";
import { baseUrl } from "../../helpers/interceptor";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ContextMenu } from "primereact/contextmenu";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Menubar } from 'primereact/menubar';
const Header = () => {
    const navigate = useNavigate();
    const cm = useRef<ContextMenu>(null);
    const { user } = useAppSelector(({ auth }) => auth);
    const dispatch: AppDispatch = useAppDispatch();

    const logoutUser = () => {
        dispatch(logout());
        navigate("/");
    };

    const showCM = (e: MouseEvent<HTMLDivElement>) => {
        if (cm.current) {
            cm.current.show(e);
        }
    };

    const items = [
        {
            label: "Главная",
            // root: true,
            command: () => navigate("/"),
        },
        {
            label: "Добавление нового пользователя",
            // root: true,
            command: () => navigate("/new-user"),
        },
        {
            label: "Contact",
            // root: true,
            command: () => navigate("/login"),
        },
    ];
    const cmItems = [
        { label: "Личный Кабинет", icon: "pi pi-user", command: () => navigate("/profile") },
        { label: "Выйти", icon: "pi pi-sign-out", command: logoutUser },
    ];

    const start = <p className="font-bold text-2xl">ВКР КНУ</p>;

    const end = user ? (
        <Avatar image={baseUrl + "/user/avatar/" + user?.avatar} shape="circle" size="xlarge" className="mt-1" onClick={showCM} />
    ) : (
        <NavLink to={"/login"}>
            <Button type="submit" className="text-center block" rounded>
                Войти
            </Button>
        </NavLink>
    );

    return (
        <>
            <ContextMenu model={cmItems} ref={cm} breakpoint="767px" />
            <div>
                <Menubar
                    model={items}
                    start={start}
                    end={end}
                    className="h-5rem p-3  m-3 surface-0 shadow-2"
                    style={{ borderRadius: "3rem" }}
                />
            </div>
        </>
    );
};

export default Header;
