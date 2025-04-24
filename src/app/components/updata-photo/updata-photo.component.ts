import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-updata-photo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './updata-photo.component.html',
  styleUrl: './updata-photo.component.css'
})
export class UpdataPhotoComponent {
  @Output() photoCancelled: EventEmitter<void> = new EventEmitter<void>();
  @Input() userId : number = 0

  @Input() imagePreview: string | ArrayBuffer | SafeUrl | null = null;

  notChanged = true ;
  selectedFile: File | null = null;
  constructor(private apiService : ApiService){}
  
  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
  
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.notChanged = false
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(){
    if (!this.selectedFile) {
      console.error('No file selected!');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('userId', `${this.userId}`);
    this.apiService.uploadImage('profile-pictures/upload', formData).subscribe({
      next: () => window.location.reload(),
      error: (err) => console.error('Upload failed', err)
    });
  }

  onCancel() {
    this.photoCancelled.emit();
  }
}
