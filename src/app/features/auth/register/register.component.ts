import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, UserRole } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required], 
        role: [this.getUserRole(), Validators.required]
      },
    );
  }

  private getUserRole(): UserRole {
    const storedRole = localStorage.getItem('userType') ?? 'STUDENT';
    return UserRole[storedRole as keyof typeof UserRole] || UserRole.STUDENT;
  }

  private passwordMatchValidator() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {    
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched(); 
      return;
    }

    if (this.passwordMatchValidator()) {
      this.registerForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: (data) => {
        console.log('Response:', data);
        this.router.navigate(['/connexion'])
      },
      error: (err) => console.error('Registration failed:', err)
    });
  }
}
