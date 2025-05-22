import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Product {
  id?: string;        
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private coll: CollectionReference<Product>;

  constructor(private firestore: Firestore) {
    this.coll = collection(this.firestore, 'products') as CollectionReference<Product>;
  }

  // Listar todos
  getAll(): Observable<Product[]> {
    return collectionData(this.coll, { idField: 'id' }) as Observable<Product[]>;
  }

  // Obtener uno
  getById(id: string): Observable<Product> {
    const ref = doc(this.firestore, `products/${id}`);
    return docData(ref, { idField: 'id' }) as Observable<Product>;
  }

  // Crear
  create(product: any): Promise<any> {
    const productsRef = collection(this.firestore, 'products');
    return addDoc(productsRef, product);
  }


  // Actualizar
  update(id: string, data: Partial<Product>): Promise<void> {
    const ref = doc(this.firestore, `products/${id}`);
    return updateDoc(ref, data);
  }

  // Eliminar
  delete(id: string): Promise<void> {
    const ref = doc(this.firestore, `products/${id}`);
    return deleteDoc(ref);
  }
}
