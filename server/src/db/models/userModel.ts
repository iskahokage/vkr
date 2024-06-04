import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from '@sequelize/core';
import { DataTypes } from '@sequelize/core';
import sequelize from '../db';



// We recommend you declare an interface for the attributes, for stricter typechecking

enum UserRole {
  admin = 'admin',
  user = 'user'
}
interface IUserModel
  extends Model<InferAttributes<IUserModel>, InferCreationAttributes<IUserModel>> {
  id: CreationOptional<number>;
  email: string;
  name: string;
  surname: string;
  password: string;
  phone: string;
  avatar?: string | null;
  patronymic?: string;
  telegram_id?: string;
  active?: boolean;
  role?: UserRole;
}
export interface IUser {
  id?: number;
  email: string;
  name: string;
  surname: string;
  patronymic?: string;
  password: string;
  avatar?: string;
  phone: string;
  telegram_id?: string;
  active?: boolean;
  role?: UserRole;
}
export const UserModel = sequelize.define<IUserModel>('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telegram_id: {
    type: DataTypes.STRING,
    unique: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
    allowNull: false
  }
});

