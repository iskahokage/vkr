import { IUser, UserModel } from "../db/models/userModel";
import ErrorService from "../helpers/errorService";
import bcrypt from "bcrypt";
// import ErrorService from "./helpers/errorService.js";
// import TokenService from "./helpers/tokenService.js";



const userService = {
    register: async ({email,name, surname, phone, patronymic='', password }: IUser) => {
        const oldUser = await UserModel.findOne({ where: { email } });
        if (oldUser) {
            throw ErrorService.BadRequest(
                "User with this email already registered!",
            );
        }
        const hashedPassword: string = await bcrypt.hash(password, 3);
        console.log(email,name, surname, phone, patronymic, hashedPassword)
        const newUSer = await UserModel.create({ email, password: hashedPassword, phone, name, surname, patronymic });
        return newUSer;
    },
    // login: async ({email, password, code}) => {
    //     if (code) {
    //         const client = await Booking.findOne({
    //             where: { code, active: true },
    //             include: [
    //                 {
    //                     model: Order,
    //                     where: { status: 'success' },
    //                 },
    //             ],
    //         });

    //         if(!client){
    //             throw ErrorService.BadRequest("Wrong code");
    //         }

    //         const tokens = TokenService.generateTokens({
    //             code,
    //             role: 'client'
    //         });
    //         return {
    //             refreshToken: tokens.refreshToken,
    //             client: {
    //                 accessToken: tokens.accessToken,
    //                 bookingId: client.id,
    //                 isClient: true,
    //                 code,
    //             },
    //         };
    //     } else {
    //         const user = await User.findOne({ where: { email } });

    //         if (!user) {
    //             throw ErrorService.BadRequest("Wrong email or password");
    //         }

    //         const comparePassword = await bcrypt.compare(
    //             password,
    //             user.password
    //         );
    //         if (!comparePassword) {
    //             throw ErrorService.BadRequest("Wrong email or password");
    //         }

    //         const tokens = TokenService.generateTokens({
    //             id: user.id,
    //             email,
    //             role: 'user'
    //         });
    //         return {
    //             refreshToken: tokens.refreshToken,
    //             user: {
    //                 accessToken: tokens.accessToken,
    //                 id: user.id,
    //                 email,
    //                 password: user.password,
    //                 isUser: true
    //             },
    //         };
    //     }
    // },
    // refreshUser: async (id) => {
    //     const user = await User.findOne({ where: { id } });
    //     const tokens = TokenService.generateTokens({
    //         id: user.id,
    //         email: user.email,
    //     });

    //     return {
    //         refreshToken: tokens.refreshToken,
    //         user: {
    //             accessToken: tokens.accessToken,
    //             id: user.id,
    //             email: user.email,
    //             password: user.password,
    //         },
    //     };
    // },
    // firstUser: async () => {
    //     const oldUser = await User.findOne({ where: { email: "admin" } });
    //     if (oldUser) {
    //         return;
    //     }

    //     const hashedPassword = await bcrypt.hash("swis2023", 3);
    //     return await User.create({
    //         email: "admin",
    //         password: hashedPassword,
    //     });
    // },
};

export default userService;
