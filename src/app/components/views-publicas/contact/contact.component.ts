import { Component } from '@angular/core';
import { InmueblesService } from 'src/app/services/inmuebles.service';
import { Empresa } from '../../../models/empresa';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(private _inmueblesService: InmueblesService) {
    this._inmueblesService.recibirEmpresa();
    
   }

   get empresa(): Empresa{
    return this._inmueblesService.empresa;
  }


}
