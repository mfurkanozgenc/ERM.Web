export class ProductModel{
  id : string = '';
  name : string = '';
  typeValue : number = 1;
  type : ProductTypeEnum = new ProductTypeEnum();
}

export class ProductTypeEnum{
  name : string = '';
  value : number = 1;
}

export const ProductTypes : ProductTypeEnum[] = [
  {
    name  :'Mamül',
    value : 1
  },
  {
    name  :'Yarı Mamül',
    value : 2
  }
]
