import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-add-feedback',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-feedback.component.html',
  styleUrl: './add-feedback.component.css'
})
export class AddFeedbackComponent {
  @Output() feedbackCancelled: EventEmitter<void> = new EventEmitter<void>();
  @Input() visitId : number | undefined

  comment: string =''
  userId : number = 0

  constructor(private apiService : ApiService) {
    const userData = localStorage.getItem('user'); 
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        this.userId = parsedUserData.id;} catch (error) {
        console.error('Error parsing user data from localStorage', error);
      }
    }
  }
  onSubmit() {
    if (this.comment.trim()) {
      const feedbackData = {
        visitId: this.visitId,
        userId: this.userId,
        comment: this.comment
      };

      this.apiService.post('feedback', feedbackData).subscribe(
        (response) => {
          console.log('Feedback submitted successfully:', response);
          this.comment = ''; 
          this.feedbackCancelled.emit();
        },
        (error) => {
          console.error('Error submitting feedback:', error);
        }
      );
    }

  }
  onCancel() {
    this.feedbackCancelled.emit();
  }
}
