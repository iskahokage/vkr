import { Card } from "primereact/card";
import React, { ChangeEvent, FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Avatar from "react-avatar-edit";
import { AppDispatch } from "../../redux/store";
import { patchAvatar } from "../../redux/user/userSlice";
import { setNewAvatar } from "../../redux/auth/authSlice";
import { base64ToFile } from "../../helpers";
import PasswordReset from "../../components/PasswordReset/PasswordReset";

const Profile: FC = () => {
    const { user } = useAppSelector(({ auth }) => auth);
    const dispatch: AppDispatch = useAppDispatch();

    const [avatar, setAvatar] = useState<{
        preview: string | null;
        src: string;
        file: any | null;
    }>({
        preview: "null",
        src: "",
        file: null,
    });


    

    const uploadAvatar = async () => {
        if (avatar.file) {
            const file = base64ToFile(avatar.preview as string, avatar.file?.name as string);
            const formData = new FormData();
            formData.set("avatar", file);
            const action = await dispatch(patchAvatar(formData));
            if (patchAvatar.fulfilled.match(action)) {
                const payload = action.payload as { avatar: string };
                dispatch(setNewAvatar(payload));
            } else {
                // Обработка ошибок
                console.error("Login failed", action.payload);
            }
        }
    };

    const onClose = () => {
        setAvatar((prev) => ({
            ...prev,
            preview: null,
        }));
    };

    const onCrop = (preview: string) => {
        setAvatar((prev) => ({
            ...prev,
            preview: preview,
        }));
    };

    const onBeforeFileLoad = (elem: ChangeEvent<HTMLInputElement>) => {
        if (elem.target.files) {
            if (elem.target.files[0].size > 1024 * 1024 * 4) {
                alert("File is too big!");
                elem.target.value = "";
            }
            if (elem.target.files) {
                setAvatar((prev) => ({
                    ...prev,
                    file: elem.target.files?.[0],
                }));
            }
        }
    };

    return (
        <div className="w-10 mx-auto">
            <Card title={`Профиль ${user?.surname} ${user?.name} ${user?.patronymic}`}>
                <div className="formgrid grid">
                    <div className="col-6">
                        <div className="mx-auto w-5 flex flex-column justify-content-center">
                            <p>Поменять аватар</p>
                            <div className="field">
                                <Avatar
                                    width={400}
                                    height={295}
                                    onCrop={onCrop}
                                    onClose={onClose}
                                    onBeforeFileLoad={onBeforeFileLoad}
                                    src={avatar.src}
                                />
                            </div>
                            <div className="col-6 mx-auto">
                                <Button type="button" onClick={uploadAvatar} className="text-center block w-full">
                                    Изменить аватар
                                </Button>
                            </div>
                        </div>
                    </div>
                    <PasswordReset/>
                </div>
            </Card>
        </div>
    );
};

export default Profile;
