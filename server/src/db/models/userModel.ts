import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "@sequelize/core";
import { DataTypes } from "@sequelize/core";
import sequelize from "../db";

// We recommend you declare an interface for the attributes, for stricter typechecking

enum UserRole {
    admin = "admin",
    user = "user",
}
interface IUserModel extends Model<InferAttributes<IUserModel>, InferCreationAttributes<IUserModel>> {
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
    passport: string;
    address: string;
}
export interface IUser {
    id?: number;
    email: string;
    name: string;
    surname: string;
    patronymic?: string;
    password: string;
    avatar?: string | null;
    phone: string;
    telegram_id?: string;
    active?: boolean;
    role?: UserRole;
    passport: string;
    address: string;
}
export const UserModel = sequelize.define<IUserModel>("user", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    patronymic: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
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
        unique: true,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    passport: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
        allowNull: false,
    },
});

interface IUserAddressModel extends Model<InferAttributes<IUserAddressModel>, InferCreationAttributes<IUserAddressModel>> {
  id: CreationOptional<Number>;
  userId: number;
    country: string;
    region: string;
    district: string;
    city: string;
    locality: string;
    street?: string | null;
    house?: string;
    room?: string;
    postcode?: string;
    mailbox_number?: string;
}

export interface IUserAddress {
    id: number;
    userId: number;
    country: string;
    region: string;
    district: string;
    city: string;
    locality: string;
    street?: string | null;
    house?: string;
    room?: string;
    postcode?: string;
    mailbox_number?: string;
}
export const UserLegalRegisteredModel = sequelize.define<IUserAddressModel>("legal_registered", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
},
userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
        model: UserModel,
        key: 'id'
    }
},
    country: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    region: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    district: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    locality: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    house: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    room: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postcode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mailbox_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});
UserModel.hasOne(UserLegalRegisteredModel, { foreignKey: 'userId', as: 'legal_registered' });
UserLegalRegisteredModel.belongsTo(UserModel, { foreignKey: 'userId' });