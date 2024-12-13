import axios from "../../../config/client.gateway";
import { CustomResponse } from "@/kernel/types";
import { RequestHandler } from "@/kernel/RequestHandler";
import { IcreateRate } from "../models/CustomerCreateRateModel";



export default class RateService {
    private static baseUrlRate = "/rate";


    static async getRateListByProduct(payload: any): Promise<CustomResponse<any>> {
        return await RequestHandler.handleRequest(axios.doGet(`${this.baseUrlRate}/${payload.id}`));
    }

    static async createRate(payload: any): Promise<CustomResponse<any>> {
        const formData = new FormData();
        formData.append('rate',payload.rate);
        formData.append('comment',payload.comment);
        formData.append('image',payload.image);
        formData.append('productId',payload.productId);
        formData.append('orderProductId',payload.orderProductId);
        return await RequestHandler.handleRequest(axios.doPostFile(`${this.baseUrlRate}`,formData));
    }

    


}