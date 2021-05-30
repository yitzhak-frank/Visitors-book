import { NgModule } from '@angular/core';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
import { HomeComponent } from './components/home/home.component';
import { NoteComponent } from './components/note/note.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { Routes, RouterModule } from '@angular/router';
import { AddEditNoteComponent } from './components/add-edit-note/add-edit-note.component';

const routes: Routes = [
  { path: 'home',       component: HomeComponent },
  { path: 'user/home',  component: UserComponent,        canActivate: [UserGuard] },
  { path: 'user/note',  component: AddEditNoteComponent, canActivate: [UserGuard] },
  { path: 'admin/home', component: AdminComponent,       canActivate: [AdminGuard] },
  { path: 'admin/note', component: NoteComponent,        canActivate: [AdminGuard] },

  { path: 'user',  redirectTo: 'user/home',  pathMatch: 'full' },
  { path: 'admin', redirectTo: 'admin/home', pathMatch: 'full' },
  { path: '**',    redirectTo: 'home',       pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
