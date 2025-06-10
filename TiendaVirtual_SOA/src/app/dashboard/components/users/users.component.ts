import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { UsersService, Usuario } from '../../../services/users.service';
import { Timestamp, collection, getDocs } from 'firebase/firestore';
import { AuthService } from '../../../services/auth.service';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usuarios: Usuario[] = [];
  allUsuarios: Usuario[] = [];
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;
  todosLogins: {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date | null;
}[] = [];


  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarUsuariosConLogins();
    // Cargamos al iniciar
  }

  testAgregarLogin() {
    const user = this.authService.getCurrentUser();
    if (!user) {
      console.error('No hay usuario autenticado');
      return;
    }

    const userData: Usuario = {
      firstName: 'Test',
      lastName: 'Manual',
      email: user.email || '',
      createdAt: new Date()
    };

    this.usersService.addLogin(user.uid, userData)
      .then(() => console.log('Login agregado correctamente'))
      .catch(error => console.error('Error al agregar login:', error));
  }

  async cargarUsuariosConLogins(): Promise<void> {
  console.log("Holaaaa");

  try {
    const users = await firstValueFrom(this.usersService.getAll());
    const todosLogins: Usuario[] = [];
    console.log("Usuarios:", users);

    for (const user of users || []) {
      if (!user.id) continue;

      const loginDocs = await getDocs(this.usersService.getLoginsRef(user.id));
      loginDocs.forEach(doc => {
        const loginData = doc.data();
        todosLogins.push({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: loginData['createdAt']?.toDate?.() ?? null,
        });
      });
    }

    console.log("Todos los logins:", todosLogins);
    this.todosLogins = todosLogins; // <-- Asignar a tu variable del componente
  } catch (error) {
    console.error("Error cargando usuarios con logins:", error);
  }
}






  // MAWI ESTO ESTA TAL CUAL LO COPIE DEL OTRO LUGAR 


  // Paginación
  loadProductsPage(page: number): void {
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.usuarios = this.allUsuarios.slice(startIndex, endIndex);
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
}
