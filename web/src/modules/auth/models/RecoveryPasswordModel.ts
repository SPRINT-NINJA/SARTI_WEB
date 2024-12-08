export interface IVerifyEmail {
    email: string;
}
export interface IRecoveryPassword {
    email: string;
    code: string;
    password: string;
}