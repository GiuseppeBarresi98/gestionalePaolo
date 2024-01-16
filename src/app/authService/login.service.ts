import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user: User | null = null;
  isRegistering = false;
  isloggedIn = false;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this.auth.authState.subscribe((user) => {
      this.user = user ? { id: user.uid, email: user.email || '' } : null;
      this.isRegistering = false;
      this.isloggedIn = !!user;
    });

    this.auth.getRedirectResult().then((result) => {
      if (result.user) {
        this.user = { id: result.user.uid, email: result.user.email || '' };
        this.isloggedIn = true;
        this.router.navigate(['/']);
      }
    });
  }

  getAuthState(): Observable<string | null> {
    return this.auth.authState.pipe(map((user) => (user ? user.uid : null)));
  }

  login(email: string, password: string) {
    this.isloggedIn = true;
    this.isRegistering = true;
    this.auth.signInWithEmailAndPassword(email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        if (user) {
          this.user = { id: user.uid, email: user.email || '' };
          localStorage.setItem('loggedInUser', JSON.stringify(this.user));
          this.isloggedIn = true;

          this.router.navigate(['/']);
        }
      },
      (error) => {
        alert('Qualcosa è andato storto, riprova');
        this.router.navigate(['/login']);
      }
    );
  }

  register(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then(
      () => {
        alert('Registrazione avvenuta con successo');
        this.isloggedIn = false;
        console.log(this.isloggedIn);

        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Registrazione errata');
      }
    );
  }

  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('loggedInUser');
      this.isloggedIn = false;
      this.router.navigate(['/login']);
    });
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }
}
