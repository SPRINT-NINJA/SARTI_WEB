import { RequestHandler } from "@/kernel/RequestHandler";
import axios from "@/config/client.gateway";
import { CustomResponse, CustomResponsePageable } from "@/kernel/types";

export default class SellerOrderService {
  private static baseUrl = "/order-delivery";
  static async getAllOrders(
    payload: any
  ): Promise<CustomResponsePageable<any>> {
    return await RequestHandler.handleRequestPageable(
      axios.doGet(
        `${this.baseUrl}/history?page=${payload.page}&size=${payload.size}&sort=id,${payload.sort}&step=${payload.step}&type=${payload.type}&searchValue=${payload.searchValue}`
      )
    );
  }
  static async changeStep(payload: any): Promise<CustomResponse<any>> {
    return await RequestHandler.handleRequest(
      axios.doPatch(
        `${this.baseUrl}/change-step/${payload.id}?step=${payload.step}`,
        payload
      )
    );
  }
  static async getOrderDetails(payload: any): Promise<CustomResponse<any>> {
    return await RequestHandler.handleRequest(
      axios.doGet(`${this.baseUrl}/${payload.id}`)
    );
  }
}
