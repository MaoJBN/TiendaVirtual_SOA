import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-with-google',
  imports: [],
  templateUrl: './login-with-google.component.html',
  styleUrl: './login-with-google.component.css'
})
export class LoginWithGoogleComponent {
  constructor(private authService: AuthService, private router: Router) {}
  loginWithGoogle(): void {
    this.authService.loginWithGoogle().subscribe(
      (userCredential) => {
        const user = userCredential.user;
        console.log('Usuario autenticado:', user);
        this.router.navigate(['/home']);  
      },
      (error) => {
        console.error('Error al autenticar con Google:', error);
      }
    );
  }
}