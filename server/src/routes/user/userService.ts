import path from "path";
import {
    IUser,
    IUserAddress,
    UserLegalRegisteredModel,
    UserModel,
} from "../../db/models/userModel";
import ErrorService from "../../helpers/errorService";
import { unlink } from "fs/promises";
import redisClient, { getOrSetCache, setCache } from "../../db/redis";
import axios from "axios";
import { hash } from "bcryptjs";

export const isUserExist = async (id: string) => {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) {
        throw ErrorService.BadRequest("Такого пользователя нет");
    }
    return user;
};

const userService = {
    uploadAvatar: async (id: string, avatar: string) => {
        const user = await isUserExist(id);
        if (!avatar) {
            throw ErrorService.BadRequest("Аватар не выбран");
        }
        if (user.avatar) {
            const directoryPath = path.resolve(
                __dirname,
                "../../../",
                "assets/userAvatars"
            );
            const user = await UserModel.findOne({ where: { id } });
            const oldAvatar = user?.avatar;
            const filePath = path.join(directoryPath, oldAvatar as string);
            await unlink(filePath);
            await UserModel.update({ avatar }, { where: { id } });
        } else {
            await UserModel.update({ avatar }, { where: { id } });
        }
        return avatar;
    },
    updateUser: async (id: string, userObj: IUser) => {
        const user = await isUserExist(id);
        const {
            password,
            email,
            address,
            legal_registered,
            name,
            phone,
            surname,
            tin,
            active,
            avatar,
            patronymic,
            role,
            telegram_id,
        } = userObj;

        const hashedPassword: string = password ? await hash(password, 3) : "";
        const {
            city,
            country,
            district,
            locality,
            region,
            userId,
            house,
            mailbox_number,
            postcode,
            room,
            street,
            resident_area
        } = legal_registered;
        await UserModel.update(
            {
                password: password ? hashedPassword : user.password,
                email: email ?? user.email,
                address: address ?? user.address,
                name: name ?? user.name,
                phone: phone ?? user.phone,
                surname: surname ?? user.surname,
                tin: tin ?? user.tin,
                active: active ?? user.active,
                avatar: avatar ?? user.avatar,
                patronymic: patronymic ?? user.patronymic,
                role: role ?? user.role,
                telegram_id: telegram_id ?? user.telegram_id,
            },
            { where: { id } }
        );
        
        const foundUser = await UserModel.findOne({
                where: { id },
                attributes: { exclude: ["password"] },
                include: {
                    model: UserLegalRegisteredModel,
                    where: { userId: id },
                    required: false,
                },
            });

        const oldAddress = await UserLegalRegisteredModel.findOne({
            where: { userId: id },
        });
        if (!oldAddress) {
            await userService.createLegalRegistered(legal_registered, user.id);
        } else {
            console.log(resident_area)
            await UserLegalRegisteredModel.update(
                {
                    city: city ?? oldAddress?.city,
                    country: country ?? oldAddress?.country,
                    district: district ?? oldAddress?.district,
                    locality: locality ?? oldAddress?.locality,
                    region: region ?? oldAddress?.region,
                    userId: userId ?? oldAddress?.userId,
                    house: house ?? oldAddress?.house,
                    mailbox_number:
                        mailbox_number ?? oldAddress?.mailbox_number,
                    postcode: postcode ?? oldAddress?.postcode,
                    room: room ?? oldAddress?.room,
                    street: street ?? oldAddress?.street,
                    resident_area: resident_area ?? oldAddress.resident_area,
                },
                { where: { userId: id } }
            );
        }
        return foundUser;
    },
    createLegalRegistered: async (
        legal_registered: IUserAddress,
        id: number
    ) => {
        await UserLegalRegisteredModel.create({
            userId: id,
            city: legal_registered?.city,
            country: legal_registered?.country,
            district: legal_registered?.district,
            locality: legal_registered?.locality,
            region: legal_registered?.region,
            house: legal_registered?.house,
            mailbox_number: legal_registered?.mailbox_number,
            postcode: legal_registered?.postcode,
            room: legal_registered?.room,
            street: legal_registered?.street,
            resident_area: legal_registered?.resident_area,
        });
    },
    getAll: async () => {
        const result = await UserModel.findAll();
        return result;
        // const users = await getOrSetCache(`users`, async() => {
        // })
        // return users
    },
    getOne: async (id: string) => {
        const foundUser = await UserModel.findOne({
            where: { id },
            attributes: { exclude: ["password"] },
            include: {
                model: UserLegalRegisteredModel,
                where: { userId: id },
                required: false,
            },
        });
        return foundUser?.dataValues;
        // const user = await getOrSetCache(`user:${id}`, async () => {
          
        // });
        // return user;
    },
    getRandomUser: async () => {
        const count = await UserModel.count();
        const random = Math.floor(Math.random() * count) + 1;
        const result = await userService.getOne(String(random));
        return result;
    },
    fetchGRS: async (pin: string) => {
        const user = await UserModel.findOne({ where: { tin: pin } });
        if (user) {
            throw ErrorService.BadRequest(
                "Пользователь с таким ИНН уже есть в системе"
            );
        }
        const formData = new FormData();
        formData.append("pin", pin);
        const { data } = await axios.post(
            "https://swis2.trade.kg/ru/api/v1/user/info",
            formData,
            {
                headers: {
                    token: process.env.GRS_TOKEN,
                },
            }
        );
        return data;
    },
    activity: async (id: string) => {
        const user = await isUserExist(id);
        user.active = !user.active;
        await user.save();
        return user;
    },
};

export default userService;
