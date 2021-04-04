import { Injectable } from '@angular/core';
import { WebServiceHandler } from './webServiceHandler';
import { Constant } from './constant';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public BASE_URL: string = this.constant.BASE_URL;
  public BASE_URL_NEW: string = this.constant.BASE_URL_NEW;
  public demolink: string = this.constant.demo_url;
  public basic_url: string = this.constant.basic_url;

  constructor(private constant: Constant, public WebserviceHandler: WebServiceHandler) { }

  GetDataApi(){
    var URL = this.basic_url + 'api/users';
    return this.WebserviceHandler.Get(URL).pipe(map(data => {
      return data;
    }, error => {
      return error;
   }));
  }

  ScrollPageApi(Parameter) {
    var URL = this.demolink + 'users?page=' + Parameter.page;
    return this.WebserviceHandler.get(URL).pipe(map(data => {
      return data;
      
    }, error => {
      return error;

    }));
    
  }

  //  ScrollPageApi(Parameter) {
  //   var URL = this.demolink + 'users';
  //   return this.WebserviceHandler.Post(URL, Parameter).pipe(map(data => {
  //     console.log("jsondata",data);
  //     return data;
      
  //   }, error => {
  //     return error;

  //   }));
    
  // }

  GetLoginPageApi(Parameter) {
    var URL = this.BASE_URL_NEW + 'user/login';
    return this.WebserviceHandler.Post(URL, Parameter).pipe(map(data => {
      console.log("jsondata",data);
      return data;
      
    }, error => {
      return error;

    }));
    
  }

  Demoapi(Parameter) {
    var URL = this.demolink + 'users';
    return this.WebserviceHandler.Post(URL, Parameter).pipe(map(data => {
      // return data.json();
    }, error => {
      return error;

    }));
  }

  onLogoutApi(Parameter)
  {
    var URL = this.BASE_URL + 'Logout';
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;

    }));

  }
}
