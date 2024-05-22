import { ProductModel } from "./productModel";

export class OrderDetailModel {
  id: string = '';
  orderId: string = '';
  productId: string = '';
  product : ProductModel = new ProductModel();
  quantity : number = 0;
  price : number = 0;
  discount : number = 0;
  vat : number = 0;
  vatInclude : boolean = false;
}
