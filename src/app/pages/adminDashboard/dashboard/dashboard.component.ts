import { TokenService } from './../../../core/services/token.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
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
