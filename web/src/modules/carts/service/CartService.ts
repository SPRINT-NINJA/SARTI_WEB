import axios from "../../../config/client.gateway";
import { CustomResponse, CustomResponsePageable } from "@/kernel/types";
import { RequestHandler } from "@/kernel/RequestHandler";
import { ICartProduct } from "../models/CartCustomerProductListModel";


export default class CartService {
    private static baseUrl = "/cart";

    static async getCart(): Promise<CustomResponse<any>> {
        return await RequestHandler.handleRequest(axios.doGet(`${this.baseUrl}`));
    }

    static async cleanCart(): Promise<CustomResponse<any>> {
        return await RequestHandler.handleRequest(axios.doDelete(`${this.baseUrl}`));
    }

    static async removeProductCart(payload:ICartProduct): Promise<CustomResponse<any>> {
        return await RequestHandler.handleRequest(axios.doDelete(`${this.baseUrl}?productId=${payload.product.id}`));
    }

    static async updateProductCart(payload:ICartProduct): Promise<CustomResponse<any>> {
        return await RequestHandler.handleRequest(axios.doPutAnyObject(`${this.baseUrl}?productId=${payload.product.id}&quantity=${payload.amount}`));
    }

}