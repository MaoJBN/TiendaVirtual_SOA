import { Injectable } from '@angular/core';
import { 
  Auth, 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,  // 🔹 Agregado
  User, 
  UserCredential   // 🔹 Agregado
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router) {}

  // Registro de usuario
  register(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError(error => {
        console.error('Error en el registro:', error);
        throw error;
      })
    );
  }

  // Iniciar sesión con correo y contraseña
  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // Iniciar sesión con Google (con redirección)
  loginWithGoogle(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  // Cerrar sesión
  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  // Obtener usuario autenticado
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
