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
        lastName: ['', []],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required], 
        role: [this.getUserRole(), Validators.required]
      },
    );
  }

  private getUserRole(): UserRole {
    const storedRole = localStorage.getItem('userType');
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

    const formData = { 
      ...this.registerForm.value,
      lastName: this.registerForm.get('lastName')?.value || null,
    };

    this.authService.register(formData).subscribe({
      next: (data) => {
        console.log('Response:', data);
        this.router.navigate(['/authentification/connexion'])
      },
      error: (err) => console.error('Registration failed:', err)
    });
  }
}
