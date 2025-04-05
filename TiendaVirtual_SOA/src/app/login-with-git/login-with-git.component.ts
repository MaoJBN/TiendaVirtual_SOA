import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-with-git',
  imports: [],
  templateUrl: './login-with-git.component.html',
  styleUrl: './login-with-git.component.css'
})
export class LoginWithGitComponent {
  constructor(private authService: AuthService, private router: Router) {}
  loginWithGitHub(): void {
    this.authService.loginWithGitHub().subscribe(
      (userCredential) => {
        const user = userCredential.user;
        console.log('Usuario autenticado:', user);
        this.router.navigate(['/home']);  
      },
      (error) => {
        console.error('Error al autenticar con GitHub:', error);
      }
    );
  }
}
