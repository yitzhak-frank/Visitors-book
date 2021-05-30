import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  @Output() close = new EventEmitter()

  public forgotPasswordIndex: boolean;
  public form = {
    email: '',
    pass: ''
  }

  constructor(private fbs: FirebaseService, private Auth: AuthService) { }

  public closeForm() {
    this.close.emit();
  }

  public forgotPassword(): void {
    this.forgotPasswordIndex = true;
  }

  public async onSubmit({valid}: NgForm) {
    if(!valid) return;

    const isAdmin = await this.fbs.isEmailRegister(this.form.email.toLowerCase());
    if(!isAdmin) return window.alert('Wrong email address please try again');

    if(this.forgotPasswordIndex) {
      return this.Auth.forgotPassword(this.form.email)
      .then(() => window.alert('Reset email has been send to your email address'))
      .catch(() => window.alert('Something went wrong please try again later'));
    }

    const login = await this.Auth.adminLogin(this.form.email, this.form.pass);
    if(!login.user) return window.alert('Wrong email or password please try again');

    this.close.emit();
  }

  ngOnInit(): void {}

}
