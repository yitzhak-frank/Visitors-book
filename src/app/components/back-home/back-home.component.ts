import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-home',
  template: `<i class="fas fa-home" (click)="goHome()"></i>`,
  styles: [`
    i {
      position: fixed;
      top: 90px;
      left: 10px;
      font-size: 27px;
      padding: 10px;
      border-radius: 7px;
      color: white;
      background-color: rgba(0,0,0,0.5);
      box-shadow: 0 0 12px white;
      transition: 0.4s;
    }
    i:hover {
      cursor: pointer;
      transform: scale(1.1);
      background-color: rgba(0,0,0,0.75);
    }
  `]
})
export class BackHomeComponent implements OnInit {

  constructor(private Router: Router) { }

  public goHome(): void {
    this.Router.navigate(['/home']);
  }

  ngOnInit(): void {}

}
