import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2'; 
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { GlobalVariable } from './shared/globals';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
/* Feature Modules */
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module'; 
import { FilmCategoryModule } from './films-category/film-category.module';
import { CoreModule } from './core/core.module'; 
import * as firebase from 'firebase';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    AppRoutingModule,
    AngularFireModule.initializeApp(GlobalVariable.fireConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    SharedModule,
    FilmCategoryModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
 