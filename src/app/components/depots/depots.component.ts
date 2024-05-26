import { Component, ElementRef, ViewChild } from '@angular/core';
import { CustomerModel } from '../../models/customerModel';
import { SwalService } from '../../services/swal.service';
import { HttpService } from '../../services/http.service';
import { NgForm } from '@angular/forms';
import { SharedModule } from '../../modules/shared.module';
import { DepotPipe } from '../../pipes/depot.pipe';
import { DepotModel } from '../../models/depotModel';

@Component({
  selector: 'app-depots',
  standalone: true,
  imports: [SharedModule , DepotPipe],
  templateUrl: './depots.component.html',
  styleUrl: './depots.component.css'
})
export class DepotsComponent {
  @ViewChild('createModalCloseBtn') createModalCloseBtn : ElementRef<HTMLButtonElement> | undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn : ElementRef<HTMLButtonElement> | undefined;


  depots : DepotModel[] = [];
  createModel : DepotModel = new DepotModel();
  updateModel : DepotModel = new DepotModel();
  search : string = '';

  constructor(
    private http : HttpService,
    private swal : SwalService
  ){

  }
  ngOnInit(): void {
    this.geAllDepot();
  }

  openEditModal(depot : DepotModel){
     this.updateModel = {...depot};
  }

  geAllDepot(){
     this.http.post<DepotModel[]>("Depot/GetAll",{},(res => {
      this.depots = res;
     }))
  }

  create(form : NgForm){
    if(form.valid){
      this.http.post<string>("Depot/Create",this.createModel,(res) =>{
        this.swal.callToast(res);
        this.createModel = new DepotModel();
        this.createModalCloseBtn?.nativeElement.click();
        this.geAllDepot();
      })
    }
  }

  delete(depot : DepotModel){
    this.swal.callSwal('Depo Silinecek ?',`${depot.name} isimli depo silinecektir.Onaylıyor Musunuz ?`,() =>{
      this.http.post<string>("Customer/DeleteById",{id : depot.id},(res)=>{
        this.swal.callToast(res);
        this.geAllDepot();
      })
    })
  }

  update(form : NgForm){
    if(form.valid){
      this.http.post<string>("Depot/Update",this.updateModel,(res) =>{
        this.swal.callToast(res);
        this.updateModel = new DepotModel();
        this.updateModalCloseBtn?.nativeElement.click();
        this.geAllDepot();
      })
    }
  }
}
