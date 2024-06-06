import { style } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { User } from 'firebase/auth';
import { Users } from 'src/app/models/users';
import { FirestoneUsersService } from 'src/app/services/firestone-users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private renderer: Renderer2, private _usersService: FirestoneUsersService) {

  }

  public logo: string = "data:image/png;base64,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"

  public modal: boolean = false;

  public menu: boolean = false;

  show(): void {
    this.modal = !this.modal;
    this.renderer.setStyle(document.body, "overflow-y", "hidden");
  }

  hide(): void {
    this.modal = !this.modal;
    this.renderer.removeStyle(document.body, "overflow-y");

  }

  showMenu(): void {
    this.menu = !this.menu;
  }

  get sessionActive(): boolean {
    return this._usersService.isSessionActive();
  }

  get user(): Users | null{
    return this._usersService.userRol;
  }
}




