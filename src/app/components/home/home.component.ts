import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public  showFormIndex: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    private Auth: AuthService,
    private Router: Router,
    private fds: FirebaseService
  ) {}

  public async userLogin () {
    const { user } = await this.Auth.anonymousLogin();
    // wait for getting user for token
    if(user) this.Auth.user$.pipe(take(2)).subscribe( user => user && this.fds.updateUsersCount());
  }

  public showLoginForm(): void {
    this.showFormIndex = true;
  }

  public closeLoginForm(): void {
    this.showFormIndex = false;
  }

  ngOnInit(): void {
    const subscription = this.Auth.user$.subscribe(user => {
      if(!user) return;
      if(user.isAnonymous) this.Router.navigate(['/user']);
      else this.Router.navigate(['/admin']);
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
