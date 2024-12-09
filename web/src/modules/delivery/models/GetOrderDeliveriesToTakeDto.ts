import { Pagination } from "@/kernel/types";

export type GetOrderDeliveriesToTakeDto = Pagination<any> & {
  searchValue: string;
};
