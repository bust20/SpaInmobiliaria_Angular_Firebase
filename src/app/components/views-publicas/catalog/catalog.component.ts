import { Component } from '@angular/core';
import { InmueblesService } from 'src/app/services/inmuebles.service';
import { Inmuebles } from 'src/app/models/inmuebles';
import { Router } from '@angular/router';
import { FirestoreDBServiceService } from 'src/app/services/firestore-dbservice.service';
import { FirestoneUsersService } from 'src/app/services/firestone-users.service';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  constructor(private _inmueblesService: FirestoreDBServiceService, private readonly router: Router, private _usersService: FirestoneUsersService) {
    
  }


  get inmuebles(): Inmuebles[] {
    return this._inmueblesService.inmuebles;
  }

  
  get sessionActive(): boolean {
    return this._usersService.isSessionActive();
  }

  get user(): Users | null{
    return this._usersService.userRol;
  }


  delete(idx: any){
    console.log(idx);
    this._inmueblesService.deleteInmueble(this.inmuebles[idx]);
  }


}
