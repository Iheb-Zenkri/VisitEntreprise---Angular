import { TokenService } from './../../core/services/token.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../core/services/types.service';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-update-user-info',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-user-info.component.html',
  styleUrl: './update-user-info.component.css'
})
export class UpdateUserInfoComponent {
  @Output() updateCancelled: EventEmitter<void> = new EventEmitter<void>();
  @Input() user : User | null = null

  updatedUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  notChanged = true ;

  constructor(private apiService: ApiService,private tokenService :TokenService){}

  ngOnInit(){
    this.updatedUser = {
      firstName: this.user?.firstName??'',
      lastName: this.user?.lastName??'',
      email: this.user?.email??'',
      password: ''
    };
  }

  onFormChange() {
    this.notChanged =
      this.updatedUser.firstName === this.user?.firstName &&
      this.updatedUser.lastName === this.user?.lastName &&
      this.updatedUser.email === this.user?.email &&
      this.updatedUser.password === '';
  }

  onSubmit(){
      const updatedFields: any = {};
      if (this.updatedUser.firstName !== this.user?.firstName) {
        updatedFields.firstName = this.updatedUser.firstName;
      }
      if (this.updatedUser.lastName !== this.user?.lastName) {
        updatedFields.lastName = this.updatedUser.lastName;
      }
      if (this.updatedUser.email !== this.user?.email) {
        updatedFields.email = this.updatedUser.email;
      }
      if (this.updatedUser.password) {
        updatedFields.password = this.updatedUser.password;
      }
      console.log(updatedFields)

      this.apiService.put(`users/${this.user?.id}`,updatedFields).subscribe({
        next : async (response) => {
          if(updatedFields.email || updatedFields.password){
            this.tokenService.clearToken()
          }
          localStorage.setItem('user',JSON.stringify(response))
          window.location.reload()
        },
        error : (error) => {
          console.error('Update failed', error);
        }
      });
  }
  onCancel() {
    this.updateCancelled.emit();
  }
}
