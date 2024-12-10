import { Pagination } from "@/kernel/types";

export type GetOrderDeliveriesDto = Pagination<any> & {
  searchValue: string;
  step?: string;
  type?: string;
};
