import { Card } from "primereact/card";
import React, { FC } from "react";

const Home: FC = () => {
    return (
        <div className="w-10 mx-auto">
            <Card title="Аннотация">
                <p className="sm:text-lg md:text-md">
                    В данной работе автор провел исследование по теме «Разработка информационных систем в рамках
                    цифровизации в государственных органах». Цель исследования - изучить особенности современных
                    технологий программирования и разработать информационную систему на языке Typescript с
                    использованием Docker, Redis и PostgreSQL для улучшения эффективности и прозрачности работы
                    государственных органов. В процессе исследования были рассмотрены текущие тенденции цифровизации,
                    требования к информационным системам для государственных учреждений и основные принципы их
                    разработки и внедрения. Итогом работы стало создание прототипа информационной системы, который был
                    протестирован и показал высокую производительность и надежность в рамках поставленных задач.
                </p>
                <p className="sm:text-lg md:text-md">
                    Бул иште автор «Мамлекеттик органдарды санариптештирүүнүн алкагында маалыматтык системаларды иштеп
                    чыгуу» деген темада изилдөө жүргүзгөн. Изилдөөнүн максаты - заманбап программалоо технологияларынын
                    өзгөчөлүктөрүн изилдеп, мамлекеттик органдардын ишинин натыйжалуулугун жана ачыктыгын жогорулатуу
                    үчүн Typescript тилинде Docker, Redis жана PostgreSQL колдонуу менен маалыматтык системаны иштеп
                    чыгуу. Изилдөө процессинде санариптештирүүнүн учурдагы тенденциялары, мамлекеттик мекемелер үчүн
                    маалыматтык системаларга коюлган талаптар жана алардын иштеп чыгуу жана киргизүү негизги принциптери
                    каралды. Иштин жыйынтыгында коюлган милдеттердин алкагында жогорку өндүрүмдүүлүктү жана
                    ишенимдүүлүктү көрсөткөн маалыматтык системанын прототиби түзүлүп, сыноодон өткөрүлдү.
                </p>
            </Card>
        </div>
    );
};

export default Home;
