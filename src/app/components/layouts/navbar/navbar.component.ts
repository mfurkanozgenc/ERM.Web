import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DbService } from '../../../services/db.service';
import { SharedModule } from '../../../modules/shared.module';
import { AuthService } from '../../../services/auth.service';
import { UserModel } from '../../../models/userModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    public db : DbService,
    private auth : AuthService,
    private router : Router
  ){

  }
  exit(){
    localStorage.removeItem("token");
    this.auth.user = new UserModel();
    this.router.navigateByUrl('login');
  }
}
