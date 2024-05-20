import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DbService } from '../../../services/db.service';
import { SharedModule } from '../../../modules/shared.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    public db : DbService
  ){

  }
}
