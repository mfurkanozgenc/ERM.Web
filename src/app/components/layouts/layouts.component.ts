import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ControlSidearComponent } from './control-sidear/control-sidear.component';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,MainSidebarComponent,FooterComponent,ControlSidearComponent],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css'
})
export class LayoutsComponent {

}
