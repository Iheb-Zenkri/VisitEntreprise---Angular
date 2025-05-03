import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ApiService } from '../../core/services/api.service';
import { Company } from '../../core/services/types.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-company',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './update-company.component.html',
  styleUrl: './update-company.component.css'
})
export class UpdateCompanyComponent {
 @Output() updateCompanyCanceled: EventEmitter<void> = new EventEmitter<void>();
 @Input() inputCompany : Company |undefined
 @Input() imagePreview: string | ArrayBuffer | SafeUrl | null = null;
 
  selectedFile: File | null = null;
 
  notChanged = true ;

  company = {
    name: '',
    address: '',
    contactEmail: '',
    contactPhone: '',
    expertiseDomain: '',
    relevanceScore: 1.0,
    visitFrequency: 0
  }
  constructor(private apiService : ApiService) {}
  
  ngOnInit(){
    this.company.name = this.inputCompany?.name??''
    this.company.address = this.inputCompany?.address??''
    this.company.contactEmail = this.inputCompany?.contactEmail??''
    this.company.contactPhone = this.inputCompany?.contactPhone??''
    this.company.expertiseDomain = this.inputCompany?.expertiseDomain??''
    this.company.relevanceScore = this.inputCompany?.relevanceScore??1.0

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
      this.onFormChange()
    }
  }

  onFormChange() {
    this.notChanged =
      this.selectedFile === null &&
      this.company.name === this.inputCompany?.name &&
      this.company.address === this.inputCompany?.address &&
      this.company.contactEmail === this.inputCompany?.contactEmail &&
      this.company.contactPhone === this.inputCompany?.contactPhone &&
      this.company.expertiseDomain ===this.inputCompany?.expertiseDomain &&
      this.company.relevanceScore === this.inputCompany.relevanceScore
    }
  onSubmit(){
    const updatedFields: any = {};
    if(this.company.name !== this.inputCompany?.name) updatedFields.name = this.company.name
    if(this.company.address !== this.inputCompany?.address) updatedFields.address = this.company.address
    if(this.company.contactEmail !== this.inputCompany?.contactEmail) updatedFields.contactEmail = this.company.contactEmail
    if(this.company.contactPhone !== this.inputCompany?.contactPhone) updatedFields.contactPhone = this.company.contactPhone
    if(this.company.expertiseDomain !== this.inputCompany?.expertiseDomain) updatedFields.expertiseDomain = this.company.expertiseDomain
    if(this.company.relevanceScore !== this.inputCompany?.relevanceScore) updatedFields.relevanceScore = this.company.relevanceScore
    console.log(updatedFields)

    if(this.selectedFile !== null){
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.apiService.uploadImage(`company-pictures/${this.inputCompany?.id}`, formData).subscribe({
        next: () => window.location.reload(),
        error: (err) => console.error('Upload failed', err)
      });
    }
    this.apiService.put(`companies/${this.inputCompany?.id}`,updatedFields).subscribe({
      next : () => window.location.reload,
      error : (err) =>{
        console.log("Error on update company ",err);
      }
    })
  }
  onCancel(){
    this.updateCompanyCanceled.emit();
  }
}
