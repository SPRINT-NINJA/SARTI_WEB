import { CustomResponse } from "@/kernel/types";
import { GetOrderDeliveriesToTakeDto } from "../models/GetOrderDeliveriesToTakeDto";
import { RequestHandler } from "@/kernel/RequestHandler";
import axios from "../../../config/client.gateway";

export default class OrderDeliveryService {
  private static baseUrl = "/order-delivery";

  static async getOrderDeliveriesToTake(payload: GetOrderDeliveriesToTakeDto): Promise<CustomResponse<any>> {
    let pathParams = `?page=${payload.page}&size=${payload.size}&sort=${payload.sort},${payload.direction}`;
    if (payload.searchValue)
      pathParams += `&bussinesName=${payload.searchValue}`;
    return await RequestHandler.handleRequest(axios.doGet(`${this.baseUrl}/to-take${pathParams}`));
  }
}
