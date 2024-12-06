export interface IVerifyEmail {
    email: string;
}

export interface IVerifyPassword {
    password: string;
}

export interface ISignIn {
    email: string;
    password: string;
}

export interface IUserInfo {
    name: string;
    email: string;
    password: string;
    image: string;
}