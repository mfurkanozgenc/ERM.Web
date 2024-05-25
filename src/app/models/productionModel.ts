import { DepotModel } from "./depotModel";
import { ProductModel } from "./productModel";

export class ProductionModel {
  id: string = '';
  productId: string = '';
  depotId: string = '';
  product : ProductModel = new ProductModel();
  depot : DepotModel = new DepotModel();
  quantity: number = 0;
  productionNumber : string = '';
  createdAt : string = '';
}
