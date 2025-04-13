import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserRole } from '../../../core/services/auth.service';

@Component({
  selector: 'app-pre-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pre-login.component.html',
  styleUrl: './pre-login.component.css'
})
export class PreLoginComponent {

  
  ngOnInit(): void {
    localStorage.removeItem('userType');
  }

  setUserRole(index: number) {
  switch(index){
    case 0 : this.selectedRole = UserRole.ADMIN;break;
    case 1 :this.selectedRole = UserRole.TEACHER;break;
    default : this.selectedRole = UserRole.STUDENT;
  }
}
  selectedRole : UserRole = UserRole.STUDENT;
  
  constructor(private router :Router){}
  submit(){
    localStorage.setItem('userType', this.selectedRole)
    this.router.navigate(['authentification/connexion']);
  }
}