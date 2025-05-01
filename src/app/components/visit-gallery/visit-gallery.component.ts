import { Component, Input, SimpleChanges } from '@angular/core';
import { Feedback, Visit, VisitGallery } from '../../core/services/types.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { GelleryImageComponent } from "../gellery-image/gellery-image.component";

@Component({
  selector: 'app-visit-gallery',
  standalone: true,
  imports: [CommonModule, GelleryImageComponent],
  templateUrl: './visit-gallery.component.html',
  styleUrl: './visit-gallery.component.css'
})
export class VisitGalleryComponent {
  @Input() visit : Visit | undefined ;

  isLoading = true;
  companyPictureUTL : SafeUrl = "assets/default-profile.png";
  responsiblePictureURL: SafeUrl = "assets/default-profile.png";

  visitGallery : VisitGallery | undefined ;
    constructor(private api : ApiService,private sanitizer: DomSanitizer){}
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['visit'] && this.visit) {
      this.loadCompanyPicture();
      this.loadResponsiblePicture();
      this.loadVisitGallery();
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
  private loadVisitGallery(){
    this.api.get<VisitGallery>(`visit-gallery/visit/${this.visit?.id}`).subscribe({
      next : (response : VisitGallery) =>{
        console.log(response)
        this.visitGallery = response ;
      },
      error : () =>{
        this.visitGallery = undefined
      }
    })
  }
  
}
