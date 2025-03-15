import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes'; 
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { firebaseConfig } from './environments/environment';
@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [provideFirebaseApp(() => initializeApp(firebaseConfig.firebaseConfig))],
  bootstrap: [] 
})
export class AppModule { }
