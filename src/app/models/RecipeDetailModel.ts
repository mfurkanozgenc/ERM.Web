import { ProductModel } from "./productModel";

export class RecipeDetailModel{
  id : string = '';
  productId : string = '';
  recipeId : string = '';
  product : ProductModel = new ProductModel();
  quantity : number = 1;
}
