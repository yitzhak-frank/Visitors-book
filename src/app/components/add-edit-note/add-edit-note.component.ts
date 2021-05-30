import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { NoteForm } from '../../interfaces/global';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-edit-note',
  templateUrl: './add-edit-note.component.html',
  styleUrls: ['./add-edit-note.component.scss']
})
export class AddEditNoteComponent implements OnInit {

  private noteId: string;

  public form: NoteForm = { name: '', title: '', note: '' };

  constructor(
    private fbs: FirebaseService,
    private Router: Router,
    private Route: ActivatedRoute
  ) {}

  private async getNote() {
    const result = await this.fbs.getNoteById(this.noteId)
    this.form = { name: result['name'], title: result['title'], note: result['note']};
  }

  public resetForm(): void {
    if(!this.noteId) this.form = { name: '', title: '', note: '' };
    else this.getNote();
  }

  public onSubmit({valid}: NgForm) {
    if(!valid) return;
    const navigate = () => this.Router.navigate(['/user']);
    if(!this.noteId) this.fbs.addNote({...this.form}).then(navigate);
    else this.fbs.editNote(this.noteId, this.form).then(navigate);
  }

  ngOnInit(): void {
    this.Route.queryParams.pipe(take(1)).subscribe(({noteId}) => {
      this.noteId = noteId;
      if(this.noteId) this.getNote();
    });
  }

}
