import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../services/products.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  productId: string = '';
  product: Product = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
  this.productId = this.route.snapshot.paramMap.get('id') || '';
  console.log('ID del producto:', this.productId); 

  if (this.productId) {
    this.productsService.getById(this.productId).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
        this.router.navigate(['/dashboard/productos']);
      }
    });
  }
}

  updateProduct() {
  if (!this.productId || !this.product) return;

  const cleanData = {
    name: this.product.name,
    description: this.product.description,
    price: Number(this.product.price),
    stock: Number(this.product.stock),
    imageUrl: this.product.imageUrl
  };

  this.productsService.update(this.productId, cleanData)
    .then(() => {
      console.log('Producto actualizado correctamente');
      this.router.navigate(['/dashboard/productos']);
    })
    .catch(err => console.error('Error al actualizar el producto:', err));
}
}
