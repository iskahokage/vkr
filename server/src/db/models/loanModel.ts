import type {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "@sequelize/core";
import { DataTypes } from "@sequelize/core";
import sequelize from "../db";
import { UserModel } from "./userModel";

// We recommend you declare an interface for the attributes, for stricter typechecking

interface ILoanModel
    extends Model<
        InferAttributes<ILoanModel>,
        InferCreationAttributes<ILoanModel>
    > {
    id: CreationOptional<number>;
    userId: number;
    tool: string;
    serialNumber: string;
    loanDate: Date;
    returnDate?: Date;
}
export interface ILoan {
    id: number;
    userId: number;
    tool: string;
    serialNumber: string;
    loanDate: Date;
    returnDate: Date;
}
export const LoanModel = sequelize.define<ILoanModel>("loans", {
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
            key: "id",
        },
    },
    tool: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    serialNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    loanDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    returnDate: {
        type: DataTypes.DATE,
    },
});

UserModel.hasOne(LoanModel, { foreignKey: "userId", as: "loan" });
LoanModel.belongsTo(UserModel, { foreignKey: "userId" });
