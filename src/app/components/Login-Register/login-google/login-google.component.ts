import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoneUsersService } from 'src/app/services/firestone-users.service';

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent {

  constructor(private _usersService: FirestoneUsersService, private _router: Router) {

  }

 

  async addGoogle(): Promise<void> {
    let is_logged = await this._usersService.loginWithGoogle();
    if (is_logged) {
      this._router.navigate(['/home']);
    }

  }

}
