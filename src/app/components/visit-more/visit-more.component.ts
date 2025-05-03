import { Component, Input, SimpleChanges } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { VisitGallery } from '../../core/services/types.service';
import { GelleryImageComponent } from '../gellery-image/gellery-image.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visit-more',
  standalone: true,
  imports: [CommonModule,GelleryImageComponent],
  templateUrl: './visit-more.component.html',
  styleUrl: './visit-more.component.css'
})
export class VisitMoreComponent {
  @Input() visitId: number | null = null;

    visitGallery : VisitGallery | undefined ;
  
  constructor(private api: ApiService, private sanitizer: DomSanitizer) {}
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['visitId'] && this.visitId) {
      this.loadVisitGallery();
    }
  }

  private loadVisitGallery(){
    this.api.get<VisitGallery>(`visit-gallery/visit/${this.visitId}`).subscribe({
      next : (response : VisitGallery) =>{
        this.visitGallery = response ;
        console.log(this.visitGallery)
      },
      error : () =>{
        this.visitGallery = undefined
      }
    })
  }
}
