import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorsService {

  constructor(private router:Router) { }

  intercept(req:HttpRequest<any>, resp:HttpResponse<any>, next:HttpHandler):Observable<HttpEvent<any>>
  {
    
    let response = resp;

    if(resp.status == 401){
      this.router.navigate(['/login']);
    }
        
    return next.handle(req);
  }
}
