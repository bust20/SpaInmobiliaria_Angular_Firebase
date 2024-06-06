import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public backgorund: string = "https://img.freepik.com/premium-photo/empty-white-blank-picture-frame-cabinet-wooden-floor-bright-living-room-beach-house_209090-614.jpg";

  public change1: boolean = false;
  public change2: boolean = false;
  public change3: boolean = false;
  public change4: boolean = false;
}
