import { IUser, UserModel } from "../../db/models/userModel";
import ErrorService from "../../helpers/errorService";
import { compare, hash } from "bcrypt";
import TokenService from "../../helpers/tokenService";
// import ErrorService from "./helpers/errorService.js";
// import TokenService from "./helpers/tokenService.js";

const authService = {
    register: async ({ email, name, surname, phone, patronymic = "", password }: IUser) => {
        const oldUser = await UserModel.findOne({ where: { email } });
        if (oldUser) {
            throw ErrorService.BadRequest("User with this email already registered!");
        }
        const hashedPassword: string = await hash(password, 3);

        const newUser = await UserModel.create({ email, password: hashedPassword, phone, name, surname, patronymic });
        return newUser;
    },
    login: async (email: string, password: string) => {
        const user = await UserModel.findOne({ where: { email } });

        if (!user) {
            throw ErrorService.BadRequest("Wrong email or password");
        }

        const comparedPassword = await compare(password, user.password);
        if (!comparedPassword) {
            throw ErrorService.BadRequest("Wrong email or password");
        }
        const tokens = TokenService.generateTokens({
            id: user.id,
            email,
        });
        const { name, surname, phone, telegram_id, avatar, patronymic, role } = user;
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
                role
            },
        };
    },

    refreshUser: async (id: string) => {
        const user = await UserModel.findOne({ where: { id } });

        if (user) {
            const { name, email, surname, phone, telegram_id, avatar, patronymic, role } = user;
            const tokens = TokenService.generateTokens({
                id: user.id,
                email: user.email,
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
                    role
                },
            };
        }
    },
};

export default authService;
