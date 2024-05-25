import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { DatePipe } from '@angular/common';
import { OrderModel } from '../../models/orderModel';
import { ReportModel } from '../../models/reportModel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  providers : [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  orders : OrderModel[] = [];
  report : ReportModel = new ReportModel();
  constructor(
    public auth : AuthService,
    private http: HttpService
  ){
   this.getAllOrder();
   this.getAllReport();
  }

  getAllOrder() {
    this.http.post<OrderModel[]>('Order/GetAll', {}, (res) => {
      this.orders = res.slice(0,5);
    });
  }

  getAllReport() {
    this.http.post<ReportModel>('Report/GetAll', {}, (res) => {
      this.report = res;
    });
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
