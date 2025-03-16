import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  enviarFormulario() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => console.log('Inicio de sesión exitoso'),
        error: err => console.error('Error al iniciar sesión', err)
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe({
      next: (userCredential) => {
        console.log('Inicio de sesión con Google exitoso', userCredential);
      },
      error: (err: any) => {
        console.error('Error con Google', err);
      }
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => console.log('Sesión cerrada'),
      error: err => console.error('Error al cerrar sesión', err)
    });
  }
}
