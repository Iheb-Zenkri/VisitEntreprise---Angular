import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Feedback } from './../../core/services/types.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-update-feedback',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-feedback.component.html',
  styleUrl: './update-feedback.component.css'
})
export class UpdateFeedbackComponent {
  @Input() feedback : Feedback | undefined ;
  @Output() feedbackCancelled: EventEmitter<void> = new EventEmitter<void>();

  comment: string =''

  constructor(private apiService : ApiService) {}

  ngOnInit(){
    this.comment = this.feedback?.comment??"";
  }
  onSubmit() {
    if (this.comment.trim()) {

      this.apiService.put(`feedback/${this.feedback?.id}`, this.comment).subscribe({
        next : () => window.location.reload(),
        error :(error) => {
          console.error('Error submitting feedback:', error);
        }
    });
    }

  }
  onCancel() {
    this.feedbackCancelled.emit();
  }
}
