import { CustomResponse, CustomResponsePageable } from "@/kernel/types";
import { IProduct } from "../models/ProductModel";
import { RequestHandler } from "@/kernel/RequestHandler";
import axios from "@/config/client.gateway";
import { computed } from "vue";

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
  static async saveProduct(payload: any): Promise<any> {
    try {
      const formData = new FormData();
      console.log("payload service", payload);
      // Agregar las propiedades principales
      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("price", payload.price);
      formData.append("stock", payload.stock);

      // Agregar el archivo principal
      if (payload.mainImage) {
        formData.append("mainImageFile", payload.mainImage);
      }

      // Agregar las imágenes del arreglo anidado
      if (payload.images && Array.isArray(payload.images)) {
        payload.images.forEach((image: any, index: number) => {
          if (image.imageFile) {
            formData.append(
              `productImages[${index}].imageFile`,
              image.imageFile
            );
          } else {
            console.log("no entroooo", image);
          }
          if (image.position) {
            formData.append(`productImages[${index}].position`, image.position);
          }
        });
      }
      // Aquí puedes realizar la solicitud HTTP (ejemplo usando Axios)
      const response = await axios.doPostFile(`${this.baseUrl}`, formData);

      return response.data.data;
    } catch (e: any) {
      return {
        code: e.data?.code,
        error: true,
        message: e.data?.message,
      };
    }
  }



  static async updateProduct(payload: any): Promise<any> {
    try {
      const formData = new FormData();
      console.log("payload service desde actualizar", payload);
      // Agregar las propiedades principales
      formData.append("id", payload.id);
      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("price", payload.price);
      formData.append("stock", payload.stock);

      // Agregar el archivo principal
      if (payload.mainImage) {
        formData.append("mainImageFile", payload.mainImage);
      }

      // Agregar las imágenes del arreglo anidado
      if (payload.images && Array.isArray(payload.images)) {
        payload.images.forEach((image: any, index: number) => {
          if (image.imageFile) {
            formData.append(
              `productImages[${index}].imageFile`,
              image.imageFile
            );
          } else {
            console.log("no entroooo", image);
          }
      
          if (image.position) {
            formData.append(`productImages[${index}].position`, image.position);
          }
      
          if (image.id) {
            formData.append(`productImages[${index}].id`, image.id);
          }
        });
      }
      
      console.log(formData)
      // Aquí puedes realizar la solicitud HTTP (ejemplo usando Axios)
      const response = await axios.doPutFile(`${this.baseUrl}`, formData);

      return response.data.data;
    } catch (e: any) {
      return {
        code: e.data?.code,
        error: true,
        message: e.data?.message,
      };
    }
  }


}
