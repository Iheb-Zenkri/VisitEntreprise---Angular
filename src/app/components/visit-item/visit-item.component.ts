import { Visit } from './../../core/services/types.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-visit-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visit-item.component.html',
  styleUrl: './visit-item.component.css'
})
export class VisitItemComponent {

  @Input() visit: Visit | undefined ;
  @Input() isActive: boolean = false;
  @Output() actionClicked = new EventEmitter<void>();

  companyPictureUTL : SafeUrl = "assets/default-profile.png";
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
    }

  getDate(): string {
    const date = new Date(this.visit?.visitDate??Date.now());
    const monthNameInFrench = date.toLocaleString('fr-FR', { month: 'long' });
    const dd = String(date.getDate()).padStart(2, '0');
    const yy = String(date.getFullYear());
    return `${dd} ${monthNameInFrench} ${yy}`;
  } 
}
