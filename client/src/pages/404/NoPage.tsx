import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NoPage: FC = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(3)
    

    useEffect(() => {
        const timer = setInterval(function () {
            setCount(count - 1);
            if (count === 0) {
                clearInterval(timer); 
                navigate('/')
            }
        }, 1000);
    }, [count]);

    return (
        <div>
            <h1 className="text-center">STATUS 404 Страница не найдена</h1>
            <h3 className="text-center">Редирект на главную страницу через {count}</h3>
        </div>
    );
};

export default NoPage;
