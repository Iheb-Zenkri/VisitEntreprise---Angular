import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { Visit } from '../../../core/services/types.service';
import { VisitCardComponent } from "../../../components/visit-card/visit-card.component";
import { VisitDetailsComponent } from "../../../components/visit-details/visit-details.component";

@Component({
  selector: 'app-calendrier',
  standalone: true,
  imports: [CommonModule, VisitCardComponent, VisitDetailsComponent],
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.css'
})
export class CalendrierComponent {
  visits: Visit[] = [];
  isLoading = true;
  selectedVisitId: number | null = null;
  selectedVisit : Visit | undefined ;
  constructor(private visitService: ApiService) {}

  ngOnInit(): void {
    this.visitService.get<Visit[]>('visits').subscribe({
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

  onVisitActionClick(visitId: number): void {
      this.selectedVisitId = visitId;
      this.selectedVisit = this.visits.find(v => v.id === visitId);
    }
}

