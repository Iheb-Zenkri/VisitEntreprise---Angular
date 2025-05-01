import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Feedback, Visit } from '../../core/services/types.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiService } from '../../core/services/api.service';
import { FeedbackItemComponent } from "../feedback-item/feedback-item.component";
import { AddFeedbackComponent } from '../add-feedback/add-feedback.component';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [CommonModule, FeedbackItemComponent, AddFeedbackComponent],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.css'
})
export class FeedbackListComponent {
  @Input() visit : Visit | undefined ;

  feedbacks : Feedback[] = []
  isLoading = true;
  companyPictureUTL : SafeUrl = "assets/default-profile.png";
  constructor(private api : ApiService,private sanitizer: DomSanitizer){}
  
  
    ngOnChanges(changes: SimpleChanges) {
      this.api.get<Feedback[]>(`feedback/visit/${this.visit?.id}`).subscribe({
        next: (data: Feedback[]) => {
          this.feedbacks = data
          setTimeout(() => {
            this.isLoading = false;
          }, 300);
        },
        error: () => {
          setTimeout(() => {
            this.isLoading = false;
          }, 300);
        }
      });
    if (changes['visit'] && this.visit) {
      this.loadCompanyPicture();
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

  showFeedbackForm: boolean = false;
  toggleFeedbackForm() {
    this.showFeedbackForm = !this.showFeedbackForm;
  }
  
}
