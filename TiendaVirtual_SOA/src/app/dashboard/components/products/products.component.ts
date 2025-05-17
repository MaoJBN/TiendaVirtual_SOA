import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

@Component({
  selector: 'app-products',
  imports: [CommonModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
   allProducts: Product[] = [
    {
      id: 1,
      name: 'Smartphone XYZ',
      description: 'Smartphone de última generación con cámara de alta resolución',
      price: 599.99,
      stock: 25,
      imageUrl: '/logo.svg'
    },
    {
      id: 2,
      name: 'Laptop Pro',
      description: 'Laptop profesional para diseñadores gráficos',
      price: 1299.99,
      stock: 8,
      imageUrl: '/logo.svg'
    },
    {
      id: 3,
      name: 'Auriculares Bluetooth',
      description: 'Auriculares inalámbricos con cancelación de ruido',
      price: 89.99,
      stock: 42,
      imageUrl: '/logo.svg'
    },
    {
      id: 4,
      name: 'Smartwatch Sport',
      description: 'Reloj inteligente con monitor cardíaco',
      price: 129.99,
      stock: 15,
      imageUrl: '/logo.svg'
    },
    {
      id: 5,
      name: 'Tablet Ultra',
      description: 'Tablet ligera con pantalla HD',
      price: 349.99,
      stock: 12,
      imageUrl: '/logo.svg'
    },
    {
      id: 6,
      name: 'Monitor 4K',
      description: 'Monitor de alta resolución para gaming',
      price: 429.99,
      stock: 7,
      imageUrl: '/logo.svg'
    },
    {
      id: 7,
      name: 'Teclado Mecánico',
      description: 'Teclado para gaming con retroiluminación',
      price: 119.99,
      stock: 22,
      imageUrl: '/logo.svg'
    },
    {
      id: 8,
      name: 'Mouse Inalámbrico',
      description: 'Mouse ergonómico de precisión',
      price: 59.99,
      stock: 30,
      imageUrl: '/Banner.png'
    },
    {
      id: 9,
      name: 'Cámara DSLR',
      description: 'Cámara profesional con lente intercambiable',
      price: 899.99,
      stock: 5,
      imageUrl: '/Banner.png'
    },
    {
      id: 10,
      name: 'Altavoz Bluetooth',
      description: 'Altavoz portátil resistente al agua',
      price: 79.99,
      stock: 18,
      imageUrl: '/Banner.png'
    },
    {
      id: 11,
      name: 'Disco Duro SSD',
      description: 'Almacenamiento rápido de 1TB',
      price: 149.99,
      stock: 20,
      imageUrl: 'assets/images/ssd.jpg'
    },
    {
      id: 12,
      name: 'Impresora Láser',
      description: 'Impresora de alta velocidad',
      price: 249.99,
      stock: 9,
      imageUrl: 'assets/images/printer.jpg'
    },
    {
      id: 13,
      name: 'Router WiFi',
      description: 'Router de alta velocidad y largo alcance',
      price: 89.99,
      stock: 15,
      imageUrl: 'assets/images/router.jpg'
    },
    {
      id: 14,
      name: 'Batería Externa',
      description: 'Cargador portátil de 20000mAh',
      price: 49.99,
      stock: 28,
      imageUrl: 'assets/images/powerbank.jpg'
    },
    {
      id: 15,
      name: 'Webcam HD',
      description: 'Cámara web con micrófono integrado',
      price: 69.99,
      stock: 14,
      imageUrl: 'assets/images/webcam.jpg'
    },
    {
      id: 16,
      name: 'Adaptador USB-C',
      description: 'Adaptador multipuerto para dispositivos modernos',
      price: 39.99,
      stock: 33,
      imageUrl: 'assets/images/adapter.jpg'
    },
    {
      id: 17,
      name: 'Ventilador USB',
      description: 'Ventilador silencioso para escritorio',
      price: 19.99,
      stock: 40,
      imageUrl: 'assets/images/fan.jpg'
    },
    {
      id: 18,
      name: 'Luz LED RGB',
      description: 'Tira de luces programables',
      price: 29.99,
      stock: 22,
      imageUrl: 'assets/images/led.jpg'
    }
  ];

  // Variables para la paginación
  products: Product[] = [];
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.allProducts.length / this.pageSize);
    this.loadProductsPage(1);
  }

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

  editProduct(id: number): void {
    // Aquí iría la lógica para editar el producto
    console.log('Editar producto con ID:', id);
  }

  deleteProduct(id: number): void {
    // Aquí iría la lógica para eliminar el producto
    console.log('Eliminar producto con ID:', id);
    if (confirm('¿Está seguro que desea eliminar este producto?')) {
      this.allProducts = this.allProducts.filter(product => product.id !== id);
      this.totalPages = Math.ceil(this.allProducts.length / this.pageSize);
      
      // Si se eliminó el último elemento de la página actual y no es la primera página
      if (this.products.length === 1 && this.currentPage > 1) {
        this.currentPage--;
      }
      
      this.loadProductsPage(this.currentPage);
    }
  }

  addProduct(): void {
    // Aquí iría la lógica para agregar un nuevo producto
    console.log('Agregar nuevo producto');
  }
}
