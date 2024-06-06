import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { FirestoneUsersService } from 'src/app/services/firestone-users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  constructor(private _usersService: FirestoneUsersService, private _router: Router) {

  }

  public msg: boolean = false;

  public name: string = "";
  public email: string = "";
  public password: string = "";
  public confirmPassword: string = "";

  public msgLogged: string = "";


  async add(): Promise<void> {

    //Comprovacion de los campos enviados
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //return regex.test(email);

    if (this.password == this.confirmPassword) {
      if (regex.test(this.email)) {
        //Añadir el objeto user a firebase
        let is_logged = await this._usersService.register(this.name, this.email, this.password);

        if (is_logged == "credentials") {
          this.msgLogged = "Error en los campos introducidos o ya estas registrado, si es asi verifica tu correo";

        } else {
          this.msgLogged = "Registrado con exito, verifica tu correo para acceder";
        }
      }
    }


  }


}

