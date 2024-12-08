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