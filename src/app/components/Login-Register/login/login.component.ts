import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { FirestoneUsersService } from 'src/app/services/firestone-users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private _usersService: FirestoneUsersService, private _router: Router) {

  }

  public email: string = "";
  public password: string = "";

 
  public msg: string = "";



  async login(): Promise<void> {

    let is_logged = await this._usersService.loginWithEmail(this.email, this.password);

    if (is_logged === "logged") {
      this._router.navigate(['/home']);
    }else if(is_logged === "credentials"){
      this.msg = "Email o contraseña incorrectos";
    }else{
      this.msg = "Aun no as verificado el correo";
    }

    
    
  }


}
