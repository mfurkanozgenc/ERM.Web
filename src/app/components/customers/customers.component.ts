import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { HttpService } from '../../services/http.service';
import { CustomerModel } from '../../models/customerModel';
import { CustomerPipe } from '../../pipes/customer.pipe';
import { NgForm } from '@angular/forms';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [SharedModule,CustomerPipe],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {

  @ViewChild('createModalCloseBtn') createModalCloseBtn : ElementRef<HTMLButtonElement> | undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn : ElementRef<HTMLButtonElement> | undefined;
  customers : CustomerModel[] = [];
  createModel : CustomerModel = new CustomerModel();
  updateModel : CustomerModel = new CustomerModel();
  search : string = '';

  constructor(
    private http : HttpService,
    private swal : SwalService
  ){

  }
  ngOnInit(): void {
    this.getAllCustomer();
  }

  openEditModal(customer : CustomerModel){
     this.updateModel = {...customer};
  }

  getAllCustomer(){
     this.http.post<CustomerModel[]>("Customer/GetAll",{},(res => {
      this.customers = res;
     }))
  }

  create(form : NgForm){
    if(form.valid){
      this.http.post<string>("Customer/Create",this.createModel,(res) =>{
        this.swal.callToast(res);
        this.createModel = new CustomerModel();
        this.createModalCloseBtn?.nativeElement.click();
        this.getAllCustomer();
      })
    }
  }

  delete(customer : CustomerModel){
    this.swal.callSwal('Müşteri Silinecek ?',`${customer.name} isimli müşteri silinecektir.Onaylıyor Musunuz ?`,() =>{
      this.http.post<string>("Customer/DeleteById",{id : customer.id},(res)=>{
        this.swal.callToast(res);
        this.getAllCustomer();
      })
    })
  }

  update(form : NgForm){
    if(form.valid){
      this.http.post<string>("Customer/Update",this.updateModel,(res) =>{
        this.swal.callToast(res);
        this.createModel = new CustomerModel();
        this.updateModalCloseBtn?.nativeElement.click();
        this.getAllCustomer();
      })
    }
  }
}
