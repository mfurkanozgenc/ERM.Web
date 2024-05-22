import { CustomerModel } from "./customerModel";
import { OrderDetailModel } from "./orderDetailModel";

export class OrderModel{
  id : string = '';
  orderNumber : number = 0;
  orderNumberYear : number = 0;
  date : string = '';
  number : string = '';
  deliveryDate : string = '';
  customerId : string = '';
  status : OrderStatusEnum = new OrderStatusEnum() ;
  customer : CustomerModel = new CustomerModel();
  orderDetails : OrderDetailModel[] = [];
}

export class OrderStatusEnum{
  name : string = '';
  value : number = 0;
}
