import { RequestHandler } from "@/kernel/RequestHandler";
import { CustomResponse } from "../../../kernel/types";
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


  static async getProfileSeller():Promise<any>{
    try {
      const response = await axios.doGet('/seller');
      return response.data.data;
    } catch (e:any) {
      return {
        code: e.data?.code,
        error:true,
        message: e.data?.message
      } 
    }
  }


  static async getProfileCustomer():Promise<any>{
    try {
      const response = await axios.doGet('/customer');
      return response.data.data;
    } catch (e:any) {
      return {
        code: e.data?.code,
        error:true,
        message: e.data?.message
      } 
    }
  }

  static async getProfileDeliveryMan():Promise<any>{
    try {
      const response = await axios.doGet('/delivery-man');
      return response.data.data;
    } catch (e:any) {
      return {
        code: e.data?.code,
        error:true,
        message: e.data?.message
      } 
    }
  }

  static async senCode(email:any):Promise<any>{
    try {
      const response = await axios.doPost('/auth/send-code',email);
      return response.data;
    } catch (e:any) {
      return {
        code: e.data?.code,
        error:true,
        message: e.data?.message
      } 
    }
  }

  static async confirmAccount(payload:any):Promise<any>{
    try {
      const response = await axios.doPost('/auth/confirm',payload);
      return response.data;
    } catch (e:any) {
      return {
        code: e.data?.code,
        error:true,
        message: e.data?.message
      } 
    }
  }

  static async changePassword(payload:any):Promise<any>{
    try {
      const response = await axios.doPost('/auth/change-password',payload);
      return response.data;
    } catch (e:any) {
      return {
        code: e.data?.code,
        error:true,
        message: e.data?.message
      } 
    }
  }

  static async updateProfileCustomer(payload:any):Promise<any>{
    try {
      const response = await axios.doPut('/customer',payload);
      return response.data;
    } catch (e:any) {
      return {
        code: e.data?.code,
        error:true,
        message: e.data?.message
      } 
    }
  }


  static async updateProfileDeliveryMan(payload: any): Promise<CustomResponse<any>> {
    const formData = new FormData();
  
    formData.append('id', payload.id);
    formData.append('name', payload.name );
    formData.append('firstLastName', payload.fistLastName );
    formData.append('secondLastName', payload.secondLastName );
    if(payload.facePhoto !== undefined && payload.facePhoto !== null) formData.append('profilePicture',payload.facePhoto);    
    if(payload.frontIdentificationPhoto !== undefined && payload.frontIdentificationPhoto !== null) formData.append('frontIdentification',payload.frontIdentificationPhoto);    
    if(payload.backIdentificationPhoto !== undefined && payload.backIdentificationPhoto !== null) formData.append('backIdentification',payload.backIdentificationPhoto);    
    return await RequestHandler.handleRequest(axios.doPutFile('/delivery-man', formData));
  }
  


  

  

}
