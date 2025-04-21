import { ApiService } from './../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { Visit } from './../../core/services/types.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-visit-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visit-card.component.html',
  styleUrl: './visit-card.component.css'
})
export class VisitCardComponent {
  @Input() visit: Visit | undefined ;
  @Input() isActive: boolean = false;
  @Output() actionClicked = new EventEmitter<void>();

  companyPictureUTL : SafeUrl = "assets/default-profile.png";
  responsiblePictureURL : SafeUrl = "assets/default-profile.png";

  constructor(private api : ApiService,private sanitizer: DomSanitizer){}
  ngOnInit(){
    this.api.getBlob(`company-pictures/${this.visit?.company.id}`).subscribe({
      next: (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.companyPictureUTL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: () => {
        this.companyPictureUTL = 'assets/default-profile.png';
      }
    });

    this.api.getBlob(`profile-pictures/${this.visit?.responsible.id}`).subscribe({
      next: (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.responsiblePictureURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: () => {
        this.responsiblePictureURL = 'assets/default-profile.png';
      }
    });
  }

  getDate(): string {
    const date = new Date(this.visit?.visitDate??Date.now());
    const monthNameInFrench = date.toLocaleString('fr-FR', { month: 'long' });
    const dd = String(date.getDate()).padStart(2, '0');
    return `${dd} ${monthNameInFrench}`;
  }
  getTime(): string {
    const date = new Date(this.visit?.visitDate??Date.now());
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${hh}h${min}`;
  }
}
