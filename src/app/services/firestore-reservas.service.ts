import { Injectable } from '@angular/core';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionData, getDocs, orderBy, query, where } from '@angular/fire/firestore';
import { Reservas } from '../models/reservas';
import { ReturnStatement } from '@angular/compiler';
import { Inmuebles } from '../models/inmuebles';
import { Users } from '../models/users';
import { FirestoneUsersService } from './firestone-users.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreReservasService {
  private _collection: CollectionReference<Reservas>;
  private _collectionUsers: CollectionReference<Users>;
  private _reservas: any;

  constructor(private _firestore: Firestore, private _usersService: FirestoneUsersService) {
    this._collection = collection(this._firestore, 'reservas') as CollectionReference<Reservas>;
    this._collectionUsers = collection(this._firestore, 'users') as CollectionReference<Users>;
  }
  //Selecciono todas las reservas y las meto en un array
  selectReservas() {
    if (this._usersService.isSessionActive()) {
      let queryCode = query(this._collection, orderBy("hora"));

      collectionData(queryCode, { 'idField': 'id' }).subscribe({
        next: (data: Reservas[]) => {

          //Recorro cada reserva buscando el usuario que coincide con la id de usuario que tiene reserva
          //Una vez encontrado le digo que reserva.voluntario(que es la id del usuario) cambiara al nombre dle usuario
          data.forEach(reserva => {
            // __name__ es una referencia a la id de cada documento de firestone
            //no se puede poner id porque referencia a un campo creado por el usuario dentro del documento
            let queryCode = query(this._collectionUsers, where('__name__', '==', reserva.voluntario));

            collectionData(queryCode).subscribe({
              next: (user: Users[]) => {
                reserva.voluntario = user[0].name;
              },
              complete: () => { },
              error: (msg) => {
                console.log(msg);
              }
            });
          });

          this._reservas = data;

          // this._reservas = data.map(async (reserva: Reservas) => {
          //   await this.selectUser(reserva);
          // })


        },
        complete: () => { },
        error: (msg: string) => {
          console.log(msg);
        }
      });
    }
  }

  // async selectUserById(id: string) {

  //   //Selecciono el user por la id
  //   return this._users.find((_users) => _users.id === id);

  // }


  /*
  la funcion get reservas devuelve todas las reservas (un array), que he seleccionado antes en la funcion selectReservas.
  Pero como la funcion selectReservas esta securizada si no es ni administrador ni voluntario ese array estara vacio,
  con lo cual la funcion get reservas no devolvera ningun dato
  */
  get reservas(): Reservas[] {
    return this._reservas;
  }

  //TODO
  //FUNCION PARA SELECCIONAR SOLO LAS RESERVAS CORRESPONDIENTES AL INMUEBLE SELECCIONADO
  // async getReservas(idInmueble: String | undefined): Promise<Reservas[]> {
  //   let queryCode = query(this._collection, where('inmueble', '==', idInmueble), orderBy("hora"));

  //   let reservas:Reservas[] = [];
  //   collectionData(queryCode, { 'idField': 'id' }).subscribe({
  //     next: (data: Reservas[]) => {
  //       reservas = data;
  //     },
  //     complete: () => { },
  //     error: (msg: string) => {
  //       console.log(msg);
  //     }
  //   });
  //   return reservas;
  // }


  async addReserva(reserva: Reservas): Promise<boolean> {
    if (this._usersService.isSessionActive()) {
      let queryCode = query(this._collection, where('hora', '==', reserva.hora), where('dia', '==', reserva.dia), where('inmueble', '==', reserva.inmueble));

      const querySnapshot = await getDocs(queryCode);

      console.log(querySnapshot);

      if (querySnapshot.empty) {
        return addDoc(this._collection, reserva).then(
          (doc: DocumentReference<Reservas>) => {
            return true;
          }
        ).catch(
          (error: any) => {
            console.log("No Created");
            return false;
          }
        ).finally(() => { });

      }
      return false;
    }else{
      return false;
    }
  }
}
