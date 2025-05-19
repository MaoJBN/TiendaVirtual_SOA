import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';

interface Product {
  id?: string;      
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [];

  // Variables para la paginación
  products: Product[] = [];
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    
    this.productsService.getAll().subscribe((data) => {
      this.allProducts = data;
      this.totalPages = Math.ceil(this.allProducts.length / this.pageSize);
      this.loadProductsPage(1);
    });
  }

  //Paginación
  loadProductsPage(page: number): void {
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.products = this.allProducts.slice(startIndex, endIndex);
    this.currentPage = page;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadProductsPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.loadProductsPage(this.currentPage - 1);
    }
  }

  // para editar 
  editProduct(id: string | undefined): void {
    if (!id) return;

    const product = this.allProducts.find(p => p.id === id);
    if (!product) return;

    const name = prompt('Nuevo nombre del producto:', product.name) || product.name;
    const description = prompt('Nueva descripción:', product.description) || product.description;
    const priceStr = prompt('Nuevo precio:', product.price.toString());
    const stockStr = prompt('Nuevo stock:', product.stock.toString());
    const imageUrl = prompt('Nueva URL de imagen:', product.imageUrl) || product.imageUrl;

    const price = parseFloat(priceStr || product.price.toString());
    const stock = parseInt(stockStr || product.stock.toString(), 10);

    const updatedProduct = {
      name,
      description,
      price,
      stock,
      imageUrl
    };

    this.productsService.update(id, updatedProduct)
      .then(() => {
        console.log('Producto actualizado');
        // Actualizar la lista para reflejar los cambios
        const index = this.allProducts.findIndex(p => p.id === id);
        if (index !== -1) {
          this.allProducts[index] = { id, ...updatedProduct };
          this.loadProductsPage(this.currentPage); 
        }
      })
    .catch(err => console.error('Error al actualizar:', err));
  }


  //  para eliminar 
  deleteProduct(id: string | undefined): void {
    if (!id) return;
    if (confirm('¿Está seguro que desea eliminar este producto?')) {
      this.productsService.delete(id)
        .then(() => console.log('Producto eliminado'))
        .catch(err => console.error('Error al eliminar:', err));
    }
  }

  // para crear 
  addProduct(): void {
    const name = prompt('Nombre del producto:');
    if (!name) { return; }
    const description = prompt('Descripción:') || '';
    const price = parseFloat(prompt('Precio:') || '0');
    const stock = parseInt(prompt('Stock:') || '0', 10);
    const imageUrl = prompt('URL de la imagen:') || '';

    this.productsService.create({
      name,
      description,
      price,
      stock,
      imageUrl
    })
    .then(() => console.log('Producto creado exitosamente'))
    .catch(err => console.error('Error al crear producto:', err));
  }
}
