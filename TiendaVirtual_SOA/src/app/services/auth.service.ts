import { Injectable } from '@angular/core';
import { 
  Auth, 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signInWithPopup,  // 🔹 Agregado
  User, 
  UserCredential,   // 🔹 Agregado
  sendPasswordResetEmail, // Agregado 
  FacebookAuthProvider 
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

  // Iniciar sesión con GitHub
  loginWithGitHub(): Observable<UserCredential> {
    const provider = new GithubAuthProvider();
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

  //para recuperar contraseña
  forgotPassword(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email)).pipe(
      catchError(error => {
        console.error('Error al recuperar contraseña:', error);
        throw error;
      })
    );
  }

  // Iniciar sesión con facebook
  loginWithFacebook(): Observable<UserCredential> {
    const provider = new FacebookAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }
  



}
