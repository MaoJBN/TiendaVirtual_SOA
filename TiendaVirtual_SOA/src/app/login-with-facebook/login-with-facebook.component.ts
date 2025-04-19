import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-with-facebook',
  imports: [],
  templateUrl: './login-with-facebook.component.html',
  styleUrl: './login-with-facebook.component.css'
})
export class LoginWithFacebookComponent {
  constructor(private authService: AuthService, private router: Router) {}

  loginWithFacebook(): void {
    this.authService.loginWithFacebook().subscribe(
      (userCredential) => {
        const user = userCredential.user;
        console.log('Usuario autenticado con Facebook:', user);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error al autenticar con Facebook:', error);
      }
    );
  }

}
 