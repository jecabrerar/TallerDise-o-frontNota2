import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad {
  constructor(private userService:UserService){}
  canLoad():Observable<boolean> | Promise<boolean>{    
    return this.userService.validateUser();
  }
    
  
}
