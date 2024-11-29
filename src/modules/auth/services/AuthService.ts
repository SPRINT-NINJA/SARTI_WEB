import axios from "../../../config/client.gateway";
export default class AuthService {
  private static baseUrl = "/auth";
  

  static async sigin(payload: any): Promise<any> {
    try {
      const response = await axios.doPost(`${this.baseUrl}/sign-in`, payload);
      console.log("respuesta gateway", response);
      return response.data.data;
    } catch (e: any) {
      return {
        code: e.data?.code,
        error: true,
        message: e.data?.message,
      };
    }
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


  
}
