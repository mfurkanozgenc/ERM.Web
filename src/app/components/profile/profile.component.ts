import { Component } from '@angular/core';
import { OrderModel } from '../../models/orderModel';
import { ReportModel } from '../../models/reportModel';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { DatePipe } from '@angular/common';
import { SharedModule } from '../../modules/shared.module';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../models/userModel';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule],
  providers : [DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user : UserModel = new UserModel();
  constructor(
    public auth : AuthService,
    private http: HttpService,
    private swal: SwalService,
    private router : Router
  ){
    this.user = structuredClone(this.auth.user);
  }

  update(form: NgForm) {
    const areEqual = JSON.stringify(this.user) === JSON.stringify(this.auth.user);
    console.log(areEqual);
    if (form.valid && !areEqual) {
      this.http.post<string>('User/Update', this.user, (res) => {
        this.swal.callToast(res);
        this.router.navigateByUrl("login");
      });
    }
  }
}
