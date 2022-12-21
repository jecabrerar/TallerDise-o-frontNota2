import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {
  constructor(private userService:UserService, private router:Router){}
  canLoad(): Observable<boolean> | Promise<boolean> {
    
    return new Observable<boolean>(obs=>{
      this.userService.isAdmin().subscribe((resp:any)=>{
        if (resp.ok){
          obs.next(true);
        }else{
          this.router.navigate(['/login']);
          obs.next(false);
        }
      })
    });
  }
}
