import { Component } from '@angular/core';
import { InmueblesService } from 'src/app/services/inmuebles.service';
import { Empresa } from '../../../models/empresa';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(private _inmueblesService: InmueblesService) {
   this._inmueblesService.recibirEmpresa();
   
  }

  get empresa(): Empresa{
    return this._inmueblesService.empresa;
  }

 

  








}
