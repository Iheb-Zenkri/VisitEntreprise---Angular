import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Visit } from '../../../core/services/types.service';
import { CommonModule } from '@angular/common';
import { VisitCardComponent } from '../../../components/visit-card/visit-card.component';
import { VisitDetailsComponent } from '../../../components/visit-details/visit-details.component';
import { AddVisitComponent } from "../../../components/add-visit/add-visit.component";
import { VisitMoreComponent } from "../../../components/visit-more/visit-more.component";
import { UpdateVisiteComponent } from "../../../components/update-visite/update-visite.component";
import { GalleryPopupComponent } from "../../../components/gallery-popup/gallery-popup.component";

@Component({
  selector: 'app-visit',
  standalone: true,
  imports: [CommonModule, VisitCardComponent, VisitDetailsComponent, AddVisitComponent, VisitMoreComponent, UpdateVisiteComponent, GalleryPopupComponent],
  templateUrl: './visit.component.html',
  styleUrl: './visit.component.css'
})
export class VisitComponent {
  visits : Visit[] = []
  selectedVisitId: number | null = null;
  selectedVisit : Visit | undefined ;
  constructor(private api: ApiService) {}

  ngOnInit(){
    this.api.get<Visit[]>('visits/unfinished').subscribe({
      next: (data: Visit[]) => {
        this.visits = [...this.visits,...data]
        if (this.visits.length > 0) {
          this.selectedVisitId = this.visits[0].id;
          this.selectedVisit = this.visits[0];
        }
      }
    });
    this.api.get<Visit[]>('visits/finished').subscribe({
      next: (data: Visit[]) => {
        this.visits = [...this.visits,...data]
      }
    });
  }

  deleteVisit(id : number){
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cette visite ?");
  
      if (confirmed) {
        this.api.delete(`visits/${id}`).subscribe({
          next: () => window.location.reload(),
          error: (err) => {
            console.error("Erreur lors de la suppression du commentaire :",err);
          }
        });
      }
  }

  onVisitActionClick(visitId: number): void {
    this.selectedVisitId = visitId ;
    this.selectedVisit = this.visits.find(v => v.id === visitId);
  }
  showForm = false ;
  toggleAddVisitForm(){
    this.showForm = !this.showForm;
  }

  showUpdateForm = false ;
  toggleUpdateVisitForm(id :number){
    this.onVisitActionClick(id);
    this.showUpdateForm = !this.showUpdateForm;
  }

  showVisitGallery = false ;
  toggleVisitGallery(id :number){
    this.onVisitActionClick(id);
    this.showVisitGallery = !this.showVisitGallery;
  }
}
