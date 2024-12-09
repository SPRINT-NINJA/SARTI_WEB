import { Pagination } from "@/kernel/types";

export type GetMissingRateOrderProductDto = Pagination<any> & {
  searchValue: string;
};