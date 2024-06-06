import { Injectable, Query } from '@angular/core';
import { Auth, GoogleAuthProvider, User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, user } from '@angular/fire/auth';
import { Users } from '../models/users';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionData, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { getAuth, sendEmailVerification, signOut, updateCurrentUser } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class FirestoneUsersService {

  private _collection: CollectionReference<Users>;
  private _user: any = null;



  constructor(private _auth: Auth, private _firestore: Firestore) {
    this._collection = collection(this._firestore, 'users') as CollectionReference<Users>;

    if (localStorage.getItem("user")) {
      this._user = localStorage.getItem("user");
      this._user = JSON.parse(this._user);
    }
  }


  //Register con correo
  //Le paso todos los datos del formulario y añado level como parametro porque por defecto sera voluntario pero el admin podria crear un usuario con otro nivel
  async register(name: string, email: string, passwd: string, level: string = "voluntario"): Promise<string> {
    try {
      let userCredential: UserCredential = await createUserWithEmailAndPassword(this._auth, email, passwd);


      //Significa que no existe
      this._user = { name: name, email: email, passwd: passwd, level: level }
      //Creo el usuario en la bbdd de users
      await this.addUser();
      return "registrado";



    } catch (error: any) {
      console.log(error);
      return "credentials";
    }
  }

  async addUser() {
    await addDoc(this._collection, this._user).then(
      async (doc: DocumentReference<Users>) => {
        await this.sendEmail();
        console.log("añadido");

      }
    ).catch(
      (error: any) => {
      }
    ).finally(() => { });
  }


  async sendEmail() {
    if (this._auth.currentUser) {
      sendEmailVerification(this._auth.currentUser).then(() => {
      });
    }
  }


  //Login / Register con google
  async loginWithGoogle(): Promise<boolean> {
    try {
      let userCredential = await signInWithPopup(this._auth, new GoogleAuthProvider());

      //Compruebo si el email del usuario existe ya en la bbdd
      let queryCode = query(this._collection, where('email', '==', userCredential.user.email));

      /*
      Buscando en el documentacion de firebase encotre la funcion getDocs, que te devuelve los registros que contengan la query
      ademas de tener el parametro .empty que te dice si tiene resultados o esta vacio.
      Utilizo esta funcion porque con el collectionData despues de muchas pruebas no e conseguido que funcione.
        -Uno de esos intentos era if(resultados) pero siempre devuelve algo aunque no tenga resultados
        -Otro a sido if(resultados.lenght) porque si no devuelve nada el array que devuelve es 0 pero tmapoco e conseguido que funcione
      */
      const querySnapshot = await getDocs(queryCode);

      if (querySnapshot.empty) {
        //Significa que no existe
        //Entonces lo añadimos
        this._user = { email: userCredential.user.email, name: userCredential.user.displayName, level: "Voluntario" }
        await this.addUser();

      }

      //Creo una "Session" confirmando que el usuario se a añadido a la bbdd
      await this.createSession(userCredential.user.email);
      return true;

      // console.log(userCredential.user.email);

      // console.log("user existe?" + this._userExist);

      //Si no existe lo añadimos
      //NO ENTRA AQUI
      // if (!this._userExist) {
      //   this._user = { email: userCredential.user.email, name: userCredential.user.displayName, level: "Voluntario" }
      //   await this.addUser();
      // }

      // this._user = { email: userCredential.user.email, name: userCredential.user.displayName, level: "administrador" }
      // await this.addUser();
      // console.log("hola");
    } catch (error: any) {

      return false;
    }
  }


  //Login con correo
  async loginWithEmail(email: string, passwd: string): Promise<string> {
    try {

      let userCredential: UserCredential = await signInWithEmailAndPassword(this._auth, email, passwd);
      if (this._auth.currentUser?.emailVerified) {
        await this.createSession(email);
        return "logged";
      } else {
        this.sendEmail();
        return "Verified";
      }
    } catch (error: any) {
      console.log(error);
      return "credentials";
    }

  }

  async createSession(email: string | null | undefined) {
    let queryCode = query(this._collection, where('email', '==', email));

    collectionData(queryCode, { 'idField': 'id' }).subscribe({
      next: (user: Users[]) => {
        this._user = user[0];
        //Subir al localStorage la session del user

        localStorage.setItem("user", JSON.stringify(this._user));
        console.log("Se a creado la session");
      },
      complete: () => { },
      error: (msg) => {
        console.log(msg);
        console.log("No se a creado sesisons");

      }
    });
  }



  //Logout
  async logout(): Promise<boolean> {
    try {
      await signOut(this._auth);
      localStorage.removeItem("user");
      console.log("Session cerrada");
      return true;

    } catch (error: any) {
      console.log(error);
      console.log("Sesison error");
      return false;
    }
  }


  //Acceder al user autenticat

  // User con correo
  get userRol(): Users | null {

    //this.createSession(this._auth.currentUser?.email);S

    if (this._user) {
      //this._user = JSON.parse(this._user);
      return this._user;
    }
    return null;
  }

  // User con google
  get currentUser(): User | null {

    return this._auth.currentUser;
  }

  //Saber si la session esta activada
  isSessionActive(): boolean {
    if (this.currentUser?.emailVerified) {
      return this.currentUser != null;
    }
    return false;
  }

}
