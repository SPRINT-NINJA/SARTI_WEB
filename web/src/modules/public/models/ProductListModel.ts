export interface IProductList {
    id: number;
    name: string;
    price: number;
    image: string;
}

export default class ProductListModel {
    public id: number;
    public name: string;
    public price: number;
    public image: string;

    constructor(data: IProductList) {
        this.id = data.id;
        this.name = data.name;
        this.price = data.price;
        this.image = data.image;
    }

}