import { Component, ElementRef, ViewChild } from '@angular/core';
import { OrderModel } from '../../models/orderModel';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { NgForm } from '@angular/forms';
import { SharedModule } from '../../modules/shared.module';
import { OrderPipe } from '../../pipes/order.pipe';
import { CustomerModel } from '../../models/customerModel';
import { ProductModel } from '../../models/productModel';
import { OrderDetailModel } from '../../models/orderDetailModel';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [SharedModule, OrderPipe, RouterLink],
  templateUrl: './orders.component.html',
  providers: [DatePipe],
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  @ViewChild('createModalCloseBtn') createModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;

  orders: OrderModel[] = [];
  customers: CustomerModel[] = [];
  products: ProductModel[] = [];
  createDetail: OrderDetailModel = new OrderDetailModel();
  updateDetail: OrderDetailModel = new OrderDetailModel();
  createModel: OrderModel = new OrderModel();
  updateModel: OrderModel = new OrderModel();
  search: string = '';

  constructor(
    private http: HttpService,
    private swal: SwalService,
    private date: DatePipe
  ) {
    this.createModel.date = this.date.transform(new Date(), 'yyyy-MM-dd') ?? '';
    this.createModel.deliveryDate =
      this.date.transform(new Date(), 'yyyy-MM-dd') ?? '';
  }
  ngOnInit(): void {
    this.getAllOrder();
    this.geAllCustomer();
    this.geAllProduct();
  }

  openEditModal(order: OrderModel) {
    this.updateModel = { ...order };
  }

  getAllOrder() {
    this.http.post<OrderModel[]>('Order/GetAll', {}, (res) => {
      this.orders = res;
    });
  }
  geAllCustomer() {
    this.http.post<CustomerModel[]>('Customer/GetAll', {}, (res) => {
      this.customers = res;
    });
  }
  geAllProduct() {
    this.http.post<ProductModel[]>('Product/GetAll', {}, (res) => {
      this.products = res;
    });
  }
  addDetail() {
    if(!this.createDetail.productId) { return;}
    var exsistControl = this.createModel.orderDetails.findIndex(
      (p) => p.productId === this.createDetail.productId
    );
    const product = this.products.find(
      (p) => p.id === this.createDetail.productId
    );
    if (product) {
      this.createDetail.product = product;
    }
    if (exsistControl === -1) {
      this.createModel.orderDetails.push(this.createDetail);
    } else {
      this.createModel.orderDetails[exsistControl] = this.createDetail;
    }
    this.createDetail = new OrderDetailModel();
    this.createModel.date = this.date.transform(new Date(), 'yyyy-MM-dd') ?? '';
    this.createModel.deliveryDate =
      this.date.transform(new Date(), 'yyyy-MM-dd') ?? '';
  }

  addUpdateDetail() {
    if(!this.updateDetail.productId) { return;}
    var exsistControl = this.updateModel.orderDetails.findIndex(
      (p) => p.productId === this.updateDetail.productId
    );
    const product = this.products.find(
      (p) => p.id === this.updateDetail.productId
    );
    if (product) {
      this.updateDetail.product = product;
    }
    if (exsistControl === -1) {
      this.updateModel.orderDetails.push(this.updateDetail);
    } else {
      this.updateModel.orderDetails[exsistControl] = this.updateDetail;
    }
    this.updateDetail = new OrderDetailModel();
    this.updateModel.date = this.date.transform(new Date(), 'yyyy-MM-dd') ?? '';
    this.updateModel.deliveryDate =
      this.date.transform(new Date(), 'yyyy-MM-dd') ?? '';
  }
  removeDetail(index: number) {
    this.createModel.orderDetails.splice(index, 1);
  }

  removeUpdatDetail(index: number) {
    this.updateModel.orderDetails.splice(index, 1);
  }
  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Order/Create', this.createModel, (res) => {
        this.swal.callToast(res);
        this.createModel = new OrderModel();
        this.createModalCloseBtn?.nativeElement.click();
        this.getAllOrder();
      });
    }
  }

  delete(order: OrderModel) {
    const number: string = 'TS' + order.orderNumberYear + order.orderNumber;
    this.swal.callSwal(
      'Sipariş Silinecek ?',
      `${number} numaralı sipariş silinecektir.Onaylıyor Musunuz ?`,
      () => {
        this.http.post<string>(
          'Order/DeleteById',
          { orderId: order.id },
          (res) => {
            this.swal.callToast(res);
            this.getAllOrder();
          }
        );
      }
    );
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Order/Update', this.updateModel, (res) => {
        this.swal.callToast(res);
        this.updateModalCloseBtn?.nativeElement.click();
        this.getAllOrder();
      });
    }
  }
  getStatusClass(status: number) {
    switch (status) {
      case 1:
        return 'text-danger';
      case 2:
        return 'text-primary';
      default:
        return 'text-success';
    }
  }
}
