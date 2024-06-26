import { Component, ElementRef, ViewChild } from '@angular/core';
import { InvoiceModel } from '../../models/invoiceModel';
import { CustomerModel } from '../../models/customerModel';
import { ProductModel } from '../../models/productModel';
import { InvoiceDetailModel } from '../../models/invoiceDetailModel';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { TrCurrencyPipe } from 'tr-currency';
import { SharedModule } from '../../modules/shared.module';
import { InvoicePipe } from '../../pipes/invoice.pipe';
import { DepotModel } from '../../models/depotModel';
import { ActivatedRoute } from '@angular/router';
import { OrderModel } from '../../models/orderModel';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [SharedModule,TrCurrencyPipe,InvoicePipe],
  providers : [DatePipe],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent {
  @ViewChild('createModalCloseBtn') createModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;
  customers: CustomerModel[] = [];
  products: ProductModel[] = [];
  depots : DepotModel[] = [];
  orders : OrderModel[] = [];
  tempOrders : OrderModel[] = [];
  createDetail: InvoiceDetailModel = new InvoiceDetailModel();
  updateDetail: InvoiceDetailModel = new InvoiceDetailModel();
  createModel: InvoiceModel = new InvoiceModel();
  updateModel: InvoiceModel = new InvoiceModel();
  search: string = '';
  type : number = 1;
  typeName : string = 'Alış';
  constructor(private http: HttpService,
              private swal: SwalService,
              private date : DatePipe,
              public db :DbService,
              private acivated : ActivatedRoute ) {

        this.acivated.params.subscribe(res =>{
           this.type = res["type"] === 'purchase' ? 1 : 2;
           this.typeName = this.type === 1 ? 'Alış' : 'Satış'
        })

        this.createModel.typeValue = this.type;
        if(this.db.invoices.length === 0){
          this.getAllInvoice();
        }
        this.geAllCustomer();
        this.geAllProduct();
        this.geAllDepot();
        this.getAllOrder();
        this.createModel.date = this.date.transform(new Date() , 'yyyy-MM-dd') ?? '';
  }
  ngOnInit(): void {
  }

  openEditModal(order: InvoiceModel) {
    this.updateModel = { ...order };
  }


  getAllInvoice() {
    this.http.post<InvoiceModel[]>('Invoice/GetAll', {type : this.type}, (res) => {
      this.db.invoices = res;
    });
  }
  geAllCustomer() {
    this.http.post<CustomerModel[]>('Customer/GetAll', {}, (res) => {
      this.customers = res;
    });
  }
  geAllDepot() {
    this.http.post<DepotModel[]>('Depot/GetAll', {type : this.type}, (res) => {
      this.depots = res;
    });
  }
  getAllOrder() {
    this.http.post<OrderModel[]>('Order/GetAll', {type : this.type}, (res) => {
      this.orders = res.filter(o => o.status.value != 3);
      this.tempOrders = res.filter(o => o.status.value != 3);
    });
  }
  geAllProduct() {
    this.http.post<ProductModel[]>('Product/GetAll', {}, (res) => {
      this.products = res;
    });
  }
  selectCustomer(customer : any){
    if(customer.target.value){
      this.tempOrders = structuredClone(this.orders.filter(p => p.customerId === customer.target.value));
    }
    else{
      this.tempOrders = this.orders;
    }
  }
  addDetail() {
    if(!this.createDetail.productId  || !this.createDetail.depotId){ return;}
    const product = this.products.find((p) => p.id === this.createDetail.productId);
    if (product) {
      this.createDetail.product = product;
    }
    const depot = this.depots.find((p) => p.id === this.createDetail.depotId);
    if (depot) {
      this.createDetail.depot = depot;
    }
    this.createModel.invoiceDetails.push(this.createDetail);
    this.createDetail = new InvoiceDetailModel();
    this.createModel.date = this.date.transform(new Date() , 'yyyy-MM-dd') ?? '';
  }

  addUpdateDetail() {
    if(!this.updateDetail.productId || !this.updateDetail.depotId){ return;}
    const product = this.products.find((p) => p.id === this.updateDetail.productId);
    if (product) {
      this.updateDetail.product = product;
    }
    this.updateModel.invoiceDetails.push(this.updateDetail);
    this.updateDetail = new InvoiceDetailModel();
    this.updateModel.date = this.date.transform(new Date() , 'yyyy-MM-dd') ?? '';
  }
  removeDetail(index: number) {
    this.createModel.invoiceDetails.splice(index, 1);
  }

  removeUpdatDetail(index: number) {
    this.updateModel.invoiceDetails.splice(index, 1);
  }
  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Invoice/Create', this.createModel, (res) => {
        this.swal.callToast(res);
        this.createModel = new InvoiceModel();
        this.createModel.typeValue = this.type;
        this.createModalCloseBtn?.nativeElement.click();
        this.getAllInvoice();
      });
    }
  }

  delete(invoice: InvoiceModel) {
    this.swal.callSwal(
      'Fatura Silinecek ?',
      `${invoice.invoiceNumber} numaralı fatura silinecektir.Onaylıyor Musunuz ?`,
      () => {
        this.http.post<string>('Invoice/DeleteById', { id: invoice.id }, (res) => {
          this.swal.callToast(res);
          this.getAllInvoice();
        });
      }
    );
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Invoice/Update', this.updateModel, (res) => {
        this.swal.callToast(res);
        this.updateModel.typeValue = this.type;
        this.updateModalCloseBtn?.nativeElement.click();
        this.getAllInvoice();
      });
    }
  }
}
