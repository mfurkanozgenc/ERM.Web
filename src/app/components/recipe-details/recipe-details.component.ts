import { Component, ElementRef, ViewChild } from '@angular/core';
import { RecipeDetailModel } from '../../models/RecipeDetailModel';
import { RecipeModel } from '../../models/RecipeModel';
import { ProductModel } from '../../models/productModel';
import { SwalService } from '../../services/swal.service';
import { HttpService } from '../../services/http.service';
import { NgForm } from '@angular/forms';
import { SharedModule } from '../../modules/shared.module';
import { RecipeDetailPipe } from '../../pipes/recipe-detail.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [SharedModule,RecipeDetailPipe],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {

  recipe : RecipeModel = new RecipeModel();
  products : ProductModel[] = [];
  search : string = '';
  recipeId : string = '';
  createModel : RecipeDetailModel = new RecipeDetailModel();
  updateModel : RecipeDetailModel = new RecipeDetailModel();
  updateFormActive : boolean = false;
  detail : RecipeDetailModel = new RecipeDetailModel();

  constructor(
    private http : HttpService,
    private swal : SwalService,
    private activated : ActivatedRoute
  ){
     this.activated.params.subscribe(res => {
        this.recipeId = res['id'];
     });
     this.getRecipeById();
     this.createModel.recipeId = this.recipeId;
     this.updateModel.recipeId = this.recipeId;
  }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getRecipeById(){
    this.http.post<RecipeModel>("RecipeDetail/GetRecipeByIdWithDetails",{recipeId:this.recipeId},(res => {
     this.recipe = res;
    }))
 }

 getAllProduct(){
   this.http.post<ProductModel[]>("Product/GetAll",{},(res => {
    this.products = res.filter(p => p.type.value == 2); // Yarı Mamül
   }))
}

  create(form : NgForm){
    if(form.valid){
      this.http.post<string>("RecipeDetail/Create",this.createModel,(res) =>{
        this.swal.callToast(res);
        this.createModel = new RecipeDetailModel();
        this.createModel.recipeId = this.recipeId;
        this.getRecipeById();
      })
    }
  }

  update(form : NgForm){
    if(form.valid){
      this.http.post<string>("RecipeDetail/Update",this.updateModel,(res) =>{
        this.swal.callToast(res);
        this.updateModel = new RecipeDetailModel();
        this.updateModel.recipeId = this.recipeId;
        this.getRecipeById();
        this.updateFormActive = false;
      })
    }
  }

  delete(recipe : RecipeDetailModel){
    this.swal.callSwal('Reçete Silinecek ?',`${recipe.product.name} ürünü silinecektir.Onaylıyor Musunuz ?`,() =>{
      this.http.post<string>("RecipeDetail/DeleteById",{id : recipe.id},(res)=>{
        this.swal.callToast(res);
        this.getRecipeById();
      })
    })
  }

  get(model : RecipeDetailModel){
    this.updateModel = {...model};
    this.updateModel.product = this.products.find(p => p.id === this.updateModel.productId) ?? new ProductModel();
    this.updateFormActive = true;
  }
}
