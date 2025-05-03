import { Company } from './../../core/services/types.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-company',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.css'
})
export class AddCompanyComponent {
  @Output() addCompanyCanceled: EventEmitter<void> = new EventEmitter<void>();

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | SafeUrl | null = null;
 
  notChanged = true ;

  Company = {
    name: '',
    address: '',
    contactEmail: '',
    contactPhone: '',
    expertiseDomain: '',
    relevanceScore: 1.0,
    visitFrequency: 0
  }
  constructor(private apiService : ApiService) {}
  
  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
  
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
      this.onFormChange()
    }
  }

  onFormChange() {
    this.notChanged =
      this.Company.name === '' ||
      this.Company.address === ''||
      this.Company.contactEmail === '' ||
      this.Company.contactPhone === '' ||
      this.Company.expertiseDomain === ''||
      this.selectedFile === null
  }
  onSubmit(){
    if(!this.notChanged){
      this.apiService.post<Company>('companies', this.Company).subscribe({
        next: (body: Company) => {
          if (!this.selectedFile || !body?.id) return;
      
          const formData = new FormData();
          formData.append('file', this.selectedFile);
      
          this.apiService.uploadImage(`company-pictures/${body.id}`, formData).subscribe({
            next: () => window.location.reload(),
            error: (err) => console.error('Upload failed', err)
          });
        },
        error: (error) => {
          console.error('Error submitting company:', error);
        }
      });      
    }
  }
  onCancel(){
    this.addCompanyCanceled.emit();
  }
}
