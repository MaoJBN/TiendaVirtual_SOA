import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';


const routes: Routes = [
  {
    path: '',
    component: MainDashboardComponent,
    children: [
      { path: 'usuarios', component: UsersComponent },
      { path: 'productos', component: ProductsComponent },
      { path: 'productos/create', component: CreateProductComponent }, 
      { path: 'productos/edit/:id', component: EditProductComponent },
      { path: '', redirectTo: 'productos', pathMatch: 'full' } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
