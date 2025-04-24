import { Component, Input } from '@angular/core';
import { Teacher, User } from '../../core/services/types.service';
import { ApiService } from '../../core/services/api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-item.component.html',
  styleUrl: './student-item.component.css'
})
export class StudentItemComponent {
  @Input() student : Teacher | undefined ;
  studentPictureURL: SafeUrl = "assets/default-profile.png";
  isMe = false
  constructor(private api: ApiService, private sanitizer: DomSanitizer) {}

  ngOnInit(){
    const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser) as User;
          if(user.id == this.student?.id) this.isMe = true
        }

    this.api.getBlob(`profile-pictures/${this.student?.id}`).subscribe({
      next: (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.studentPictureURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: () => {
        this.studentPictureURL = 'assets/default-profile.png';
      }
    });
  }

  public getActive(): string {
    const past = new Date(this.student?.lastLogin??Date.now()).getTime()
    const now = Date.now();
    const diffInSeconds = Math.floor((now - past) / 1000);
  
    if (this.isMe || diffInSeconds < 60) {
      return `actif ●`;
    }
  
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `actif il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    }
  
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `actif il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    }
  
    const diffInDays = Math.floor(diffInHours / 24);
    return `actif il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  }
  
}
