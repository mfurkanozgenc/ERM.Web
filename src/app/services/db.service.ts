import { Injectable } from '@angular/core';
import { InvoiceModel } from '../models/invoiceModel';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() { }

  networkStatus : boolean = true;
  invoices: InvoiceModel[] = [];
}
