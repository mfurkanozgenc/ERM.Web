import { ProductModel } from "./productModel";

export class RecipeDetailModel{
  id : string = '';
  productId : string = '';
  product : ProductModel = new ProductModel();
  quantity : number = 1;
}
