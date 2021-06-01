import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { NoteComponent } from './components/note/note.component';
import { AdminComponent } from './components/admin/admin.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { BackHomeComponent } from './components/back-home/back-home.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AddEditNoteComponent } from './components/add-edit-note/add-edit-note.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoteComponent,
    UserComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    BackHomeComponent,
    AdminLoginComponent,
    AddEditNoteComponent,
    LoadingComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
