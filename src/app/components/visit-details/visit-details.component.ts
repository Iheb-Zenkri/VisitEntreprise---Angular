import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Visit } from '../../core/services/types.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visit-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visit-details.component.html',
  styleUrl: './visit-details.component.css'
})
export class VisitDetailsComponent implements OnChanges {
  @Input() visit: Visit | undefined;

  companyPictureUTL: SafeUrl = "assets/default-profile.png";
  responsiblePictureURL: SafeUrl = "assets/default-profile.png";

  constructor(private api: ApiService, private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visit'] && this.visit) {
      this.loadCompanyPicture();
      this.loadResponsiblePicture();
    }
  }

  private loadCompanyPicture() {
    this.api.getBlob(`company-pictures/${this.visit?.company.id}`).subscribe({
      next: (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.companyPictureUTL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: () => {
        this.companyPictureUTL = 'assets/default-profile.png';
      }
    });
  }

  private loadResponsiblePicture() {
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
    const date = new Date(this.visit?.visitDate ?? Date.now());
    const monthNameInFrench = date.toLocaleString('fr-FR', { month: 'long' });
    const dd = String(date.getDate()).padStart(2, '0');
    return `${dd} ${monthNameInFrench}`;
  }

  getTime(): string {
    const date = new Date(this.visit?.visitDate ?? Date.now());
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${hh}h${min}`;
  }

  getLastLogin(): string {
    const date = new Date(this.visit?.responsible.lastLogin ?? Date.now());
    const monthNameInFrench = date.toLocaleString('fr-FR', { month: 'long' });
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${dd} ${monthNameInFrench} à ${hh}h${min}`;
  }
}
