import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../models/empresa';
import { Inmuebles } from '../models/inmuebles';

@Injectable({
  providedIn: 'root'
})
export class InmueblesService {

  private _empresa: any;

  private _inmuebles: any;

  private _obj: any;


  constructor(private _http: HttpClient) {
    
  }

  get empresa(): Empresa {

    return this._empresa;
  }

  get inmuebles(): Inmuebles[] {
    return this._inmuebles;
  }

   info(idx:number): Inmuebles{
    this._obj = this._inmuebles[idx];
    return this._obj;
    
  }


  recibirEmpresa(): void {
    this._http.get("../../assets/data/general_data.json").subscribe({

      next: (info: any) => {
        this._empresa = info;


      },
      complete: () => {


      },
      error: () => {
        alert("error");

      }
    })
  }

  recibirInmuebles(): void {
    this._http.get("../../assets/data/inmuebles_data.json").subscribe({

      next: (inmueble: any) => {
        
        this._inmuebles = inmueble;
     
      },
      complete: () => {


      },
      error: () => {
        alert("error");

      }
    })
  }
}
