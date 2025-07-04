import { IUser, UserLegalRegisteredModel, UserModel } from "../../db/models/userModel";
import ErrorService from "../../helpers/errorService";
import { compare, hash } from "bcryptjs";
import TokenService from "../../helpers/tokenService";
import { isUserExist } from "../user/userService";
// import ErrorService from "./helpers/errorService.js";
// import TokenService from "./helpers/tokenService.js";

const authService = {
    register: async ({
        email,
        name,
        surname,
        phone,
        patronymic = "",
        password,
        address,
        tin,
        legal_registered,
    }: IUser) => {
        const oldUser = await UserModel.findOne({ where: { email } });
        const oldUserTIN = await UserModel.findOne({ where: { tin } });
        if (oldUser) {
            throw ErrorService.BadRequest(
                "User with this email already registered!"
            );
        }
        if (oldUserTIN) {
            throw ErrorService.BadRequest(
                "User with this INN already registered!"
            );
        }
        const hashedPassword: string = await hash(password, 3);

        const newUser = await UserModel.create({
            email,
            password: hashedPassword,
            phone,
            name,
            surname,
            patronymic,
            address,
            tin,
        });

        await UserLegalRegisteredModel.create({
            userId: newUser.id, 
            country: legal_registered.country,
            region: legal_registered.region,
            district: legal_registered.district,
            city: legal_registered.city,
            street: legal_registered.street,
            house: legal_registered.house,
            room: legal_registered.room,
            postcode: legal_registered.postcode,
            mailbox_number: legal_registered.mailbox_number,
            resident_area: legal_registered.resident_area,
        })
        return newUser;
    },
    login: async (email: string, password: string) => {
        const user = await UserModel.findOne({ where: { email } });

        if (!user) {
            throw ErrorService.BadRequest("Wrong email or password");
        }

        if(!user.active) {
            throw ErrorService.ForbiddenError("Вы заблокированы");
        }

        const comparedPassword = await compare(password, user.password);
        if (!comparedPassword) {
            throw ErrorService.BadRequest("Wrong email or password");
        }
        const tokens = TokenService.generateTokens({
            id: user.id,
            email,
            role: user.role,
        });
        const { name, surname, phone, telegram_id, avatar, patronymic, role } =
            user;
        return {
            refreshToken: tokens.refreshToken,
            user: {
                accessToken: tokens.accessToken,
                name,
                surname,
                phone,
                telegram_id,
                avatar,
                patronymic,
                email,
                role,
            },
        };
    },

    refreshUser: async (id: string) => {
        const user = await UserModel.findOne({ where: { id } });
        console.log(user)
        if (user) {
            const {
                name,
                email,
                surname,
                phone,
                telegram_id,
                avatar,
                patronymic,
                role,
            } = user;
            const tokens = TokenService.generateTokens({
                id: user.id,
                email: user.email,
                role: user.role
            });

            return {
                refreshToken: tokens.refreshToken,
                user: {
                    accessToken: tokens.accessToken,
                    name,
                    surname,
                    phone,
                    telegram_id,
                    avatar,
                    patronymic,
                    email,
                    role,
                },
            };
        }
    },

    changePassword: async (
        oldPassword: string,
        password: string,
        confirmPassword: string,
        id: string
    ) => {
        const user = await isUserExist(id);
        const comparedPassword = await compare(oldPassword, user.password);
        if (!comparedPassword) {
            throw ErrorService.BadRequest("Старый пароль введен неверно");
        }
        if (password !== confirmPassword) {
            throw ErrorService.BadRequest("Пароли не совпадают");
        }
        const hashedPassword: string = await hash(password, 3);
        await user.update({ password: hashedPassword }, { where: { id } });
        await user.save();
        return user;
    },
};

export default authService;
