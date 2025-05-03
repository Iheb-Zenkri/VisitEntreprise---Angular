import { Component, Input } from '@angular/core';
import { Company } from '../../core/services/types.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { UpdateCompanyComponent } from "../update-company/update-company.component";

@Component({
  selector: 'app-company-card',
  standalone: true,
  imports: [CommonModule, UpdateCompanyComponent],
  templateUrl: './company-card.component.html',
  styleUrl: './company-card.component.css'
})
export class CompanyCardComponent {
  @Input() company : Company | undefined ;
    companyPictureUTL: SafeUrl = "assets/default-profile.png";
    constructor(private api: ApiService, private sanitizer: DomSanitizer) {}
  
    ngOnInit(){
      this.api.getBlob(`company-pictures/${this.company?.id}`).subscribe({
        next: (blob: Blob) => {
          const objectURL = URL.createObjectURL(blob);
          this.companyPictureUTL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        },
        error: () => {
          this.companyPictureUTL = 'assets/default-profile.png';
        }
      });
    }  
    deleteCompany(){
      const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cette entreprise ?");
  
      if (confirmed) {
        this.api.delete(`companies/${this.company?.id}`).subscribe({
          next: () => window.location.reload(),
          error: (err) => {
            console.error("Erreur lors de la suppression du commentaire :",err);
          }
        });
      }
    }

    showForm = false;
    toggleFeedbackForm(){
      this.showForm= !this.showForm;
    }
}
