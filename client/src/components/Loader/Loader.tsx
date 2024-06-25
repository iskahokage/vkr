import { ProgressSpinner } from "primereact/progressspinner";
import React, { FC } from "react";

const Loader: FC = () => {
    return (
        <div className="flex justify-content-center">
            <div>
                <ProgressSpinner
                    className="w-10rem h-10rem mx-auto"
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration=".5s"
                />
                <h1>Загрузка</h1>
            </div>
        </div>
    );
};

export default Loader;
