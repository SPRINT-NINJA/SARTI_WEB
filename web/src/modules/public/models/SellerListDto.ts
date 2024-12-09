import { Pagination } from "@/kernel/types";

export type SellerListDto = Pagination<any> & {
    businessName: string
}