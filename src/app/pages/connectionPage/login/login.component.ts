import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService,
      private tokenService : TokenService,private router : Router) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(1)]],
        expiresIn30Days: [false] 
      });
    }

    onSubmit() {
      if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched(); 
        return;
      }
      else {
        this.authService.login(this.loginForm.value).subscribe({
          next: async (response :any) =>{
            this.tokenService.setToken(response.token)
            localStorage.setItem('user',JSON.stringify(response.user))
            const redirectTo = `/${this.tokenService.getUserRole().toLowerCase()}`;
            this.router.navigate([redirectTo]);
          }
        });
      }
    }

    forgetPassword(){
      if (this.loginForm.get('email')?.invalid) {
        this.loginForm.get('email')?.markAsTouched(); 
        return;
      }else{
        const email = this.loginForm.get('email')?.value;
        this.authService.forgetPassword(email).subscribe();
      }
    }
}
