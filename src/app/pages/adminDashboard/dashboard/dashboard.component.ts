import { TokenService } from './../../../core/services/token.service';
import { Component } from '@angular/core';
import { SideBarComponent } from "../../../components/side-bar/side-bar.component";
import { NavItemComponent } from "../../../components/nav-item/nav-item.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideBarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private tokenService : TokenService){}

  logout(){
    this.tokenService.clearToken();
    console.log("logout successfully!")
  }
}
