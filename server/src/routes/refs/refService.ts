import { CountryModel } from "../../db/models/contryModel"
import { getOrSetCache } from "../../db/redis";

export const refService = {
    getCountries: async () => {
        const countries = await getOrSetCache(`countriesRef`, async () => {
            const result = await CountryModel.findAll();
            return result;
        })
        return countries

    },
}