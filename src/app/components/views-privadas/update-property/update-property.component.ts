import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inmuebles } from 'src/app/models/inmuebles';
import { FirestoreDBServiceService } from 'src/app/services/firestore-dbservice.service';

@Component({
  selector: 'app-update-property',
  templateUrl: './update-property.component.html',
  styleUrls: ['./update-property.component.css']
})
export class UpdatePropertyComponent {

  constructor(private _inmueblesService: FirestoreDBServiceService, private route: ActivatedRoute) {

  }

  id: any = this.route.snapshot.paramMap.get('element');

  /*Recupero el objeto que quiero modificar para en el formulario imprimir sus datos y modiciarlos
   al momento gracias al ngmodel*/
  get obj(): Inmuebles {
    return this._inmueblesService.info(this.id);
  }


  update() {

    if (this.obj.biography != undefined && typeof this.obj.biography == 'string') {
      this.obj.biography = (this.obj.biography as String).split('\n');
    }

    if (this.obj.carousel_imgs != undefined && typeof this.obj.carousel_imgs == 'string') {
      this.obj.carousel_imgs = (this.obj.carousel_imgs as String).split('\n');
    }


    if (this.obj.observations != undefined && typeof this.obj.observations == 'string') {
      this.obj.observations = (this.obj.observations as String).split('\n');
    }

    //Añadir el objeto inmueble a firebase con la funcion del service
    this._inmueblesService.updateInmueble(this.obj);

  }
}
