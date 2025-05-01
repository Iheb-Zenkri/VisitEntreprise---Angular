import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-gellery-image',
  standalone: true,
  imports: [],
  templateUrl: './gellery-image.component.html',
  styleUrl: './gellery-image.component.css'
})
export class GelleryImageComponent {
@Input() documentId : number | undefined ;
@Input() key : number | undefined;
  constructor(private api : ApiService,private sanitizer: DomSanitizer){}

  documentImageURL : SafeUrl = 'assets/default-profile.png';

  ngOnInit(){
    this.api.getBlob(`visit-gallery/picture/${this.documentId}`).subscribe({
      next: (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.documentImageURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      }
    });
  }
}
