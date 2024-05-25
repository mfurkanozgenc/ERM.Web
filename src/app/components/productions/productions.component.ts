import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductionModel } from '../../models/productionModel';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { NgForm } from '@angular/forms';
import { DepotModel } from '../../models/depotModel';
import { ProductModel } from '../../models/productModel';
import { SharedModule } from '../../modules/shared.module';
import { ProductionPipe } from '../../pipes/production.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-productions',
  standalone: true,
  imports: [SharedModule,ProductionPipe],
  providers : [DatePipe],
  templateUrl: './productions.component.html',
  styleUrl: './productions.component.css',
})
export class ProductionsComponent {
  @ViewChild('createModalCloseBtn') createModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;

  productions: ProductionModel[] = [];
  depots: DepotModel[] = [];
  products: ProductModel[] = [];
  createModel: ProductionModel = new ProductionModel();
  updateModel: ProductionModel = new ProductionModel();
  search: string = '';

  constructor(private http: HttpService, private swal: SwalService) {}
  ngOnInit(): void {
    this.geAllProduction();
    this.geAllDepot();
    this.geAllProduct();
  }

  openEditModal(production: ProductionModel) {
    this.updateModel = { ...production };
  }

  geAllProduction() {
    this.http.post<ProductionModel[]>('Production/GetAll', {}, (res) => {
      this.productions = res;
    });
  }

  geAllProduct() {
    this.http.post<ProductModel[]>('Product/GetAll', {}, (res) => {
      this.products = res;
    });
  }

  geAllDepot() {
    this.http.post<DepotModel[]>('Depot/GetAll', {}, (res) => {
      this.depots = res;
    });
  }

  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Production/Create', this.createModel, (res) => {
        this.swal.callToast(res);
        this.createModel = new ProductionModel();
        this.createModalCloseBtn?.nativeElement.click();
        this.geAllProduction();
      });
    }
  }

  delete(production: ProductionModel) {
    this.swal.callSwal(
      'Üretim Silinecek ?',
      `${production.productionNumber} numaralı üretim silinecektir.Onaylıyor Musunuz ?`,
      () => {
        this.http.post<string>(
          'Production/DeleteById',
          { id: production.id },
          (res) => {
            this.swal.callToast(res);
            this.geAllProduction();
          }
        );
      }
    );
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Production/Update', this.updateModel, (res) => {
        this.swal.callToast(res);
        this.createModel = new ProductionModel();
        this.updateModalCloseBtn?.nativeElement.click();
        this.geAllProduction();
      });
    }
  }
}
