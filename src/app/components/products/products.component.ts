import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductModel, ProductTypes } from '../../models/productModel';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { NgForm } from '@angular/forms';
import { SharedModule } from '../../modules/shared.module';
import { ProductPipe } from '../../pipes/product.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SharedModule,ProductPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  @ViewChild('createModalCloseBtn') createModalCloseBtn : ElementRef<HTMLButtonElement> | undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn : ElementRef<HTMLButtonElement> | undefined;
  products : ProductModel[] = [];
  createModel : ProductModel = new ProductModel();
  updateModel : ProductModel = new ProductModel();
  search : string = '';
  types = ProductTypes;
  constructor(
    private http : HttpService,
    private swal : SwalService
  ){

  }
  ngOnInit(): void {
    this.getAllProduct();
  }

  openEditModal(product : ProductModel){
     this.updateModel = {...product};
     this.updateModel.typeValue = product.type.value;
  }

  getAllProduct(){
     this.http.post<ProductModel[]>("Product/GetAll",{},(res => {
      this.products = res;
     }))
  }

  create(form : NgForm){
    if(form.valid){
      this.http.post<string>("Product/Create",this.createModel,(res) =>{
        this.swal.callToast(res);
        this.createModel = new ProductModel();
        this.createModalCloseBtn?.nativeElement.click();
        this.getAllProduct();
      })
    }
  }

  delete(product : ProductModel){
    this.swal.callSwal('Ürün Silinecek ?',`${product.name} isimli ürün silinecektir.Onaylıyor Musunuz ?`,() =>{
      this.http.post<string>("Customer/DeleteById",{id : product.id},(res)=>{
        this.swal.callToast(res);
        this.getAllProduct();
      })
    })
  }

  update(form : NgForm){
    if(form.valid){
      this.http.post<string>("Product/Update",this.updateModel,(res) =>{
        this.swal.callToast(res);
        this.createModel = new ProductModel();
        this.updateModalCloseBtn?.nativeElement.click();
        this.getAllProduct();
      })
    }
  }
}
