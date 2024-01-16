import { Component, OnInit } from '@angular/core';
import { Pazienti } from 'src/app/models/pazienti';
import { PazientiService } from 'src/app/service/pazienti.service';
import { LoginService } from 'src/app/authService/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pazienti: Pazienti[] = [];
  pazientiObj: any = {
    userId: '',
    nome: '',
    eta: 0,
    height: 0,
    peso: 0,
    condizioni: '',
    diagnosi: '',
    obbiettivo: '',
  };

  nome: string = '';
  eta: number = 0;
  height: number = 0;
  peso: number = 0;
  condizioni: string = '';
  diagnosi: string = '';
  obbiettivo: string = '';
  constructor(
    private auth: PazientiService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.getAuthState().subscribe((userId) => {
      this.pazientiObj.userId = userId || '';
    });
  }

  addPazienti() {
    this.pazientiObj.nome = this.nome;
    this.pazientiObj.eta = this.eta;
    this.pazientiObj.height = this.height;
    this.pazientiObj.peso = this.peso;
    this.pazientiObj.condizioni = this.condizioni;
    this.pazientiObj.diagnosi = this.diagnosi;
    this.pazientiObj.obbiettivo = this.obbiettivo;
    this.auth.salvaSchedaPaziente(this.pazientiObj);

    this.resetform();
  }

  resetform() {
    this.nome = '';
    this.eta = 0;
    this.height = 0;
    this.peso = 0;
    this.condizioni = '';
    this.diagnosi = '';
    this.obbiettivo = '';
  }
}
