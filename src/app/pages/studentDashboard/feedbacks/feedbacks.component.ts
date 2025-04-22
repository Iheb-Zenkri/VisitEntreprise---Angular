import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Visit } from '../../../core/services/types.service';
import { DomSanitizer } from '@angular/platform-browser';
import { VisitItemComponent } from "../../../components/visit-item/visit-item.component";
import { FeedbackListComponent } from '../../../components/feedback-list/feedback-list.component';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports: [CommonModule, VisitItemComponent,FeedbackListComponent],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.css'
})
export class FeedbacksComponent {
  visits: Visit[] = [];
  isLoading = true;
  selectedVisitId: number | null = null;
  selectedVisit : Visit | undefined ;

  onVisitActionClick(visitId: number): void {
    this.selectedVisitId = visitId;
    this.selectedVisit = this.visits.find(v => v.id === visitId);
}
  constructor(private visitService : ApiService,private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.visitService.get<Visit[]>('visits/finished').subscribe({
      next: (data: Visit[]) => {
        this.visits = data
        if (this.visits.length > 0) {
          this.selectedVisitId = this.visits[0].id;
          this.selectedVisit = this.visits[0];
        }
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      },
      error: () => {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    });
  }
  

}
