import { RequestHandler } from "@/kernel/RequestHandler";
import { CustomResponse } from "../../../kernel/types";
// import { test } from "@/kernel/types";
import axios from "../../../config/client.gateway";
import { ISignIn } from "../models/LoginModel";
import { IRecoveryPassword, IVerifyEmail } from "../models/RecoveryPasswordModel";
export default class AuthService {
  private static baseUrl = "/auth";


  static async signIn(payload: ISignIn) : Promise<CustomResponse<string>>{
    return await RequestHandler.handleRequest(axios.doPost(`${this.baseUrl}/sign-in`, payload));
  }

  static async sendCode(payload: IVerifyEmail): Promise<CustomResponse<any>>{
    return await RequestHandler.handleRequest(axios.doPost(`${this.baseUrl}/send-code`, payload));
  }

  static async recoveryPassword(payload: IRecoveryPassword): Promise<CustomResponse<any>>{
    return await RequestHandler.handleRequest(axios.doPost(`${this.baseUrl}/recovery-password`, payload));
  }

  static async getUser(payload: any): Promise<any> {
    try {
        const response = await axios.doGet(`${this.baseUrl}/user?email=${payload.email}`);
        return response.data.data;
    } catch (e:any) {
        return {
            code: e.data?.code,
            error: true,
            message: e.data?.message,
        }
    }
  }

  static async createAccountSeller(payload: any): Promise<any>{
    try{
      const response = await axios.doPost(`/seller/signup`,payload);
      return response.data.data;
    }catch(e:any){
      return {
        code: e.data?.code,
        error:true,
        message: e.data?.message
      }
    }
  }

  static async createAccountCustomer(payload: any): Promise<any>{
    try{
      const response = await axios.doPost(`/customer/signup`,payload);
      return response.data.data;
    }catch(e:any){
      return {
        code: e.data?.code,
        error:true,
        message: e.data?.message
      }
    }
  }

  static async createAccountDeliveryMan(payload: any): Promise<any>{
    try{
      const formData = new FormData();
      formData.append('email',payload.email);
      formData.append('password',payload.password);
      formData.append('name',payload.name);
      formData.append('firstLastName',payload.firstLastName);
      formData.append('secondLastName',payload.secondLastName);
      formData.append('profilePicture',payload.profilePicture);
      formData.append('backIdentification',payload.backIdentification);
      formData.append('frontIdentification',payload.frontIdentification); 
      const response = await axios.doPostFile(`/delivery-man/signup`,formData);
      return response.data.data;
    }catch(e:any){
      return {
        code: e.data?.code,
        error:true,
        message: e.data?.message
      }
    }
  }
  

}
