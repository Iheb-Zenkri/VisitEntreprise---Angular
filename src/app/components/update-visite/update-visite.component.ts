import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User, Visit, VisitProgram } from '../../core/services/types.service';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-visite',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './update-visite.component.html',
  styleUrl: './update-visite.component.css'
})
export class UpdateVisiteComponent {
 @Output() updateVisitCanceled: EventEmitter<void> = new EventEmitter<void>();
 @Input() inputVisit : Visit |undefined

 responsables : User[] = []
 notChanged = true ;
 visitPrograms : VisitProgram[] = []

 visit = {
  responsibleId : 0,
  date : '',
  time : '',
  status:''
}
   constructor(private api : ApiService) {}
 
   ngOnInit(){  
      const dateObj = new Date(this.inputVisit?.visitDate??Date.now())
      this.visit = {
        responsibleId : this.inputVisit?.responsible.id??0,
        date : dateObj.toLocaleDateString('en-CA'),
        time : dateObj.toTimeString().slice(0, 5),
        status : this.inputVisit?.status??"PLANNED"
      } 

      this.api.get<User[]>('users?role=TEACHER').subscribe({
        next : (body : User[]) => this.responsables = body ,
        error : (err) => console.log(err)
      })

      this.api.get<VisitProgram[]>(`visit-programs/by-visit/${this.inputVisit?.id}`).subscribe({
      next : (programs : VisitProgram[]) => this.visitPrograms = programs,
      error : (error) => {
        console.error('Failed to load PDF', error);
      }
    })
  }

  onFormChange() {
    this.notChanged =
      this.visit.responsibleId === 0 &&
      this.visit.date === '' &&
      this.visit.time === '' 
  }

  onSubmit(){
    if(!this.notChanged){
      const datetimeString = `${this.visit.date}T${this.visit.time}`;
      const visitDate = new Date(datetimeString).toISOString(); 
      const request = {
        visitDate: visitDate,
        status : this.visit.status
      };
      this.api.put<Visit>(`visits/${this.inputVisit?.id}`,request).subscribe({
        next : () => {
          if(this.visit.responsibleId !== 0 && this.visit.responsibleId !== this.inputVisit?.responsible.id){
            this.api.put(`visits/${this.inputVisit?.id}/responsible/${this.visit.responsibleId}`,null).subscribe();
          }
          window.location.reload()
        }
      })
    }
  }

  openPdf(id : number): void {
    this.api.getBlob(`visit-programs/file/${id}`).subscribe({
      next : (blob: Blob) => {
        const file = new Blob([blob], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, '_blank');
    }, 
    error : (error) => {
      console.error('Failed to load PDF', error);
    }
  });
  }

  onFileSelected(event: Event, fileInput: HTMLInputElement): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
  
      if (file.type === 'application/pdf') {
        const formData = new FormData();
        formData.append('file', file);
        this.api.post<VisitProgram>(`visit-programs/${this.inputVisit?.id}`, formData).subscribe({
          next: (res : VisitProgram) => this.visitPrograms = [...this.visitPrograms,res],
          error: (err) => console.error('Upload error', err)
        });
      } else {
        alert('Only PDF files are allowed.');
      }
    }
    fileInput.value = '';
  }

  getUploadedAt(dateString : string | undefined) : string {
    const date = new Date(dateString ?? Date.now());
    const monthNameInFrench = date.toLocaleString('fr-FR', { month: 'long' });
    const dd = String(date.getDate()).padStart(2, '0');
    return `ajouter le ${dd} ${monthNameInFrench}`;
  }

  deleteDocument(id : number){
    this.api.delete(`visit-programs/${id}`).subscribe({
      next : () =>{
        this.visitPrograms = this.visitPrograms.filter(program => program.id !== id);
      }
    })
  }

  onCancel(){
    this.updateVisitCanceled.emit();
  }

}
