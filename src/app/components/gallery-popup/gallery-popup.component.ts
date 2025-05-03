import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VisitGallery } from '../../core/services/types.service';
import { ApiService } from '../../core/services/api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery-popup.component.html',
  styleUrl: './gallery-popup.component.css'
})
export class GalleryPopupComponent {
 @Output() VisitCanceled: EventEmitter<void> = new EventEmitter<void>();
 @Input() visitId : number | null = null

  visitGallery : VisitGallery | undefined ;
  imageArray : imageUrl[] = []
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | SafeUrl | null = null;
 
  constructor(private api : ApiService,private sanitizer: DomSanitizer){}

  ngOnInit(){
   this.loadVisitGallery();
  }

  loadVisitGallery(){
    this.imageArray = [];
    this.api.post<VisitGallery>(`visit-gallery/${this.visitId}`,null).subscribe({
      next : (response : VisitGallery) =>{
        this.visitGallery = response ;
        for(let doc of this.visitGallery.documentDTO){
          this.api.getBlob(`visit-gallery/picture/${doc.id}`).subscribe({
            next: (blob: Blob) => {
              const objectURL = URL.createObjectURL(blob);
              this.imageArray = [...this.imageArray,{
                id :doc.id,
                url :this.sanitizer.bypassSecurityTrustUrl(objectURL)
              } 
            ]
            }
          });
        }
      },
      error : () =>{
        this.visitGallery = undefined
      }
    })
  }
  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
  
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(fileInput: HTMLInputElement){
    if (!this.selectedFile) return;
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.api.uploadImage(`visit-gallery/${this.visitGallery?.id}/add-picture`, formData).subscribe({
      next: () => this.loadVisitGallery(),
      error: (err) => console.error('Upload failed', err)
    });
    fileInput.value = '';
    this.imagePreview = null ;
  }

  deletePhoto(id : number){
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cette photo ?");
  
    if (confirmed) {
    this.api.delete(`visit-gallery/${this.visitGallery?.id}/remove-picture/${id}`).subscribe({
      next: () => this.loadVisitGallery(),
      error: (err) => console.error('Upload failed', err)
    });
  }
  }
 onCancel(){
  this.VisitCanceled.emit()
 }
}

interface imageUrl{
  id : number,
  url : SafeUrl
}