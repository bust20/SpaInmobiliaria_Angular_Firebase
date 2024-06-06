import { Component } from '@angular/core';
import { FirestoreDBServiceService } from './services/firestore-dbservice.service';
import { FirestoneUsersService } from './services/firestone-users.service';
import { User } from 'firebase/auth';
import { Users } from './models/users';
import { FirestoreReservasService } from './services/firestore-reservas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SpaInmobiliaria';

  /*Llamo en el constructor del appComponent la funcion del service de guardar los inmuebles
  porque asi aunque recarge la web siempre tendre el array y si me vot moviendo por la web ya tengo previamente cargado 
  todos los inmuebles*/
  constructor(private _inmueblesService: FirestoreDBServiceService, private _reservasService: FirestoreReservasService) {
    this._inmueblesService.selectInmuebles();
    _reservasService.selectReservas();

    

  }
}
