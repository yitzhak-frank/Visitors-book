import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public uid: string;
  public notes = [];

  constructor(
    private fbs: FirebaseService,
    private Router: Router
    ) {}

  public addNote(): void {
    this.Router.navigate(['/user/note']);
  }

  public editNote({target: {id}}, noteId: string): void {
    if(id === 'delete') return;
    this.Router.navigate(['/user/note'], {queryParams: {noteId}});
  }

  public deleteNote(noteId: string) {
    if(window.confirm('Are you sure you want to delete this note?')){
      this.fbs.deleteNote(noteId).then(() => this.getUserNotes());
    }
  }

  private async getUserNotes() {
    this.notes = await this.fbs.getUserNotes();
  }

  ngOnInit(): void {
    this.getUserNotes();
  }
}
