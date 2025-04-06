import { NavbarComponent } from './../navbar/navbar.component';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginWithGitComponent } from "../login-with-git/login-with-git.component";
import { LoginWithGoogleComponent } from "../login-with-google/login-with-google.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule, LoginWithGitComponent, LoginWithGoogleComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  enviarFormulario() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;

      this.authService.register(email, password).subscribe({
        next: () => {
          console.log('✅ Registro exitoso');
          this.router.navigate(['/dashboard']); // Redirige tras éxito
        },
        error: (err) => console.error('❌ Error en el registro:', err)
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  // loginWithGoogle() {
  //   this.authService.loginWithGoogle().subscribe({
  //     next: () => {
  //       console.log('✅ Registro con Google exitoso');
  //       this.router.navigate(['/dashboard']); // Redirige tras éxito
  //     },
  //     error: (err) => console.error('❌ Error al registrar con Google:', err)
  //   });
  // }
}
