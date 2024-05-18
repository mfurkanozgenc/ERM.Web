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

  constructor(
    private http : HttpService,
    private router : Router
  ){

  }
  signIn(){
    if(!this.model.emailOrUserName || !this.model.password) {return;}
     this.http.post<LoginResponseModel>("Auth/Login",this.model,(res)=>{
      localStorage.setItem('token',res.token);
      this.router.navigateByUrl('/');
     })
  }
}
