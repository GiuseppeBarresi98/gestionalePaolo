import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PazientiComponent } from './components/pazienti/pazienti.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { CanActivate } from '@angular/router';

import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DettagliComponent } from './components/dettagli/dettagli.component';
import { GuardService } from './authService/guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'pazienti',
    component: PazientiComponent,
    canActivate: [GuardService],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dettagli-paziente/:id',
    component: DettagliComponent,
    canActivate: [GuardService],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PazientiComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    DettagliComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
