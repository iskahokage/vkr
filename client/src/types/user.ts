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
    role?: string;
  }
export interface IUserState {
    user: IUser | null,
    isAuthenticated: boolean
}
export interface IUserCredentials {
    email: string,
    password: string
}