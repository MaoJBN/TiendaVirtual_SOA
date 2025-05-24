import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductListComponent } from '../dashboard/components/product-list/product-list.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
