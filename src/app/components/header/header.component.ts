import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SideBarComponent } from "../profile-popup/profile-popup.component";

@Component({
  selector: 'Header',
  standalone: true,
  imports: [CommonModule, 
            HttpClientModule, 
            SideBarComponent,
          ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userName: string = 'Nom Prénom';
  profileImageUrl: SafeUrl = 'assets/default-profile.png';
  email: String = 'email@example.com';

  constructor(private api: ApiService,private sanitizer: DomSanitizer) {}
  dropdownVisibleProfile = false;

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userName = `${user.lastName} ${user.firstName}`;
      this.email = user.email ;
      this.api.getBlob(`profile-pictures/${user.id}`).subscribe({
        next: (blob: Blob) => {
          const objectURL = URL.createObjectURL(blob);
          this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        },
        error: () => {
          this.profileImageUrl = 'assets/default-profile.png';
        }
      });
    }
    
  }
  toggleDropdownProfile() {
    this.dropdownVisibleProfile = !this.dropdownVisibleProfile;
  }
}
