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

  // ✅ Crear usuario (con merge para evitar sobreescrituras)
  create(id: string, data: Usuario): Promise<void> {
    const ref = doc(this.firestore, `usuarios/${id}`);
    return setDoc(ref, data, { merge: true });
  }

  // ✅ Agregar un logeo individual
  addLogin(uid: string, userData: Usuario): Promise<void> {
    const loginRef = collection(this.firestore, `usuarios/${uid}/logins`);
    console.log('Ruta del login:', `usuarios/${uid}/logins`);
    return addDoc(loginRef, userData)
      .then(() => console.log('Login agregado en', `usuarios/${uid}/logins`))
      .catch(err => console.error('Error al agregar login:', err));
  }

  // ✅ Obtener todos los usuarios
  getAll(): Observable<Usuario[]> {
    return collectionData(this.coll, { idField: 'id' }) as Observable<Usuario[]>;
  }

  // ✅ Obtener usuario por UID
  getById(id: string): Observable<Usuario> {
    const ref = doc(this.firestore, `usuarios/${id}`);
    return docData(ref, { idField: 'id' }) as Observable<Usuario>;
  }

  // ✅ Actualizar usuario
  update(id: string, data: Partial<Usuario>): Promise<void> {
    const ref = doc(this.firestore, `usuarios/${id}`);
    return updateDoc(ref, data);
  }

  // ✅ Eliminar usuario
  delete(id: string): Promise<void> {
    const ref = doc(this.firestore, `usuarios/${id}`);
    return deleteDoc(ref);
  }
  
  getLoginsRef(userId: string): CollectionReference {
    return collection(this.firestore, `usuarios/${userId}/logins`);
  }

  // ✅ Obtener TODOS los logins de TODOS los usuarios con sus datos
  async getAllLoginsConUsuario(): Promise<any[]> {
    const result: any[] = [];
    const usuariosSnap = await getDocs(this.coll);

    for (const userDoc of usuariosSnap.docs) {
      const userData = userDoc.data();
      const userId = userDoc.id;

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
