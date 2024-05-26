import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserModel, UserRoleTypeEnum } from '../../models/userModel';
import { SwalService } from '../../services/swal.service';
import { HttpService } from '../../services/http.service';
import { NgForm } from '@angular/forms';
import { SharedModule } from '../../modules/shared.module';
import { AuthService } from '../../services/auth.service';
import { UserPipe } from '../../pipes/user.pipe';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SharedModule,UserPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  @ViewChild('createModalCloseBtn') createModalCloseBtn : ElementRef<HTMLButtonElement> | undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn : ElementRef<HTMLButtonElement> | undefined;

  roles = [{name : "Admin",value : 1},{name : "Çalışan",value : 2}]
  users : UserModel[] = [];
  createModel : UserModel = new UserModel();
  updateModel : UserModel = new UserModel();
  search : string = '';
  isActiveUser : boolean = false;
  constructor(
    private http : HttpService,
    private swal : SwalService,
    public auth : AuthService
  ){

  }
  ngOnInit(): void {
    this.geAllUser();
  }

  openEditModal(user : UserModel){
     this.updateModel = {...user};
     this.updateModel.roleValueNumber = user.userRole.value;
     this.isActiveUser = user.userName === this.auth.user.userName;
  }

  geAllUser(){
     this.http.post<UserModel[]>("User/GetAll",{},(res => {
      this.users = res;
     }))
  }

  create(form : NgForm){
    if(form.valid){
      this.http.post<string>("User/Create",this.createModel,(res) =>{
        this.swal.callToast(res);
        this.createModel = new UserModel();
        this.createModalCloseBtn?.nativeElement.click();
        this.geAllUser();
      })
    }
  }

  delete(user : UserModel){
    this.swal.callSwal('Kullanıcı Silinecek ?',`${user.firstName} isimli kullanıcı silinecektir.Onaylıyor Musunuz ?`,() =>{
      this.http.post<string>("User/DeleteById",{id : user.id},(res)=>{
        this.swal.callToast(res);
        this.geAllUser();
      })
    })
  }
  update(){
      this.http.post<string>("User/Update",this.updateModel,(res) =>{
        this.swal.callToast(res);
        this.updateModel = new UserModel();
        this.updateModalCloseBtn?.nativeElement.click();
        if(this.isActiveUser){
          this.auth.exit();
          localStorage.removeItem("rememberInfo");
        }
        else{
          this.geAllUser();
        }
      })
  }
}
