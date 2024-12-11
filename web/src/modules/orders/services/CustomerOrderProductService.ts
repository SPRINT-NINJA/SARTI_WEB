import { RequestHandler } from "@/kernel/RequestHandler";
import { GetMissingRateOrderProductDto } from "../models/GetMissingRateOrderProductDto";
import axios from "@/config/client.gateway"
import { CustomResponsePageable } from "@/kernel/types";
import { MissingRateOrderProduct } from "../models/MissingRateOrderProduct";

export default class CustomerOrderProductService {
  private static baseUrl = "/order-product"

  static async getOrderProductMissingRate(payload: GetMissingRateOrderProductDto): Promise<CustomResponsePageable<MissingRateOrderProduct>> {
    let pathParams = `?page=${payload.page}&size=${payload.size}&sort=${payload.sort},${payload.direction}`;
    if (payload.searchValue)
      pathParams += `&bussinesName=${payload.searchValue}`;
    return await RequestHandler.handleRequest(axios.doGet(`${this.baseUrl}/missing-rate${pathParams}`)) as CustomResponsePageable<MissingRateOrderProduct>;
  }
}