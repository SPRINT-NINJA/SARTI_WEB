import { CustomResponsePageable } from "@/kernel/types";
import { IProduct } from "../models/ProductModel";
import { RequestHandler } from "@/kernel/RequestHandler";
import axios from "@/config/client.gateway";

export default class ProductService {
    private static baseUrl = "/product";

    static async getAllProducts(payload: any): Promise<CustomResponsePageable<IProduct>>{
        return await RequestHandler.handleRequestPageable(axios.doGet(`${this.baseUrl}?productName=${payload.productName}&sellerId=${payload.sellerId}&page=${payload.page}&size=${payload.size}&sort=id,${payload.sort}`));
    }
}