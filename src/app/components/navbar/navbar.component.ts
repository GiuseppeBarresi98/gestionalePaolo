import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/authService/login.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  islogged = false;
  constructor(
    private auth: LoginService,
    private authr: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.isloggedIn = false;
    console.log(this.islogged);
    this.auth.getAuthState().subscribe((userId: any) => {
      if (!!userId === true && this.auth.isloggedIn === true) {
        this.islogged = true;
      }
      console.log(this.islogged);
    });
  }

  logout() {
    this.auth.logout();
    this.islogged = false;
  }
}
