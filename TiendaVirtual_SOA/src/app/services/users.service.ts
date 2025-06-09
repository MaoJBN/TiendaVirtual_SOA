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

  // Listar todos los usuarios
  getAll(): Observable<Usuario[]> {
    return collectionData(this.coll, { idField: 'id' }) as Observable<Usuario[]>;
  }

  // Obtener un usuario por UID
  getById(id: string): Observable<Usuario> {
    const ref = doc(this.firestore, `usuarios/${id}`);
    return docData(ref, { idField: 'id' }) as Observable<Usuario>;
  }

  // Crear un usuario con UID como ID
  create(id: string, data: Usuario): Promise<void> {
    const ref = doc(this.firestore, `usuarios/${id}`);
    return setDoc(ref, data);
  }

  // Actualizar datos de un usuario
  update(id: string, data: Partial<Usuario>): Promise<void> {
    const ref = doc(this.firestore, `usuarios/${id}`);
    return updateDoc(ref, data);
  }

  // Eliminar usuario
  delete(id: string): Promise<void> {
    const ref = doc(this.firestore, `usuarios/${id}`);
    return deleteDoc(ref);
  }
}
