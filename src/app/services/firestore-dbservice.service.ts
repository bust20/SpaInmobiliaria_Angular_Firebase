import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, collection, addDoc, DocumentReference, deleteDoc, doc, collectionData, setDoc } from '@angular/fire/firestore';
import { Inmuebles } from '../models/inmuebles';
import { FirestoneUsersService } from './firestone-users.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDBServiceService {
  private _collection: CollectionReference<Inmuebles>;

  private _inmuebles: any;

  private _obj: any;

  private _userRol: any;

  constructor(private _firestore: Firestore, private _usersService: FirestoneUsersService) {
    this._collection = collection(this._firestore, 'inmuebles') as CollectionReference<Inmuebles>;

    //Creo una variable con el user para saber su rol y saber si tiene permisos de ejecutar las funciones
    this._userRol = this._usersService.userRol;
  }


  //Seleccionar todos los inmuebles y guardarlos en una variable
  selectInmuebles() {
    //Al decirle que coleccion (this._collection) queremos recuperar le indicamos que queremos el id de cada elemento
    collectionData(this._collection, { 'idField': 'id' }).subscribe({
      next: (data: Inmuebles[]) => {
        this._inmuebles = data;
      },
      complete: () => { },
      error: (msg: string) => {
        console.log(msg);
      }
    });
  }

  //Funcion get donde los componentes piden los inmuebles
  get inmuebles(): Inmuebles[] {
    return this._inmuebles;
  }

  //Funcion info para el componente details
  info(idx: number): Inmuebles {
    this._obj = this._inmuebles[idx];
    return this._obj;

  }



  //Añado un if a las funciones para comprobar que el usuario tiene el rol de administrador

  addInmueble(inmueble: Inmuebles) {
    if (this._userRol.level == "administrador") {
      addDoc(this._collection, inmueble).then(
        (doc: DocumentReference<Inmuebles>) => {
          console.log("Created");
        }
      ).catch(
        (error: any) => {
          console.log("No Created");
        }
      ).finally(() => { });
    }
  }

  deleteInmueble(inmueble: Inmuebles) {
    if (this._userRol.level == "administrador") {
      /* Como el id de la sentencia a firebase no puede ser null hacemos un if donde miramos si inmueble.id tiene valor
      si tiene valor id es igual a inmueble.id
      si no tiene valor id sera un string vacio, con lo cual podremos hacer la consulta pero no encontrara resultados*/
      let id: string = "";
      if (inmueble.id) {
        id = inmueble.id
      }

      let documentRef: DocumentReference<Inmuebles> = doc(this._firestore, 'inmuebles', id) as DocumentReference<Inmuebles>;
      deleteDoc(documentRef).then(
        () => { console.log("Doc deleted!"); }
      ).catch(
        (error: any) => { console.log(error); }
      ).finally(
        () => { }
      );
    }
  }

  updateInmueble(inmueble: Inmuebles) {
    if (this._userRol.level == "administrador") {
      let id: string = "";
      if (inmueble.id) {
        id = inmueble.id
        console.log(id);


        let updatedInmuebleData: Inmuebles = {
          title: inmueble.title,
          type: inmueble.type,
          site: inmueble.site,
          main_image: inmueble.main_image,
          carousel_imgs: inmueble.carousel_imgs,
          biography: inmueble.biography,
          price: inmueble.price,
          parking: inmueble.parking,
          observations: inmueble.observations
        };
        let documentRef: DocumentReference<Inmuebles> = doc(this._firestore, 'inmuebles', id) as DocumentReference<Inmuebles>;
        setDoc(documentRef, updatedInmuebleData).then(
          () => { console.log("Updated done"); }
        ).catch(
          (error: any) => { console.log(error); }
        ).finally(
          () => { }
        );
      }
    }
  }

}

