import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../../../services/products.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  product = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: ''
  };

  constructor(private productService: ProductsService, private router: Router) {}

  createProduct(): void {
    this.productService.create(this.product)
      .then(() => {
        alert('Producto creado con éxito');
        this.router.navigate(['/dashboard/productos']); 
      })
      .catch(error => {
        console.error('Error al crear producto:', error);
        alert('Error al crear producto');
      });
  }
}
