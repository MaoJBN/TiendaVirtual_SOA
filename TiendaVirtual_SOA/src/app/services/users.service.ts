import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  docData,
  setDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  addDoc,
  getDocs
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private coll: CollectionReference<Usuario>;

  constructor(private firestore: Firestore) {
    this.coll = collection(this.firestore, 'usuarios') as CollectionReference<Usuario>;
  }

  // Métodos existentes sin cambios...
  create(id: string, data: Usuario): Promise<void> {
    const ref = doc(this.firestore, `usuarios/${id}`);
    return setDoc(ref, data, { merge: true });
  }

  addLogin(uid: string, userData: Usuario): Promise<void> {
    const loginRef = collection(this.firestore, `usuarios/${uid}/logins`);
    console.log('Ruta del login:', `usuarios/${uid}/logins`);
    return addDoc(loginRef, userData)
      .then(() => console.log('Login agregado en', `usuarios/${uid}/logins`))
      .catch(err => console.error('Error al agregar login:', err));
  }
  addUser(uid: string, loginData: any): Promise<void> {
    const loginRef = collection(this.firestore, `usuarios/${uid}/logins`);
    const newLoginDoc = doc(loginRef); // crea ID aleatorio
    return setDoc(newLoginDoc, loginData);
  }

  // ✅ Obtener todos los usuarios (con opción para evitar caché)
  getAll(forceRefresh = false): Observable<Usuario[]> {
    // Si necesitas forzar refresco, puedes agregar un timestamp
    const timestamp = forceRefresh ? Date.now() : '';
    return collectionData(this.coll, { idField: 'id' }) as Observable<Usuario[]>;
  }

  getById(id: string): Observable<Usuario> {
    const ref = doc(this.firestore, `usuarios/${id}`);
    return docData(ref, { idField: 'id' }) as Observable<Usuario>;
  }

  update(id: string, data: Partial<Usuario>): Promise<void> {
    const ref = doc(this.firestore, `usuarios/${id}`);
    return updateDoc(ref, data);
  }

  delete(id: string): Promise<void> {
    const ref = doc(this.firestore, `usuarios/${id}`);
    return deleteDoc(ref);
  }
  
  getLoginsRef(userId: string): CollectionReference {
    return collection(this.firestore, `usuarios/${userId}/logins`);
  }

  // ✨ MÉTODO ACTUALIZADO CON CALLBACK DE PROGRESO
  async getAllLoginsConUsuario(
    onProgress?: (current: number, total: number, userInfo?: string) => void
  ): Promise<any[]> {
    const result: any[] = [];
    const usuariosSnap = await getDocs(this.coll);
    const totalUsers = usuariosSnap.docs.length;

    for (let i = 0; i < usuariosSnap.docs.length; i++) {
      const userDoc = usuariosSnap.docs[i];
      const userData = userDoc.data();
      const userId = userDoc.id;

      // Reportar progreso con información del usuario
      if (onProgress) {
        onProgress(i + 1, totalUsers, `${userData.firstName} ${userData.lastName}`);
      }

      const loginsSnap = await getDocs(
        collection(this.firestore, `usuarios/${userId}/logins`)
      );

      loginsSnap.forEach(loginDoc => {
        const loginData = loginDoc.data();
        result.push({
          ...userData,
          loginTime: (loginData['createdAt']?.toDate?.() ?? loginData['createdAt']) ?? null,
        });
      });
    }

    return result;
  }


}