import { CustomResponse } from "@/kernel/types";
import { GetOrderDeliveriesDto } from "../models/GetOrderDeliveriesDto";
import { RequestHandler } from "@/kernel/RequestHandler";
import axios from "../../../config/client.gateway";

export default class OrderDeliveryService {
  private static baseUrl = "/order-delivery";

  static async getOrderDeliveriesHistory(payload: GetOrderDeliveriesDto): Promise<CustomResponse<any>> {
    let pathParams = `?page=${payload.page}&size=${payload.size}&sort=${payload.sort},${payload.direction}`;
    if (payload.searchValue)
      pathParams += `&bussinesName=${payload.searchValue}`;
    if (payload.step)
      pathParams += `&step=${payload.step}`;
    if (payload.type)
      pathParams += `&type=${payload.type}`;
    return await RequestHandler.handleRequest(axios.doGet(`${this.baseUrl}/history${pathParams}`));
  }

  static async getOrderDeliveriesToTake(payload: GetOrderDeliveriesDto): Promise<CustomResponse<any>> {
    let pathParams = `?page=${payload.page}&size=${payload.size}&sort=${payload.sort},${payload.direction}`;
    if (payload.searchValue)
      pathParams += `&bussinesName=${payload.searchValue}`;
    return await RequestHandler.handleRequest(axios.doGet(`${this.baseUrl}/to-take${pathParams}`));
  }

  static async getTakenOrderDeliveries(): Promise<CustomResponse<any>> {
    return await RequestHandler.handleRequest(axios.doGet(`${this.baseUrl}/taken`));
  }

  static async getOneOrderDelivery(payload: number): Promise<CustomResponse<any>> {
    return await RequestHandler.handleRequest(axios.doGet(`${this.baseUrl}/${payload}`));
  }

  static async takeOrderDelivery(payload: number): Promise<CustomResponse<any>> {
    return await RequestHandler.handleRequest(axios.doPatch(`${this.baseUrl}/take/${payload}`, payload));
  }

  static async changeOrderDeliveryStep(payload: any): Promise<CustomResponse<any>> {
    return await RequestHandler.handleRequest(axios.doPatch(`${this.baseUrl}/change-step/${payload.orderId}?step=${payload.step}`, payload));
  }
}
