import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inmuebles } from 'src/app/models/inmuebles';
import { Reservas } from 'src/app/models/reservas';
import { Users } from 'src/app/models/users';
import { FirestoneUsersService } from 'src/app/services/firestone-users.service';
import { FirestoreDBServiceService } from 'src/app/services/firestore-dbservice.service';
import { FirestoreReservasService } from 'src/app/services/firestore-reservas.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  constructor(private _inmueblesService: FirestoreDBServiceService, private route: ActivatedRoute, private _usersService: FirestoneUsersService, private _reservasService: FirestoreReservasService) {

  }
  //Cojo el id de la url para encontrar a que inmueble hace referencia
  id: any = this.route.snapshot.paramMap.get('element');

  public fecha: Date = new Date();

  public dia: number = this.fecha.getDate();
  public hora: number = 9;

  public msg: string = "";

  //Selecciono el inmueble para tener su id del firebase
  get inmueble(): Inmuebles {
    return this._inmueblesService.info(this.id);
  }

  //Selecciono todas las reservas que tengan como inmueble el que hemos seleciconado
  get reservas(): Reservas[] {
    return this._reservasService.reservas;
  }

  //TODO
  //FUNCION PARA SELECCIONAR SOLO LAS RESERVAS DEL INMUEBLE QUE HEMOS SELECCIONADO
  // get reservas():Reservas[]{
  //   return this._reservasService.getReservas(this.inmueble.id)
  // }

  //Selecciono al user para saber el nombre del user que esta reservando
  get user(): Users | null {
    return this._usersService.userRol;
  }

  async reservar() {
    let reserva: Reservas = {
      "voluntario": this.user?.id,
      "inmueble": this.inmueble.id,
      "dia": this.dia,
      "hora": this.hora,
    }

    let isReserved = await this._reservasService.addReserva(reserva);
    console.log(isReserved);
    if (isReserved) {
      this.msg = "Hora reservada con exito";
    } else {
      this.msg = " Esta hora ya esta reservada, porfavor selecciona una que no lo este";
    }

  }


}
