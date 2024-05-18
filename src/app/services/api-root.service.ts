import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiRootService {

  SERVER_MODE : number = 0;
  SERVER_URL : string = '';
  constructor()
  {
    if(this.SERVER_MODE ===0){
      this.SERVER_URL = 'https://localhost:7054/api';
    }

  }
}
