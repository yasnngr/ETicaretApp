import { List_Product_Images } from "./List_Product_Images";

export class List_Product{
    id?:string;
    name?:string;
    stock?:number;
    price?:number;
    createdDate?:Date;
    updatedDate?:Date;
    productImagesFile: List_Product_Images[]
}