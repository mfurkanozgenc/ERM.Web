import { Injectable } from '@angular/core';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkControlService {

  constructor(
    private db : DbService
  ) { }

  networkStatusControl() {
    window.addEventListener('online', () => {
        this.setNetworkStatus(true);
    });
    window.addEventListener('offline', () => {
        this.setNetworkStatus(false);
    });
}

setNetworkStatus(status : boolean) {
    if (this.db.networkStatus !== status) {
        this.db.networkStatus = status;
    }
}
}
