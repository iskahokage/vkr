import path from "path"
import { UserModel } from "../../db/models/userModel"
import ErrorService from "../../helpers/errorService"
import { where } from "sequelize"
import { unlink } from "fs/promises"

const userService = {
    uploadAvatar: async(id: string, avatar: string) => {
        const user = await UserModel.findOne({where: {id}})
        if(!user){
            throw ErrorService.BadRequest('Такого пользователя нет')
        }
        await UserModel.update({avatar}, {where: {id}});
        return
    },
    replaceAvatar: async(id: string, avatar: string) => {
        const directoryPath = path.resolve(__dirname, '../../../', 'assets/userAvatars');
        const user = await UserModel.findOne({where: {id}})
        const oldAvatar = user?.avatar
        const filePath = path.join(directoryPath, oldAvatar as string);
        const result = await unlink(filePath);
        console.log(result)

        await UserModel.update({avatar}, {where: {id}});
    }
}

export default userService