// register.component.ts
import { NavbarComponent } from './../navbar/navbar.component';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginWithGitComponent } from "../login-with-git/login-with-git.component";
import { LoginWithGoogleComponent } from "../login-with-google/login-with-google.component";
import { LoginWithFacebookComponent } from "../login-with-facebook/login-with-facebook.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule, LoginWithGitComponent, LoginWithGoogleComponent, LoginWithFacebookComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/)
      ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  enviarFormulario() {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;
      console.log('Datos a enviar:', { firstName, lastName, email });
      this.authService.register(email, password, firstName,lastName).subscribe({
        next: () => {
          console.log('✅ Registro exitoso');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => console.error('❌ Error en el registro:', err)
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  }