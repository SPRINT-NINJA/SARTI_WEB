import { RequestHandler } from "@/kernel/RequestHandler";
import { CustomResponse } from "@/kernel/types";
import { PaypalOrderInit } from "@/modules/carts/models/PaypalOrderInit";
import axios from "@/config/client.gateway"

export default class CustomerDeliveryOrderService {
    private static baseUrl = "/order-delivery";

    static async createDeliveryOrder(payload: PaypalOrderInit): Promise<CustomResponse<any>> {
        return await RequestHandler.handleRequest(axios.doPost(`${this.baseUrl}/create-order`, payload));
    }

    static async captureDeliveryOrder(payload: any): Promise<CustomResponse<any>> {
        return await RequestHandler.handleRequest(axios.doPost(`${this.baseUrl}/capture-order`, payload));
    }
}