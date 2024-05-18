import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRootService } from './api-root.service';
import { ResultModel } from '../models/result.models';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http : HttpClient,
    private apiRoot : ApiRootService,
    private auth : AuthService,
    private error : ErrorService
  ) { }
  post<T>(apiUrl : string,body : any , callBack:(res : T)=> void,errorCallBack?:()=> void){
    this.http.post<ResultModel<T>>(`${this.apiRoot.SERVER_URL}/${apiUrl}`,body,{
      headers : {
        "Authorization" : "Bearer " + this.auth.token
      }
    }).subscribe({
      next : (res) =>{
        callBack(res.data!);
      },
      error : (err : HttpErrorResponse)=>{
        this.error.errorHandler(err);
        if(errorCallBack){
          errorCallBack();
        }
      }
    })
  }
}
