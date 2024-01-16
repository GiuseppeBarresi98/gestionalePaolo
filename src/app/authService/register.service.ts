import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  isRegister = false;

  register(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then(
      () => {
        alert('Registrazione avvenuta con successo');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Registrazione errata');
      }
    );
  }
}
