import { CustomResponse, CustomResponsePageable } from "@/kernel/types";
import { IProduct } from "../models/ProductModel";
import { RequestHandler } from "@/kernel/RequestHandler";
import axios from "@/config/client.gateway";
import { VerifyAvailabilityDto } from "../models/VerifyAvailabilityDto";
import { AvailabilityResponse } from "../models/AvailabilityResponse";

export default class ProductService {
  private static baseUrl = "/product";

  static async getAllProducts(
    payload: any
  ): Promise<CustomResponsePageable<IProduct>> {
    return await RequestHandler.handleRequestPageable(
      axios.doGet(
        `${this.baseUrl}?productName=${payload.productName}&sellerId=${payload.sellerId}&page=${payload.page}&size=${payload.size}&sort=id,${payload.sort}`
      )
    );
  }
  static async updateStock(payload: any): Promise<CustomResponse<any>> {
    return await RequestHandler.handleRequest(
      axios.doPatch(
        `${this.baseUrl}?newStock=${payload.stock}&productId=${payload.id}`,
        payload
      )
    );
  }
  static async changeStatus(payload: any): Promise<CustomResponse<any>> {
    return await RequestHandler.handleRequest(
      axios.doPatch(`${this.baseUrl}/${payload.id}`, payload)
    );
  }
  static async deteleProduct(payload: any): Promise<CustomResponse<any>> {
    return await RequestHandler.handleRequest(
      axios.doDelete(`${this.baseUrl}/${payload.id}`)
    );
  }

  static async getDetailProduct(payload: any): Promise<CustomResponse<any>> {
    return await RequestHandler.handleRequest(
      axios.doGet(`${this.baseUrl}/${payload.id}`)
    );
  }

  static async verifyAvailability(payload: Array<VerifyAvailabilityDto>): Promise<CustomResponse<AvailabilityResponse>> {
    return await RequestHandler.handleRequest(
      axios.doPost(`${this.baseUrl}/verify-availability`, payload)
    );
  }
}
