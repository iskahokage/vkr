import path from "path"
import { IUser, UserModel } from "../../db/models/userModel"
import ErrorService from "../../helpers/errorService"
import { unlink } from "fs/promises"
import redisClient, { getOrSetCache } from "../../db/redis"

export const isUserExist = async(id: string) => {
    const user = await UserModel.findOne({where: {id}})
    if(!user){
        throw ErrorService.BadRequest('Такого пользователя нет')
    }
    return user;
}

const userService = {
    uploadAvatar: async(id: string, avatar: string) => {
        const user = await isUserExist(id)
        if(!avatar){
            throw ErrorService.BadRequest('Аватар не выбран')
        }
        if(user.avatar){
            const directoryPath = path.resolve(__dirname, '../../../', 'assets/userAvatars');
            const user = await UserModel.findOne({where: {id}})
            const oldAvatar = user?.avatar
            const filePath = path.join(directoryPath, oldAvatar as string);
            await unlink(filePath);    
            await UserModel.update({avatar}, {where: {id}});
        }else{
            await UserModel.update({avatar}, {where: {id}});
        }
        return avatar
    },
    updateUser: async(id: string, userObj: IUser) => {
        await isUserExist(id)
        const result = await UserModel.update({...userObj}, {where: {id}})
        return result;
    },
    getAll: async() => {
        const result = await UserModel.findAll()
        return result;
    },
    getOne: async(id: string) => {
        
        const user = await getOrSetCache(`user:${id}`, async () => {
            const foundUser = await UserModel.findOne({where: {id}})
            return foundUser?.dataValues;
        })
        return user
    },
    getRandomUser: async () => {
        const count = await UserModel.count()
        const random = Math.floor(Math.random() * count) + 1;
        const result = await userService.getOne(String(random))
        return result;
    }
}

export default userService