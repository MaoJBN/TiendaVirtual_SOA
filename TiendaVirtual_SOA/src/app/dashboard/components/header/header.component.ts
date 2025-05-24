import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    isLoggedIn$: Observable<boolean>;
  
    constructor(private authService: AuthService) {
      this.isLoggedIn$ = this.authService.isLoggedIn();
      console.log(this.isLoggedIn$);
    }
  logout() {
    this.authService.logout().subscribe({
      next: () => console.log('Sesión cerrada'),
      error: err => console.error('Error al cerrar sesión', err)
    });
  }
}