import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Company, Teacher, User, Visit } from '../../core/services/types.service';

@Component({
  selector: 'app-add-visit',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-visit.component.html',
  styleUrl: './add-visit.component.css'
})
export class AddVisitComponent {
  @Output() addVisitCanceled: EventEmitter<void> = new EventEmitter<void>();

  companies : Company[] = []
  responsables : User[] = []
  notChanged = true ;

  constructor(private api : ApiService) {}

  visit = {
    companyId : 0,
    date : '',
    time : ''
  }

  responsibleId = 0;

  ngOnInit(){
    this.api.get<Company[]>('companies').subscribe({
      next : (body : Company[]) =>{
        this.companies = body;
      },
      error : (err) =>{
        console.log(err);
      }
    })

    this.api.get<User[]>('users?role=TEACHER').subscribe({
      next : (body : User[]) => this.responsables = body ,
      error : (err) => console.log(err)
    })
  }

  onFormChange() {
      this.notChanged =
        this.visit.companyId === 0 ||
        this.responsibleId === 0 ||
        this.visit.date === '' ||
        this.visit.time === '' 
    }

    onSubmit(){
      if(!this.notChanged){
        const datetimeString = `${this.visit.date}T${this.visit.time}`;
        const visitDate = new Date(datetimeString).toISOString(); // or use `.toISOString()` for UTC format

        const request = {
          visitDate: visitDate,
          companyId: this.visit.companyId
        };

        this.api.post<Visit>('visits',request).subscribe({
          next : (body : Visit) =>{
            console.log(body)
            this.api.put(`visits/${body.id}/responsible/${this.responsibleId}`,null).subscribe({
              next : () => window.location.reload(),
            })
          },
        })
      }
    }

    onCancel(){
      this.addVisitCanceled.emit();
    }
}
