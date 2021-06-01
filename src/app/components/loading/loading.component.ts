import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-loading',
  template: `
    <div *ngIf="fbs.loading" class="d-flex align-items-center justify-content-center">
        <i class="fas fa-spinner fa-spin"></i>
        <h2>Loading...</h2>
    </div>
  `,
  styles: [`
    div {
      position: fixed;
      top: 0; bottom: 0; left: 0; right: 0;
      z-index: 9;
      background-color: rgba(0, 0, 0, 0.5)
    }
    i, h2 {
      color: white;
    }
    i {
      font-size: 3rem;
      margin-right: 5px;
    }
  `]
})
export class LoadingComponent implements OnInit {

  constructor(public fbs: FirebaseService) {}

  ngOnInit(): void {}

}
