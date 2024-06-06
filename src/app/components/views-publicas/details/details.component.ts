import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inmuebles } from 'src/app/models/inmuebles';
import { Users } from 'src/app/models/users';
import { FirestoneUsersService } from 'src/app/services/firestone-users.service';
import { FirestoreDBServiceService } from 'src/app/services/firestore-dbservice.service';
import { InmueblesService } from 'src/app/services/inmuebles.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  constructor(private _inmueblesService: FirestoreDBServiceService, private route: ActivatedRoute, private _usersService: FirestoneUsersService) {

  }

  id: any = this.route.snapshot.paramMap.get('element');

  get obj(): Inmuebles {
    return this._inmueblesService.info(this.id);
  }

  get sessionActive(): boolean {
    return this._usersService.isSessionActive();
  }

  get user(): Users | null{
    return this._usersService.userRol;
  }



  idx: number = 0;

  next() {
    this.idx++;
    if (this.idx > this.obj.carousel_imgs.length - 1) {
      this.idx = 0;
    }
  }

  before() {
    this.idx--;
    if (this.idx < 0) {
      this.idx = this.obj.carousel_imgs.length - 1;
    }
  }




}
