import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/authService/login.service';
import { RegisterService } from 'src/app/authService/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private auth: RegisterService, private authl: LoginService) {}

  email: string = '';
  password: string = '';
  ngOnInit(): void {}
  register() {
    if (this.email === '' || this.password === '') {
      alert('inserisci email e password');
    } else {
      this.authl.register(this.email, this.password);
      this.email = '';
      this.password = '';
    }
  }
}
