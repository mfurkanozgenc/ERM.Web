import { CustomerModel } from "./customerModel";
import { InvoiceDetailModel } from "./invoiceDetailModel";

export class InvoiceModel
{
  id : string = '';
  invoiceNumber : string = '';
  date : string = '';
  customerId : string = '';
  customer : CustomerModel = new CustomerModel();
  type : InvoiceTypeEnum = new InvoiceTypeEnum();
  typeValue : number = 1;
  invoiceDetails : InvoiceDetailModel[] = [];
}

export class InvoiceTypeEnum{
  value : number = 1;
  name : string = '';
}
