import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Feedback, FeedbackRating } from './../../core/services/types.service';
import { Component, Input } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback-item.component.html',
  styleUrl: './feedback-item.component.css'
})
export class FeedbackItemComponent {
  @Input() feedback : Feedback | undefined
  
  icons: string[] = [];
  responsiblePictureURL : SafeUrl = "assets/default-profile.png";
  constructor(private api : ApiService,private sanitizer: DomSanitizer){}

  ngOnInit(){
    this.icons = this.getStarIcons(this.feedback?.feedbackRating??FeedbackRating.ONE_STAR);
    this.api.getBlob(`profile-pictures/${this.feedback?.user.id}`).subscribe({
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
    const date = new Date(this.feedback?.updatedAt??Date.now());
    const monthNameInFrench = date.toLocaleString('fr-FR', { month: 'long' });
    const dd = String(date.getDate()).padStart(2, '0');
    const yy = String(date.getFullYear());
    return `${dd} ${monthNameInFrench} ${yy}`;
  } 
  getTime(): string {
    const date = new Date(this.feedback?.updatedAt??Date.now());
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    return `${hh}h${mm}`;
  }

  feedbackRatingToNumber(rating: FeedbackRating): number {
    switch (rating) {
      case FeedbackRating.ONE_STAR:
        return 1;
      case FeedbackRating.TWO_STAR:
        return 2;
      case FeedbackRating.THREE_STAR:
        return 3;
      case FeedbackRating.FOUR_STAR:
        return 4;
      case FeedbackRating.FIVE_STAR:
        return 5;
      default:
        return 0;
    }
  }

  getStarIcons(rating: FeedbackRating): string[] {
  const filledStars = this.feedbackRatingToNumber(rating);
  const stars: string[] = [];

  for (let i = 0; i < 5; i++) {
    if (i < filledStars) {
      stars.push('fas fa-star');
    } else {
      stars.push('far fa-star');
    }
  }

  return stars;
}

  
}
