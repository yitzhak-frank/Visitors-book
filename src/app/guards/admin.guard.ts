import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private Auth: AuthService,
    private fbs: FirebaseService,
    private Router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(resolve => {
      this.Auth.user$.pipe(take(1)).subscribe(async user => {
        if(!user) {
          this.Router.navigate(['/home']);
          resolve(false);
          return;
        }
        const isAdmin = await this.fbs.isEmailRegister(user.email);
        if(!isAdmin) {
          this.Router.navigate(['/home']);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }

}
