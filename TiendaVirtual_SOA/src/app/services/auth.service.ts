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
  FacebookAuthProvider,
  authState,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | null>;

constructor(private auth: Auth, private router: Router) {
  this.user$ = authState(this.auth);  // observable que emite el usuario o null si no hay sesión
}


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
  


  // ... tus métodos existentes aquí ...

  // Método para saber si el usuario está logueado, devuelve true o false (como observable)
  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      this.user$.subscribe(user => {
        subscriber.next(!!user); // true si hay usuario, false si es null
      });
    });
  }



}
