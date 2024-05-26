import { Component } from '@angular/core';
import { MenuModel, Menus } from '../../../menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuPipe } from '../../../pipes/menu.pipe';
import { AuthService } from '../../../services/auth.service';
import { HttpService } from '../../../services/http.service';
import { InvoiceModel } from '../../../models/invoiceModel';
import { DbService } from '../../../services/db.service';


@Component({
  selector: 'app-main-sidebar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,FormsModule,MenuPipe],
  templateUrl: './main-sidebar.component.html',
  styleUrl: './main-sidebar.component.css'
})
export class MainSidebarComponent {
   menus = Menus;
   search : string = '';

   constructor(
    public auth : AuthService,
    private http : HttpService,
    private db : DbService
   )
   {

   }

   get(subMenu : MenuModel){
    this.getAllInvoice(subMenu.isInvoiceType);
   }
   getAllInvoice(type : number) {
    this.http.post<InvoiceModel[]>('Invoice/GetAll', {type : type}, (res) => {
      this.db.invoices = res;
    });
  }
}
