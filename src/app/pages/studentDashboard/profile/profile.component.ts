import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Group, User } from './../../../core/services/types.service';
import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { StudentItemComponent } from "../../../components/student-item/student-item.component";
import { UpdataPhotoComponent } from "../../../components/updata-photo/updata-photo.component";
import { UpdateUserInfoComponent } from "../../../components/update-user-info/update-user-info.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, StudentItemComponent, UpdataPhotoComponent, UpdateUserInfoComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User | null = null;
  profileImageUrl: SafeUrl = 'assets/default-profile.png';
  studentStats : Stats = {visited: 0,upcomingVisits: 0, feedbacks: 0};
  studentGroup : Group = {id:0,name:"",students:[]};
  isLoading = false;
  constructor(private api: ApiService,private sanitizer: DomSanitizer) {}
  
  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser) as User;
    }

    this.api.getBlob(`profile-pictures/${this.user?.id}`).subscribe({
      next: (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: () => {
        this.profileImageUrl = 'assets/default-profile.png';
      }
    });

    this.api.get<Stats>(`groups/student-stats/${this.user?.id}`).subscribe({
          next: (data: Stats) => {
            this.studentStats = data
          },
          error: () => {
            this.studentStats =  {visited: 0,upcomingVisits: 0, feedbacks: 0};
          }
    });

    this.api.get<Group>(`groups/student/${this.user?.id}`).subscribe({
      next: (data: Group) => {
        this.studentGroup = data
        this.isLoading = true;
      },
      error: () => {
        this.studentStats =  {visited: 0,upcomingVisits: 0, feedbacks: 0};
      }
    });
  }

  showUpdatePhoto: boolean = false;
  toggleUpdatePhoto() {
    this.showUpdatePhoto = !this.showUpdatePhoto;
  }

  showUpdateInfo: boolean = false;
  toggleUpdateInfo() {
    this.showUpdateInfo = !this.showUpdateInfo;
  }
}

interface Stats{
  visited :number;
  upcomingVisits :number;
  feedbacks : number;
}