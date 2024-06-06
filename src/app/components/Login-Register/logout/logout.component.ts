import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoneUsersService } from 'src/app/services/firestone-users.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private _usersService: FirestoneUsersService, private _router: Router) {

  }

  async logout(): Promise<void> {
    let logged_out = await this._usersService.logout();
    if (logged_out) {
      this._router.navigate(['/home']);
    }
  }

}
