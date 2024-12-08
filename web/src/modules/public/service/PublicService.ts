import { RequestHandler } from "@/kernel/RequestHandler";
import { CustomResponse } from "../../../kernel/types";
import axios from "../../../config/client.gateway";
import { SellerListDto } from "../models/SellerListDto";
import { SellerListModel } from "../models/SellerListModel";

export default class PublicService {
    private static baseUrl = "/seller";

    static async getSellers(payload: SellerListDto): Promise<CustomResponse<any>> {
        let pathParams = `?page=${payload.page}&size=${payload.size}&sort=${payload.sort},${payload.direction}`;
        if (payload.bussinesName)
            pathParams += `&bussinesName=${payload.bussinesName}`
        return await RequestHandler.handleRequest(axios.doGet(`${this.baseUrl}/all${pathParams}`));
    }
}