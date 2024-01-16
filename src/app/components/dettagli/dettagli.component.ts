import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PazientiService } from 'src/app/service/pazienti.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  RequiredValidator,
} from '@angular/forms';
import { Commenti } from 'src/app/models/commenti';

@Component({
  selector: 'app-dettagli',
  templateUrl: './dettagli.component.html',
  styleUrls: ['./dettagli.component.scss'],
})
export class DettagliComponent implements OnInit {
  pazienteId: any;
  paziente: any = {};
  commentiForm: FormGroup;
  commenti: Commenti[] = [];

  constructor(
    private route: ActivatedRoute,
    private auth: PazientiService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.commentiForm = this.fb.group({
      dataSeduta: [null],
      collo: [''],
      mandibola: [''],
      orecchio: [''],
      testa: [''],
      vertigini: [''],
      nausea: [''],
      disturbiDellaVista: [''],
      acufeni: [''],
      instabilita: [''],
      statoGenerale: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pazienteId = params['id'];
      this.caricaDettagliPaziente(this.pazienteId);
    });
  }

  caricaDettagliPaziente(pazienteId: any) {
    this.auth.getPazienteById(pazienteId).subscribe((paziente: any) => {
      this.paziente = paziente;
    });

    this.auth.getCommentiByPazienteId(pazienteId).subscribe((commenti: any) => {
      this.commenti = [];
      commenti.forEach((commento: any) => {
        if (commento.commentid === pazienteId) {
          this.commenti.push(commento);
          console.log(this.commenti);
        }
      });
    });
  }

  deleteComm(commento: Commenti) {
    console.log(commento);
    if (window.confirm('vuoi cancellare la seduta?')) {
      this.auth.deleteComment(commento);
      console.log(commento.id);
    }
  }

  onSubmit() {
    if (this.commentiForm.valid) {
      const nuovoCommento: Commenti = this.commentiForm.value;
      this.auth.createComment(this.pazienteId, nuovoCommento).then(() => {
        this.caricaDettagliPaziente(this.pazienteId);
        this.commentiForm.reset();
      });
    }
  }
}
