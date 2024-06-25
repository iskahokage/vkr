import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { baseUrl } from "../../helpers/interceptor";
import { Toast } from "primereact/toast";
import { AxiosError } from "axios";
import { RefObject } from "react";

export const fetchCountries = createAsyncThunk<any, {toast: RefObject<Toast>}>(
    'fetchCountries/get',
    async({toast}) =>{
        try {
            const { data }= await api.get(baseUrl + "/ref/countries");
            return data
        } catch (error) {
            const err = error as AxiosError;
            toast.current?.show({ severity: "error", summary: "Error", detail: JSON.stringify(err.message), life: 3000 });
        }
    }
)

interface ICountry {
    id: string,
    code: string,
    name: string
}

interface IRefState {
    countries: ICountry[]
}

const initialState: IRefState = {
    countries: [],
}

const refSlice = createSlice({
    name: "refs",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCountries.fulfilled, (state, {payload}) => {
            state.countries = payload;
        })
    }
});
export default refSlice.reducer;