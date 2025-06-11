import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; // ✨ AGREGADO PARA FILTROS
import { UsersService, Usuario } from '../../../services/users.service';
import { Timestamp, collection, getDocs } from 'firebase/firestore';
import { AuthService } from '../../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✨ AGREGADO FormsModule
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

  // ✨ NUEVAS PROPIEDADES PARA LOADING
  isLoading = false;
  loadingProgress = 0;
  totalUsers = 0;
  currentUserProcessing = 0;
  loadingMessage = 'Iniciando carga...';

  // ✨ NUEVAS PROPIEDADES PARA PAGINACIÓN DE LOGINS
  paginatedLogins: {
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date | null;
  }[] = [];
  loginPageSize: number = 10;
  currentLoginPage: number = 1;
  totalLoginPages: number = 1;

  // ✨ NUEVAS PROPIEDADES PARA FILTROS
  filteredLogins: {
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date | null;
  }[] = [];
  filtroNombre: string = '';
  filtroEmail: string = '';
  filtroFechaDesde: string = '';
  filtroFechaHasta: string = '';

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Usar el método alternativo que usa el servicio que ya funcionaba
    setTimeout(() => {
      this.cargarUsuariosConLoginsAlternativo();
    }, 100);
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

  // ✨ MÉTODO ACTUALIZADO CON LOADING Y MEJOR MANEJO DE ERRORES
  async cargarUsuariosConLogins(): Promise<void> {
    this.isLoading = true;
    this.loadingProgress = 0;
    this.todosLogins = []; // 🔥 LIMPIAR DATOS ANTERIORES
    this.paginatedLogins = []; // 🔥 LIMPIAR PAGINACIÓN
    this.loadingMessage = 'Obteniendo lista de usuarios...';
    
    try {
      // 🔥 FORZAR NUEVA CONSULTA SIN CACHE
      const users = await firstValueFrom(this.usersService.getAll(true));
      console.log("Usuarios obtenidos:", users?.length || 0);
      
      if (!users || users.length === 0) {
        this.loadingMessage = 'No se encontraron usuarios';
        this.todosLogins = [];
        return;
      }

      this.totalUsers = users.length;
      this.loadingMessage = `Procesando ${this.totalUsers} usuarios...`;
      
      const todosLogins: any[] = []; // 🔥 ARRAY TEMPORAL LIMPIO

      // Procesar cada usuario con progreso
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        this.currentUserProcessing = i + 1;
        this.loadingProgress = Math.round(((i + 1) / users.length) * 100);
        this.loadingMessage = `Procesando usuario ${i + 1} de ${users.length}: ${user.firstName} ${user.lastName}`;

        if (!user.id) {
          console.warn(`Usuario sin ID saltado:`, user);
          continue;
        }

        try {
          // 🔥 OBTENER LOGINS DE ESTE USUARIO
          const loginDocs = await getDocs(this.usersService.getLoginsRef(user.id));
          console.log(`Usuario ${user.email}: ${loginDocs.size} logins encontrados`);
          
          loginDocs.forEach(doc => {
            const loginData = doc.data();
            todosLogins.push({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              createdAt: loginData['createdAt']?.toDate?.() ?? null,
            });
          });
          
        } catch (error) {
          console.error(`Error procesando usuario ${user.email}:`, error);
        }

        // Pausa para mostrar progreso
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      // 🔥 ASIGNACIÓN FINAL
      this.todosLogins = todosLogins;
      this.aplicarFiltros(); // ✨ APLICAR FILTROS DESPUÉS DE CARGAR
      this.calculateLoginPagination(); // ✨ CALCULAR PAGINACIÓN
      this.loadingMessage = `Carga completada: ${todosLogins.length} logins encontrados`;
      
      console.log("RESULTADO FINAL - Todos los logins:", todosLogins.length);
      console.log("Detalle por usuario:", todosLogins);
      
    } catch (error) {
      console.error("Error cargando usuarios con logins:", error);
      this.loadingMessage = 'Error al cargar los datos';
      this.todosLogins = []; // 🔥 LIMPIAR EN CASO DE ERROR
      this.paginatedLogins = []; // 🔥 LIMPIAR PAGINACIÓN EN ERROR
    } finally {
      // Mostrar resultado final por un momento
      setTimeout(() => {
        this.isLoading = false;
      }, 800);
    }
  }

  // ✨ MÉTODO ALTERNATIVO USANDO EL SERVICIO QUE YA FUNCIONABA
  async cargarUsuariosConLoginsAlternativo(): Promise<void> {
    this.isLoading = true;
    this.loadingProgress = 0;
    this.todosLogins = [];
    this.paginatedLogins = []; // 🔥 LIMPIAR PAGINACIÓN
    this.loadingMessage = 'Obteniendo todos los logins...';
    
    try {
      // 🔥 USAR EL MÉTODO DEL SERVICIO QUE YA FUNCIONABA
      const todosLogins = await this.usersService.getAllLoginsConUsuario(
        (current, total, userInfo) => {
          this.currentUserProcessing = current;
          this.totalUsers = total;
          this.loadingProgress = Math.round((current / total) * 100);
          this.loadingMessage = `Procesando usuario ${current} de ${total}: ${userInfo || ''}`;
        }
      );

      this.todosLogins = todosLogins.map(login => ({
        firstName: login.firstName,
        lastName: login.lastName,
        email: login.email,
        createdAt: login.loginTime
      }));
      
      this.aplicarFiltros(); // ✨ APLICAR FILTROS DESPUÉS DE CARGAR
      this.calculateLoginPagination(); // ✨ CALCULAR PAGINACIÓN
      this.loadingMessage = `Carga completada: ${this.todosLogins.length} logins encontrados`;
      console.log("RESULTADO FINAL - Todos los logins:", this.todosLogins.length);
      
    } catch (error) {
      console.error("Error cargando usuarios con logins:", error);
      this.loadingMessage = 'Error al cargar los datos';
      this.todosLogins = [];
      this.paginatedLogins = []; // 🔥 LIMPIAR PAGINACIÓN EN ERROR
    } finally {
      setTimeout(() => {
        this.isLoading = false;
      }, 800);
    }
  }

  // ✨ MÉTODO PARA RECARGAR MANUALMENTE
  async recargarLogins(): Promise<void> {
    await this.cargarUsuariosConLoginsAlternativo();
  }

  // ✨ NUEVOS MÉTODOS PARA FILTROS
  aplicarFiltros(): void {
    let loginsFiltrados = [...this.todosLogins];

    // Filtro por nombre (firstName + lastName)
    if (this.filtroNombre.trim()) {
      const nombreBusqueda = this.filtroNombre.toLowerCase().trim();
      loginsFiltrados = loginsFiltrados.filter(login => {
        const nombreCompleto = `${login.firstName} ${login.lastName}`.toLowerCase();
        return nombreCompleto.includes(nombreBusqueda);
      });
    }

    // Filtro por email
    if (this.filtroEmail.trim()) {
      const emailBusqueda = this.filtroEmail.toLowerCase().trim();
      loginsFiltrados = loginsFiltrados.filter(login => 
        login.email.toLowerCase().includes(emailBusqueda)
      );
    }

    // Filtro por fecha desde
    if (this.filtroFechaDesde) {
      const fechaDesde = new Date(this.filtroFechaDesde);
      fechaDesde.setHours(0, 0, 0, 0);
      loginsFiltrados = loginsFiltrados.filter(login => {
        if (!login.createdAt) return false;
        const fechaLogin = new Date(login.createdAt);
        fechaLogin.setHours(0, 0, 0, 0);
        return fechaLogin >= fechaDesde;
      });
    }

    // Filtro por fecha hasta
    if (this.filtroFechaHasta) {
      const fechaHasta = new Date(this.filtroFechaHasta);
      fechaHasta.setHours(23, 59, 59, 999);
      loginsFiltrados = loginsFiltrados.filter(login => {
        if (!login.createdAt) return false;
        const fechaLogin = new Date(login.createdAt);
        return fechaLogin <= fechaHasta;
      });
    }

    this.filteredLogins = loginsFiltrados;
    this.currentLoginPage = 1; // Reset a la primera página
    this.calculateLoginPagination();
  }

  limpiarFiltros(): void {
    this.filtroNombre = '';
    this.filtroEmail = '';
    this.filtroFechaDesde = '';
    this.filtroFechaHasta = '';
    this.aplicarFiltros();
  }

  // ✨ MÉTODO PARA CALCULAR PAGINACIÓN DE LOGINS (ACTUALIZADO PARA USAR FILTROS)
  calculateLoginPagination(): void {
    const loginsParaPaginar = this.filteredLogins.length > 0 || this.hayFiltrosActivos() 
      ? this.filteredLogins 
      : this.todosLogins;
    
    this.totalLoginPages = Math.ceil(loginsParaPaginar.length / this.loginPageSize);
    this.loadLoginsPage(this.currentLoginPage);
  }

  // ✨ MÉTODO PARA CARGAR PÁGINA DE LOGINS (ACTUALIZADO PARA USAR FILTROS)
  loadLoginsPage(page: number): void {
    const loginsParaPaginar = this.filteredLogins.length > 0 || this.hayFiltrosActivos() 
      ? this.filteredLogins 
      : this.todosLogins;
    
    const startIndex = (page - 1) * this.loginPageSize;
    const endIndex = startIndex + this.loginPageSize;
    this.paginatedLogins = loginsParaPaginar.slice(startIndex, endIndex);
    this.currentLoginPage = page;
  }

  // ✨ MÉTODO AUXILIAR PARA VERIFICAR SI HAY FILTROS ACTIVOS
  hayFiltrosActivos(): boolean {
    return this.filtroNombre.trim() !== '' || 
           this.filtroEmail.trim() !== '' || 
           this.filtroFechaDesde !== '' || 
           this.filtroFechaHasta !== '';
  }

  // ✨ MÉTODO PARA OBTENER TOTAL DE LOGINS (CONSIDERANDO FILTROS)
  getTotalLogins(): number {
    return this.hayFiltrosActivos() ? this.filteredLogins.length : this.todosLogins.length;
  }

  // ✨ NUEVO MÉTODO PARA PÁGINA SIGUIENTE DE LOGINS
  nextLoginPage(): void {
    if (this.currentLoginPage < this.totalLoginPages) {
      this.loadLoginsPage(this.currentLoginPage + 1);
    }
  }

  // ✨ NUEVO MÉTODO PARA PÁGINA ANTERIOR DE LOGINS
  previousLoginPage(): void {
    if (this.currentLoginPage > 1) {
      this.loadLoginsPage(this.currentLoginPage - 1);
    }
  }

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