import { Component, OnInit } from '@angular/core';
import { Pazienti } from 'src/app/models/pazienti';
import { PazientiService } from 'src/app/service/pazienti.service';
import { LoginService } from 'src/app/authService/login.service';
import { Router } from '@angular/router';
import { Commenti } from 'src/app/models/commenti';

@Component({
  selector: 'app-pazienti',
  templateUrl: './pazienti.component.html',
  styleUrls: ['./pazienti.component.scss'],
})
export class PazientiComponent implements OnInit {
  pazienti: Pazienti[] = [];
  pazienteCercato: Pazienti | undefined;

  searchString: string = '';
  userId: string = '';

  constructor(
    private auth: PazientiService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const loggedInUser = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    );
    this.userId = loggedInUser.id || '';
    this.loadUserPazienti();
  }

  loadUserPazienti() {
    if (this.userId) {
      this.auth.getPazientiByUserId(this.userId).subscribe(
        (data: any) => {
          console.log('Dati ottenuti:', data);
          this.pazienti = data.map((item: any) => ({
            id: item.payload.doc.id,
            ...item.payload.doc.data(),
          }));
        },
        (error) => {
          console.error('Errore nel recupero dei pazienti:', error);
        }
      );
    }
  }

  deletePa(paziente: Pazienti) {
    if (window.confirm('Sei sicuro di voler eliminare il paziente?')) {
      this.auth.deletePaziente(paziente);
    }
  }
  search(term: string): void {
    this.pazienteCercato = this.searchString
      ? this.pazienti.find((pazienti) =>
          pazienti.nome.toLowerCase().includes(this.searchString.toLowerCase())
        )
      : undefined;
  }

  visualizzazionePazienti(paziente: Pazienti) {
    this.router.navigate(['/dettagli-paziente', paziente.id]);
  }
}
