import { Company } from './../../../core/services/types.service';
import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CompanyCardComponent } from "../../../components/company-card/company-card.component";
import { CommonModule } from '@angular/common';
import { AddCompanyComponent } from "../../../components/add-company/add-company.component";

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, CompanyCardComponent, AddCompanyComponent],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {
  Companies : Company[] = []
  constructor(private api: ApiService) {}

  ngOnInit(){
    this.api.get<Company[]>('companies').subscribe({
      next : (body : Company[]) =>{
        this.Companies = body;
        console.log(this.Companies);
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }

  isAddCompanyToggled = false ;
  toggleAddCompanyForm(){
    this.isAddCompanyToggled = !this.isAddCompanyToggled;
  }
}
