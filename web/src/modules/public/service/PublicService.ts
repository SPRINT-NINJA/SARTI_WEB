import { RequestHandler } from "@/kernel/RequestHandler";
import { CustomResponse } from "../../../kernel/types";
import axios from "../../../config/client.gateway";

export default class PublicService {
    private static baseUrl = "/seller";

    static async getSellers(payload: any): Promise<any> {
        return await RequestHandler.handleRequest(axios.doGet(`${this.baseUrl}/all`));
    }
}