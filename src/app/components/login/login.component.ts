import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { Loginmodel } from '../../models/loginModel';
import { HttpService } from '../../services/http.service';
import { LoginResponseModel } from '../../models/loginResponseModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model : Loginmodel = new Loginmodel();
  isRemember : boolean = false;
  constructor(
    private http : HttpService,
    private router : Router
  ){
     if(localStorage.getItem("rememberInfo")){
      this.model = JSON.parse(localStorage.getItem("rememberInfo") ?? "") ?? "";
      this.isRemember = true;
     }
  }
  signIn(){
    if(!this.model.emailOrUserName || !this.model.password) {return;}
     this.http.post<LoginResponseModel>("Auth/Login",this.model,(res)=>{
      localStorage.setItem('token',res.token);
      if(this.isRemember){
        localStorage.setItem("rememberInfo",JSON.stringify(this.model));
      }
      else{
        localStorage.removeItem("rememberInfo");
      }
      this.router.navigateByUrl('/');
     })
  }
  remember(){
    this.isRemember = !this.isRemember;
  }
}
