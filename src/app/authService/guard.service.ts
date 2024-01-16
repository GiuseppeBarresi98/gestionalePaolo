import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class GuardService {
  constructor(private router: Router, private auth: LoginService) {}

  canActivate(): boolean {
    console.log('GuardService: canActivate triggered');

    if (this.auth.isloggedIn) {
      console.log('GuardService: User is logged in, allowing access');
      return true;
    } else {
      console.log('GuardService: User is not logged in, redirecting to login');
      this.router.navigate(['/']);
      return false;
    }
  }
}
