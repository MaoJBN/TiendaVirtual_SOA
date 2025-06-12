# Proyecto Frontend - Tienda Virtual SOA  

## Organización de carpetas y archivos dentro del proyecto  

```plaintext
/src/app
  ├── dashboard/             # Módulo del panel de control (dashboard)
  │   ├── components/        # Componentes reutilizables del dashboard
  │   │   ├── footer/        # Componente de pie de página
  │   │   ├── header/        # Componente de encabezado
  │   │   ├── main-dashboard/ # Vista principal del dashboard
  │   │   ├── product-list/  # Lista de productos
  │   │   ├── products/      # Gestión de productos
  │   │   ├── sidebar/       # Barra lateral de navegación
  │   │   ├── users/         # Gestión de usuarios
  │   ├── dashboard-routing.module.ts # Rutas del módulo dashboard
  │   └── dashboard.module.ts         # Módulo de Angular del dashboard
  ├── forgot-password/      # Componente para recuperación de contraseña
  ├── home/                 # Página principal
  ├── login/                # Componente de inicio de sesión con email/contraseña
  ├── login-with-facebook/  # Autenticación con Facebook
  ├── login-with-git/       # Autenticación con GitHub
  ├── login-with-google/    # Autenticación con Google
  ├── navbar/               # Barra de navegación superior
  ├── register/             # Componente de registro de usuarios
  ├── services/             # Servicios para comunicación con backend y lógica de negocio
  ├── app.component.css     # Estilos globales del componente raíz
  ├── app.component.html    # Plantilla principal del componente raíz
  ├── app.component.spec.ts # Pruebas unitarias del componente raíz
  ├── app.component.ts      # Lógica del componente raíz
  ├── app.config.server.ts  # Configuración específica del servidor
  ├── app.config.ts         # Configuración general de la aplicación
  ├── app.routes.server.ts  # Definición de rutas del lado del servidor
```

## Componentes clave
- **NavbarComponent**: Barra de navegación.
- **LoginComponent**: Página de inicio de sesión.
- **RegisterComponent**: Página de registro.
- **ForgotPasswordComponent**: Página de recuperación de contraseña.
- **DashboardModule**: Módulo del panel administrativo con componentes como Sidebar, Header, Users, Products, etc.

## Servicios  
- **AuthService**: Manejo de autenticación (login, logout, registro).
- Otros servicios pueden incluir interacción con productos, usuarios y roles.

## Rutas y navegación  
**Definición de rutas típica en `app.routes.ts` (fragmento de ejemplo):**

```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '**', redirectTo: 'home' }
];
```

## Manejo de formularios y validaciones  
**Se usan formularios reactivos (`FormGroup`, `FormControl`) con validaciones como:**

- `required`: Campo obligatorio (ej. correo electrónico).
- `email`: Verifica formato válido de correo.

## Integración con herramientas externas  
- **Firebase**: Para autenticación (incluyendo proveedores como Google, GitHub, Facebook) y almacenamiento de datos.
