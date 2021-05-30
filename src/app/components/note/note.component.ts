import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  public note;

  constructor(private fbs: FirebaseService, private Router: Router, private Route: ActivatedRoute) {}

  ngOnInit(): void {
    this.Route.queryParams.pipe(take(1), switchMap(async ({noteId}) => {
      if(!noteId) return this.Router.navigate(['/home']);
      return await this.fbs.getNoteById(noteId);
    })).pipe(take(1)).subscribe(note => this.note = note);
  }

}
