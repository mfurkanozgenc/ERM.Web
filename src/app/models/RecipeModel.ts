import { RecipeDetailModel } from "./RecipeDetailModel";
import { ProductModel } from "./productModel";

export class RecipeModel{
  id : string = '';
  productId : string = '';
  product : ProductModel = new ProductModel();
  details : RecipeDetailModel[] = [];
}
