import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note, NoteForm } from '../interfaces/global';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private apiUrl: string = '/';
  public loading: boolean = true;

  constructor(
    private Auth: AuthService,
    private http: HttpClient
  ) {}

  private async setTokenHeaders(): Promise<HttpHeaders> {
    const token = await this.Auth.getUserToken();
    return new HttpHeaders().append('x-auth-token', token);
  }

  public getNotes (skip: number, limit: number): Promise<Note[] | any> {
    return this.post('getNotes', {skip, limit});
  }

  public getUserNotes (): Promise<Note[] | any> {
    return this.post('getUserNotes', {uid: this.Auth.uid});
  }

  public getNoteById(id: string): Promise<Note | any> {
    return this.post('getNoteById', {uid: this.Auth.uid, id});
  }

  public addNote (note: NoteForm) {
    return this.post('addNote', {note});
  }

  public editNote (id: string, note: NoteForm) {
    return this.put('editNote', {uid: this.Auth.uid, id, note});
  }

  public deleteNote (id: string) {
    return this.post('deleteNote', {uid: this.Auth.uid, id});
  }

  public getNotesCount(): Promise<{count: number} | any> {
    return this.get('getNotesCount');
  }

  public getUsersCount(): Promise<{count: number} | any> {
    return this.get('getUsersCount');
  }

  public updateUsersCount() {
    return this.patch('updateUsersCount', {uid: this.Auth.uid});
  }

  public async isEmailRegister(email: string): Promise<boolean | any> {
    return await this.http.post(this.apiUrl + 'isEmailRegister', {email}).toPromise();
  }

  public async get(route: string) {
    this.loading  = true;
    const headers = await this.setTokenHeaders();
    const result  = await this.http.get(this.apiUrl + route, {headers}).toPromise();
    this.loading  = false;
    return result;
  }

  public async post(route: string, body: {}) {
    this.loading  = true;
    const headers = await this.setTokenHeaders();
    const result  = await this.http.post(this.apiUrl + route, body, {headers}).toPromise();
    this.loading  = false;
    return result;
  }

  public async put(route: string, body: {}) {
    this.loading  = true;
    const headers = await this.setTokenHeaders();
    const result  = await this.http.put(this.apiUrl + route, body, {headers}).toPromise();
    this.loading  = false;
    return result;
  }
  public async patch(route: string, body: {}) {
    this.loading  = true;
    const headers = await this.setTokenHeaders();
    const result  = await this.http.patch(this.apiUrl + route, body, {headers}).toPromise();
    this.loading  = false;
    return result;
  }
}
