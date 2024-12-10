import axios from "../../../config/client.gateway";
import { SellerListDto } from "../models/SellerListDto";
import { CustomResponse, CustomResponsePageable } from "@/kernel/types";
import { RequestHandler } from "@/kernel/RequestHandler";
import { IProduct } from "@/modules/products/models/ProductModel";

export default class PublicService {
    private static baseUrl = "/seller";
    private static baseUrlRate = "/rate";

    static async getSellers(payload: SellerListDto): Promise<CustomResponse<any>> {
        let pathParams = `?page=${payload.page}&size=${payload.size}&sort=${payload.sort},${payload.direction}`;
        if (payload.businessName)
            pathParams += `&bussinesName=${payload.businessName}`
        return await RequestHandler.handleRequest(axios.doGet(`${this.baseUrl}/all${pathParams}`));
    }


    static async getResumeRateByProduct(payload: any): Promise<CustomResponse<any>> {
        return await RequestHandler.handleRequest(axios.doGet(`${this.baseUrlRate}/resume/${payload.id}`));
    }

    static async getRateListByProduct(payload: any): Promise<CustomResponse<any>> {
        return await RequestHandler.handleRequest(axios.doGet(`${this.baseUrlRate}/${payload.id}`));
    }

    


}