import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public  totalNotes:  number;
  public  totalUsers:  number;
  public  pagesCount:  number;
  public  currentPage: number = 1;
  public  pagesAr:     any[];
  public  notes;

  constructor(private fbs: FirebaseService, private Router: Router) { }

  private async getNotes() {
    const result = await this.fbs.getNotes((this.currentPage -1) * 10, 10);
    this.notes = result;
  }

  public async getNotesCount() {
    const result = await this.fbs.getNotesCount();
    this.totalNotes = result['count'];
    this.pagesCount = Math.ceil(this.totalNotes / 10);
    this.pagesAr    = new Array(this.pagesCount);
  }

  public async getUsersCount() {
    const result = await this.fbs.getUsersCount()
    this.totalUsers = result['count'];
  }

  public changeCurrentPage(page: number): void {
    if(!page || page > this.pagesCount) return;
    this.currentPage = page;
    this.getNotes();
  }

  public showNote({target: {id}}, noteId: string): void {
    if(id === 'delete') return;
    this.Router.navigate(['/admin/note'], {queryParams: {noteId}});
  }

  public async deleteNote(noteId: string) {
    if(window.confirm('Are you sure you want to delete this note?')) {
      await this.fbs.deleteNote(noteId)
      this.getNotes();
      this.getNotesCount();
    }
  }

  ngOnInit(): void {
    this.getNotes();
    this.getUsersCount();
    this.getNotesCount();
  }
}
