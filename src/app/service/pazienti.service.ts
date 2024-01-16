import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Pazienti } from '../models/pazienti';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Commenti } from '../models/commenti';

@Injectable({
  providedIn: 'root',
})
export class PazientiService {
  constructor(private firestore: AngularFirestore) {}
  documentId: any;

  salvaSchedaPaziente(paziente: Pazienti) {
    const loggedInUser = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    );

    if (loggedInUser.id) {
      paziente.userId = loggedInUser.id;
      paziente.id = this.firestore.createId();

      return this.firestore
        .collection('pazienti')
        .doc(paziente.id)
        .set(paziente);
    } else {
      console.error("ID dell'utente non trovato");
      return Promise.reject("ID dell'utente non trovato");
    }
  }

  addPaziente(nuovoPaziente: Pazienti) {
    return this.firestore.collection('pazienti').add(nuovoPaziente);
  }

  tuttiPazienti() {
    return this.firestore.collection('/pazienti').snapshotChanges();
  }

  deletePaziente(paziente: Pazienti) {
    return this.firestore.doc('/pazienti/' + paziente.id).delete();
  }

  getPazientiByUserId(userId: string) {
    return this.firestore
      .collection('pazienti', (ref) => ref.where('userId', '==', userId))
      .snapshotChanges();
  }

  getPazienteById(pazienteId: string) {
    return this.firestore.collection('pazienti').doc(pazienteId).valueChanges();
  }

  searchPazienti(term: string): Observable<any[]> {
    return this.firestore
      .collection('pazienti', (ref) =>
        ref.where('nome', '>=', term).where('nome', '<=', term + '\uf8ff')
      )
      .valueChanges();
  }

  createComment(pazienteId: string, commento: Commenti) {
    commento.id = this.firestore.createId();
    commento.commentid = pazienteId;

    return this.firestore
      .collection('/commenti')
      .doc(commento.id)
      .set(commento);
  }

  getCommentiByPazienteId(pazienteId: string) {
    return this.firestore.collection('commenti').valueChanges();
  }

  deleteComment(commento: Commenti) {
    return this.firestore.doc('/commenti/' + commento.id).delete();
  }
}
