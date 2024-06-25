export interface ILoanState {
    loans: ILoan[],
    loan: ILoan,
    spin: boolean,
    popup: boolean
}
export interface ILoan {
    id?: string,
    userId: string,
    tool: string,
    serialNumber: string
    loanDate: string,
    returnDate?: string | null
    user?: {
        name: string, 
        surname: string,
    }
}