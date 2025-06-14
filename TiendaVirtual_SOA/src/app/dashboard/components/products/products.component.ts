import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


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

  products: Product[] = [];
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 1; 

  constructor(
    private productsService: ProductsService,
    private router: Router  
  ) {}

  ngOnInit(): void {
    this.productsService.getAll().subscribe((data) => {
      this.allProducts = data;
      this.totalPages = Math.ceil(this.allProducts.length / this.pageSize);
      this.loadProductsPage(1);
    });
  }

  // Paginación
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

  
  editProduct(id: string | undefined): void {
    this.router.navigate(['/dashboard/productos/edit', id]);
  }


  deleteProduct(id: string | undefined): void {
    if (!id) return;
            Swal.fire({
              title: '¿Estás seguro?',
              text: '¡No podrás revertir esto!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Sí, eliminarlo',
              cancelButtonText: 'Cancelar'
              }).then((result) => {
              if (result.isConfirmed) {
                this.productsService.delete(id)
                Swal.fire('Eliminado', 'El elemento ha sido eliminado.', 'success');
              }
        });
  }

  
  addProduct(): void {
    this.router.navigate(['/dashboard/productos/create']);
  }
}
