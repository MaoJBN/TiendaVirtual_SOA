import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  User,
  UserCredential,
  sendPasswordResetEmail,
  FacebookAuthProvider,
  authState
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Usuario, UsersService } from './users.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(
    private auth: Auth,
    private router: Router,
    private usersService: UsersService // ojo
  ) {
    this.user$ = authState(this.auth);
  }

  // Registro de usuario
  register(email: string, password: string, firstName: string, lastName: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(userCredential => {
        const uid = userCredential.user.uid;
        const userData: Usuario = {
          firstName,
          lastName,
          email,
          createdAt: new Date()
        };
        return from(this.usersService.addLogin(uid, userData));
      }),
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



  //loginWithGoogle(): Observable<UserCredential> {
    //const provider = new GoogleAuthProvider();
    //return from(signInWithPopup(this.auth, provider));
  //}                                    esto lo comenté para probar la parte de los usuarios (metodo actualizado abajo) --- hice lo mismo para github y para facebook

  // Iniciar sesión con Google
  loginWithGoogle(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider(); // Acá definís el provider
    return from(signInWithPopup(this.auth, provider)).pipe(
      switchMap(async (credential: UserCredential) => {
        const user = credential.user;
        const uid = user.uid;

        const userData: Usuario = {
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ')[1] || '',
          email: user.email || '',
          createdAt: new Date()
        };

        // Crear el documento si no existe (merge para no pisar datos)
        await this.usersService.create(uid, userData);

        // Registrar logeo (no sobrescribe)
        await this.usersService.addLogin(uid, userData);

        return credential;
      }),
      catchError(error => {
        console.error('Error en login con Google:', error);
        throw error;
      })
    );
  }


  // Iniciar sesión con GitHub
  loginWithGitHub(): Observable<UserCredential> {
    const provider = new GithubAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(
    switchMap(async (credential: UserCredential) => {
      const user = credential.user;
      const uid = user.uid;

      const userData: Usuario = {
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ')[1] || '',
        email: user.email || '',
        createdAt: new Date()
      };

      // 🔥 Guardar/actualizar usuario sin sobrescribirlo
      await this.usersService.create(uid, userData);

      // 🔥 Agregar logeo a la subcolección
      await this.usersService.addLogin(uid, userData);

      return credential;
    }),
    catchError(error => {
      console.error('Error en login con Google:', error);
      throw error;
    })
  );
  }


  // Iniciar sesión con Facebook
  loginWithFacebook(): Observable<UserCredential> {
    const provider = new FacebookAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(
    switchMap(async (credential: UserCredential) => {
      const user = credential.user;
      const uid = user.uid;

      const userData: Usuario = {
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ')[1] || '',
        email: user.email || '',
        createdAt: new Date()
      };

      // 🔥 Guardar/actualizar usuario sin sobrescribirlo
      await this.usersService.create(uid, userData);

      // 🔥 Agregar logeo a la subcolección
      await this.usersService.addLogin(uid, userData);

      return credential;
    }),
    catchError(error => {
      console.error('Error en login con Google:', error);
      throw error;
    })
  );
  }


  // Cerrar sesión
  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  // Obtener usuario autenticado
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  // Recuperar contraseña
  forgotPassword(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email)).pipe(
      catchError(error => {
        console.error('Error al recuperar contraseña:', error);
        throw error;
      })
    );
  }

  // Saber si el usuario está logueado
  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      this.user$.subscribe(user => {
        subscriber.next(!!user);
      });
    });
  }
}
