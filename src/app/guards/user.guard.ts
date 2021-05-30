import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private Auth: AuthService, private Router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(resolve => {
      this.Auth.user$.pipe(take(1)).subscribe(user => {
        if(!user || (route.queryParams.uid && route.queryParams.uid !== user.uid)) {
          this.Router.navigate(['/home']);
          resolve(false)
        } else resolve(true);
      });
    });
  }
}
