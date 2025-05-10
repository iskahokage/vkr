import { tr } from "@faker-js/faker";
import { LoanModel } from "../../db/models/loanModel";
import { UserModel } from "../../db/models/userModel";
import { getOrSetCache, setCache } from "../../db/redis";

export const loansService = {
    getLoans: async () => {
        // const loans = await getOrSetCache(`loans`, async () => {
            
        // });
        // return loans;
        const result = await LoanModel.findAll({
            include: { model: UserModel, attributes: ["name", "surname"] },
        });
        return result;
    },
    getLoanById: async (userId: string) => {
        const loan = await getOrSetCache(`loan:${userId}`, async () => {
            const result = await LoanModel.findAll({
                where: { userId },
                include: { model: UserModel },
            });
            return result;
        });
        return loan;
    },
    createLoan: async (tool: string, loanDate: Date, userId: number, serialNumber: string) => {
        const loan = await LoanModel.create({
            tool,
            loanDate,
            userId,
            serialNumber,
        });
        const result = await LoanModel.findOne({
            where: { id: loan.id },
            include: { model: UserModel, attributes: ["name", "surname"] },
        });
        return result;
    },
    updateLoan: async (
        id: string,
        tool: string,
        loanDate: Date,
        userId: number,
        serialNumber: string,
        returnDate: Date
    ) => {
        const loan = await LoanModel.findOne({
            where: { id },
            include: { model: UserModel, attributes: ["name", "surname"] },
        });
        await loan?.update({ tool, loanDate, userId, serialNumber, returnDate }, { where: { id } });
        await loan?.save();
        await setCache(`loan:${id}`, async () => {
            return await loan?.dataValues;
        });
        return loan;
    },
};
