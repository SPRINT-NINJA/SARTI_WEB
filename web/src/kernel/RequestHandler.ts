import { CustomResponse, CustomResponsePageable } from "@/kernel/types";

export class RequestHandler {
  /**
   * Maneja las promesas para las solicitudes HTTP y encapsula la respuesta en un CustomResponse.
   * @param promise - La promesa resultante de una solicitud HTTP.
   * @returns CustomResponse con los datos procesados o el error capturado.
   */
  public static async handleRequest<T>(promise: Promise<any>): Promise<CustomResponse<T>>{
    try {
      const response = await promise;
      return response.data;
    } catch (e:any) {
      console.log("error", e);
      return {
        status: e.status,
        statusMessage: e.data.status,
        data: e.data?.data,
        error: e.data?.error,
        message: e.data?.message,
      }
    }
  }

  public static async handleRequestPageable<T>(promise: Promise<any>): Promise<CustomResponsePageable<T>>{
    try {
      const response = await promise;
      return response.data;
    } catch (e:any) {
      console.log("error", e);
      return {
        status: e.status,
        data: e.data?.data,
        error: e.data?.error,
        message: e.data?.message,
      }
    }
  }
}
