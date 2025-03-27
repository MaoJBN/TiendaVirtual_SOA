# Proyecto Frontend - Tienda Virtual SOA  

## Organización de carpetas y archivos dentro del proyecto  

```plaintext
/src/app
  ├── forgot-password/      # Componente para recuperación de contraseña
  ├── home/                 # Página principal
  ├── login/                # Componente de inicio de sesión
  ├── navbar/               # Barra de navegación
  ├── register/             # Componente de registro de usuarios
  ├── services/             # Servicios para comunicación con backend
  ├── app.component.css     # Estilos globales del componente raíz
  ├── app.component.html    # Plantilla principal del componente raíz
  ├── app.component.spec.ts # Pruebas unitarias del componente raíz
  ├── app.component.ts      # Lógica del componente raíz
  ├── app.config.server.ts  # Configuración específica del servidor
  ├── app.config.ts         # Configuración general de la aplicación
  ├── app.routes.server.ts  # Definición de rutas específicas del servidor
  ├── app.routes.ts         # Definición de rutas de la aplicación

/src/environments
  ├── environment.ts        # Configuración de variables de entorno para desarrollo

```

## Componentes clave
- NavbarComponent: Barra de navegación.
- LoginComponent: Página de inicio de sesión.
- RegisterComponent: Página de registro.
- ForgotPasswordComponent: Página de recuperación de contraseña.

## Servicios 
- AuthService: Manejo de autenticación (login, logout, registro).

## Rutas y navegación 
**De esta manera están definidas las rutas en app.routes.ts**

```typescript
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent }, 
    { path: '**', redirectTo: 'home' } 
];
```
## Manejo de formularios y validaciones 
**Se implementaron validaciones reactivas en los formularios utilizando FormGroup y FormControl en Angular.**

- Campo obligatorio (required): El usuario debe ingresar un correo.
- Validación de formato (email): El correo debe tener un formato válido. 


## Integración con herramientas externas 
**Este proyecto utiliza Firebase para la autenticación y almacenamiento de datos.**



