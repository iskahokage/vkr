type UserRole = 'user' | 'admin'
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
    tin: string;
    address: string,
  }
export interface IUserState {
    user: IUser | null,
    isAuthenticated: boolean
}
export interface IUserCredentials {
    email: string,
    password: string
}

export interface IResetPassword {
    oldPassword: string,
    password: string,
    confirmPassword: string
}
export interface INewUser extends IUser{
    legal_registered: IUserAddress
}
export interface IUserAddress {
    id?: number;
    userId?: number;
    country: string;
    region: string;
    district: string;
    city: string;
    locality: string;
    street?: string;
    house?: string;
    room?: string;
    postcode?: string;
    mailbox_number?: string;
}

export interface IGRSResponse {
    type: number
    type_value: string
    name: string
    code_okpo: string
    ssn: string
    first_name: string
    last_name: string
    passport: string
    address: string
    legal_registered: IUserAddress
    actual_activities: IUserAddress
    contact_number: string
    phone_number: string
    fax: string
    telex: string
    email: string
  }