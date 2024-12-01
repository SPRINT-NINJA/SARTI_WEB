export interface IVerifyEmail {
    email: string;
}
export interface IRecoveryPassword {
    code: string;
    password: string;
}

export default class RecoveryPasswordModel {
    public code: string;
    public password: string;

    constructor(data: IRecoveryPassword) {
        this.code = data.code;
        this.password = data.password;
    }

}