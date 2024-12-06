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
