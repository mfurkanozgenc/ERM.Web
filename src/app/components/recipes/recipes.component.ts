import { Component, ElementRef, ViewChild } from '@angular/core';
import { RecipeModel } from '../../models/RecipeModel';
import { ProductModel } from '../../models/productModel';
import { HttpService } from '../../services/http.service';
import { NgForm } from '@angular/forms';
import { SwalService } from '../../services/swal.service';
import { SharedModule } from '../../modules/shared.module';
import { RecipePipe } from '../../pipes/recipe.pipe';
import { RecipeDetailModel } from '../../models/RecipeDetailModel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [SharedModule,RecipePipe,RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  @ViewChild('createModalCloseBtn') createModalCloseBtn : ElementRef<HTMLButtonElement> | undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn : ElementRef<HTMLButtonElement> | undefined;
  products : ProductModel[] = [];
  semiProducts : ProductModel[] = [];
  recipes : RecipeModel[] = [];

  createModel : RecipeModel = new RecipeModel();
  updateModel : ProductModel = new ProductModel();
  search : string = '';


  detail : RecipeDetailModel = new RecipeDetailModel();

  constructor(
    private http : HttpService,
    private swal : SwalService
  ){

  }
  ngOnInit(): void {
    this.getAllRecipe();
    this.getAllProduct();
  }

  removeDetail(index : number){
    this.createModel.details.splice(index,1);
  }

  addDetail(){
    const prodcut = this.products.find(p => p.id === this.detail.productId);
    if(prodcut){
      var find = this.createModel.details.find(d => d.productId === this.detail.productId);
      if(find){
        let number1 = Number(find.quantity);
        let number2 = Number(this.detail.quantity);
        var total = number1 + number2;
        find.quantity = total;
      }
      else{
        this.detail.product = prodcut;
        this.createModel.details.push(this.detail);
      }
      this.detail = new RecipeDetailModel();
    }
  }
  getAllRecipe(){
     this.http.post<RecipeModel[]>("Recipe/GetAll",{},(res => {
      this.recipes = res;
     }))
  }

  getAllProduct(){
    this.http.post<ProductModel[]>("Product/GetAll",{},(res => {
     this.products = res;
     this.semiProducts = res.filter(p => p.type.value == 2); // Yarı Mamül
    }))
 }

  create(form : NgForm){
    if(form.valid){
      this.http.post<string>("Recipe/Create",this.createModel,(res) =>{
        this.swal.callToast(res);
        this.createModel = new RecipeModel();
        this.createModalCloseBtn?.nativeElement.click();
        this.getAllRecipe();
      })
    }
  }

  delete(recipe : RecipeModel){
    this.swal.callSwal('Reçete Silinecek ?',`${recipe.product.name} ürününe ait reçete silinecektir.Onaylıyor Musunuz ?`,() =>{
      this.http.post<string>("Recipe/DeleteById",{id : recipe.id},(res)=>{
        this.swal.callToast(res);
        this.getAllRecipe();
      })
    })
  }
}
