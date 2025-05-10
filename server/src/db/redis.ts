import { createClient } from "redis";
import ErrorService from "../helpers/errorService";

const redisClient = createClient({
    url: "redis://redis:6379",
});

export const getOrSetCache = async (key: string, cb: Function) => {
    try {
        const result = await redisClient.get(key);
        if (result != null) {
            return JSON.parse(result);
        }
        const dataToSet = await cb();
        await redisClient.setEx(key, 3600, JSON.stringify(dataToSet));
        return dataToSet;
    } catch (error) {
        throw ErrorService.ServerInternalError("no key:" + key);
    }
};

export const setCache = async (key: string, cb: Function) => {
    try {
        const dataToSet = await cb();
        await redisClient.setEx(key, 3600, JSON.stringify(dataToSet));
        return dataToSet;
    } catch (error) {
        throw ErrorService.ServerInternalError("Please try again later!");
    }
};

export default redisClient;
