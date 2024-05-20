import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NetworkControlService } from './services/network-control.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template:`<router-outlet></router-outlet>`
})
export class AppComponent {

  constructor(
    private networkStatus : NetworkControlService
  ){
      this.networkStatus.networkStatusControl();
  }
}
