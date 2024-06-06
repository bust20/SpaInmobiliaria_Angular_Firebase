import { Component } from '@angular/core';
import { FirestoreDBServiceService } from 'src/app/services/firestore-dbservice.service';
import { Inmuebles } from 'src/app/models/inmuebles';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent {

  constructor(private _inmueblesService: FirestoreDBServiceService) {

  }

  //Variables que tendran guardaran el valor de los input
  public title: string = " ";
  public type: string = "";
  public site: string = "";
  public price: number = 0;
  public parking: boolean = false;
  public biography: string[] = [];
  public main_image: string = "";
  public carousel_imgs: string[] = [];
  public observations: string[] = [];




  add() {
    if (this.biography != undefined && typeof this.biography == 'string') {
      this.biography = (this.biography as String).split('\n');
    }

    if (this.carousel_imgs != undefined && typeof this.carousel_imgs == 'string') {
      this.carousel_imgs = (this.carousel_imgs as String).split('\n');
    }


    if (this.observations != undefined && typeof this.observations == 'string') {
      this.observations = (this.observations as String).split('\n');
    }





    //Crear un objeto inmueble con las variables

    let inmueble: Inmuebles = {
      "title": this.title,
      "type": this.type,
      "site": this.site,
      "price": this.price,
      "parking": this.parking,
      "biography": this.biography,
      "main_image": this.main_image,
      "carousel_imgs": this.carousel_imgs,
      "observations": this.observations,
    }

    //Añadir el objeto inmueble a firebase con la funcion del service
    this._inmueblesService.addInmueble(inmueble);
  }
}
