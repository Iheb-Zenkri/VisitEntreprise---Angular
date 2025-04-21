import { Component, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TokenService } from '../../core/services/token.service';

@Component({
  selector: 'ProfilePopup',
  standalone: true,
  templateUrl: './profile-popup.component.html',
  styleUrl: './profile-popup.component.css'
})
export class SideBarComponent {
  @Input() dropdownVisibleProfile!: boolean;
  @Input() username: string = 'Nom Prénom';
  @Input() profileImageUrl: SafeUrl = 'assets/default-profile.png';
  @Input() email: String = 'email@example.com';

  constructor(private router:Router,private tokenService : TokenService){}

  displayMessage(message : String){
    /// this function is a zombie function for now, it show 
    /// interaction with user interface without navigate 
    /// to any pages, maybe in the future after developing
    /// intefaces will be developed
    alert(message);
  }
  
  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['']);
  }
}

