import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/authService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private auth: LoginService) {}

  ngOnInit(): void {}

  login() {
    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
