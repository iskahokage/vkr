import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Toast } from "primereact/toast";
import { RefObject } from "react";
import api, { baseUrl } from "../../helpers/interceptor";
import { AxiosError } from "axios";
import { ILoan, ILoanState } from "../../types/loan";


export const fetchLoans = createAsyncThunk<any,  {toast: RefObject<Toast>}>('fetchLoans/get', async ({toast}) => {
    try {
        const {data} = await api.get(baseUrl + '/loans');
        return data
    } catch (error) {
        const err = error as AxiosError;
        toast.current?.show({ severity: "error", summary: "Error", detail: JSON.stringify(err.message), life: 3000 });
    }
})

export const fetchLoansByUsedId = createAsyncThunk<any,  {toast: RefObject<Toast>}>('fetchLoans/get', async ({toast}) => {
    try {
        const {data} = await api.get(baseUrl + '/loans/own');
        return data
    } catch (error) {
        const err = error as AxiosError;
        toast.current?.show({ severity: "error", summary: "Error", detail: JSON.stringify(err.message), life: 3000 });
    }
})
export const updateLoan = createAsyncThunk<any,  {toast: RefObject<Toast>, body: ILoan, id: string}>('updateLoan/patch', async ({toast, body, id}) => {
    try {
        const {data, status} = await api.patch(baseUrl + '/loans/update/' + id, body);
        if(status === 200){
            toast.current?.show({ severity: "success", summary: "Служебка успешно обновлена", life: 3000 });
        }
        return data
    } catch (error) {
        const err = error as AxiosError;
        toast.current?.show({ severity: "error", summary: "Error", detail: JSON.stringify(err.message), life: 3000 });
    }
})
export const createLoan = createAsyncThunk<any,  {toast: RefObject<Toast>, body: ILoan}>('createLoan/post', async ({toast, body}) => {
    try {
        const {data, status} = await api.post(baseUrl + '/loans/new', body);
        if(status === 200){
            toast.current?.show({ severity: "success", summary: "Служебка успешно создана", life: 3000 });
        }
        return data
    } catch (error) {
        const err = error as AxiosError;
        toast.current?.show({ severity: "error", summary: "Error", detail: JSON.stringify(err.message), life: 3000 });
    }
})


const initialState: ILoanState = {
    loans: [],
    loan: {
        id: '',
        loanDate:new Date().toISOString(),
        returnDate:new Date().toISOString(),
        tool: '',
        userId: '',
        serialNumber: '',
        user: {
            name: '',
            surname: '',
        }
    },
    spin: false,
    popup: false
};

const loanSlice = createSlice({
    name: 'loan',
    initialState,
    reducers: {
        setPopup: (state, {payload}) => {
            state.popup = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLoans.pending, (state, action) => {
            state.spin = true;
        })
        builder.addCase(fetchLoans.fulfilled, (state, {payload}) => {
            state.loans = payload
            state.spin = false
        })
        builder.addCase(fetchLoans.rejected, (state, {payload}) => {
            state.loans = []
            state.spin = false
        })
        builder.addCase(createLoan.fulfilled, (state, {payload}) => {
            state.loans = [...state.loans, payload]
        })
        builder.addCase(updateLoan.fulfilled, (state, {payload}) => {
            const arr: ILoan[] = JSON.parse(JSON.stringify(state.loans))
            const filtered = arr.filter(el => el?.id !== payload?.id)
            state.loans = [...filtered, payload]
            // state.loans = filtered.push(payload)
        })
    },
})
export const {setPopup} = loanSlice.actions;
export default loanSlice.reducer;