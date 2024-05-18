import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private swal : SwalService
  ) { }

  errorHandler(error : HttpErrorResponse){
    console.log("ERROR",error);
    if(error.status === 403){
      let errorMessage = '';
      for (const e of error.error.ErrorMessages) {
        errorMessage += e + '\n';
      }
      this.swal.callToast(errorMessage,'error');
    }
    else if(error.status === 500){
      this.swal.callToast(error.error.errorMessages[0],'error')
    }
  }
}
