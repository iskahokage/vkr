import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from '@sequelize/core';
import { DataTypes } from '@sequelize/core';
import sequelize from '../db';



// We recommend you declare an interface for the attributes, for stricter typechecking

interface IUserModel
  extends Model<InferAttributes<IUserModel>, InferCreationAttributes<IUserModel>> {
  id: CreationOptional<number>;
  name: string;
  surname: string;
  patronymic: string;
  passowrd: string;
  avatar: string,
  phone: string,
  telegram_id: string,
}
export interface IUser {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  passowrd: string;
  avatar: string,
  phone: string,
  telegram_id: string,
}
export const UserModel = sequelize.define<IUserModel>('User', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  patronymic: {
    type: DataTypes.STRING,
  },
  passowrd: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telegram_id: {
    type: DataTypes.STRING,
  },
});

