import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  mensaje: string = ''; 

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  enviarFormulario() {
    if (this.forgotPasswordForm.valid) {
      const { email } = this.forgotPasswordForm.value;

      this.authService.forgotPassword(email).subscribe({
        next: () => {
          this.mensaje = '✅ Correo enviado.';
          this.router.navigate(['/login']); 
        },
        error: (err) => {
          console.error('❌ Error al enviar correo:', err);
          this.mensaje = '❌ Error al enviar el correo. Inténtalo de nuevo.';
        }
      });
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}

