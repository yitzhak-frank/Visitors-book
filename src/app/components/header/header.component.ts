import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public  isLogedIn: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private Auth: AuthService, private Router: Router ) {}

  public async logOut() {
    await this.Auth.logOut();
    this.Router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.subscriptions.push(this.Auth.user$.subscribe(user => this.isLogedIn = !!user));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
