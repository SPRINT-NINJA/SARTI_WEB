export enum ERoles {
    DELIVERYMAN = "REPARTIDOR",
    SELLER = "EMPRENDEDOR",
    CUSTOMER = "COMPRADOR"
}

export type Entity<ID extends number | string>={
    id? :ID
};
export type CustomResponse<T> ={
    status?:number | string,
    message?:string,
    entities?: T[],
    error?:boolean,
    data?: T,
    statusMessage?: string,
}

export type Pagination<T> = {
    page: number;
    size: number;
    sort: string;
    direction: string;
    data?: T;
    param?: string;
}



interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

interface PageResponse<T> {
    content: T[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface CustomResponsePageable<T> {
    data: PageResponse<T>;
    status: string;
    error: boolean;
    message: string;
}