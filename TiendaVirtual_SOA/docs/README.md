# 🛒 Tienda Virtual SOA

## 🧩 Introducción
**Tienda Virtual SOA** es una plataforma web desarrollada con **Angular** y potenciada por **Firebase**, que permite a los usuarios registrarse, iniciar sesión y comprar productos de forma rápida, segura y con una interfaz moderna. El sistema está diseñado pensando en la experiencia del usuario, combinando rendimiento, seguridad y usabilidad.

## 🎯 Objetivo y Alcance

### Objetivo
Crear una tienda en línea robusta, escalable y segura, donde los usuarios puedan:
- Registrarse o iniciar sesión fácilmente.
- Explorar productos con descripciones, precios e imágenes.
- Agregar artículos al carrito y completar compras de forma ágil.
- Contar con un panel administrativo para la gestión del negocio.

### Alcance del Proyecto
- ✅ Registro e inicio de sesión con múltiples métodos: correo, Google, GitHub, Facebook.
- ✅ Guardado de datos del usuario en Firestore.
- ✅ Registro de cada inicio de sesión con timestamp.
- ✅ Visualización y administración de usuarios y sus logins.
- ✅ Gestión CRUD de productos.
- ✅ Carrito de compras funcional con opción a eliminar productos.
- ✅ Panel administrativo para control de productos y usuarios.
- ✅ Interfaz responsiva para dispositivos móviles y escritorio.
- ⚙️ Preparado para integración futura de pasarela de pagos.

## 🧠 Problemática
Muchas tiendas online carecen de una experiencia fluida y amigable, y presentan procesos de registro o compra poco eficientes. Esto causa abandono de carritos, pérdida de usuarios y reducción en ventas.  
**Tienda Virtual SOA** busca resolver esto con:
- Flujos de autenticación intuitivos.
- Registro automático de actividad de usuario.
- Un sistema de navegación y compra fluido y responsivo.
- Un backend confiable basado en Firebase.

## 📈 Impacto Esperado
- 💡 Mejorar significativamente la experiencia de usuario.
- 🔐 Aumentar la seguridad y trazabilidad del sistema mediante registros de actividad.
- 🛍️ Facilitar la compra online para cualquier usuario.
- 💼 Permitir a pymes tener una tienda online moderna y funcional.

## 🛠️ Tecnologías Utilizadas

| Tecnología     | Descripción |
|----------------|-------------|
| **Angular**    | Framework frontend moderno, basado en componentes. |
| **Firebase**   | Base de datos en tiempo real, autenticación, y hosting. |
| **Firestore**  | Almacenamiento estructurado para usuarios, productos y logs. |
| **JWT**        | (Planeado) Seguridad en sesiones mediante tokens. |
| **Bootstrap**  | Framework para estilos rápidos y responsivos. |
| **GitHub**     | Repositorio del código fuente y control de versiones. |
| **Jira**       | Planificación y gestión ágil del proyecto. |
| **VSCode**     | Entorno de desarrollo preferido del equipo. |

## 🔐 Autenticación y Registro de Usuarios

- Los usuarios pueden registrarse con correo y contraseña, o mediante Google, GitHub o Facebook.
- Al registrarse, se guarda en Firestore su información personal (nombre, apellido, email, fecha).
- Cada vez que un usuario inicia sesión, se registra un **login log** con `timestamp`, email, nombre y apellido, en una subcolección del usuario.
- Esta información permite visualizar la actividad del usuario desde el panel administrativo.

## 👥 Roles del Equipo

| Rol | Integrante | Descripción |
|-----|------------|-------------|
| **Scrum Master** | Kevin | Facilita el desarrollo ágil y organiza el trabajo del equipo. |
| **Frontend Dev** | Andrea | Desarrolla la interfaz de usuario y la navegación en Angular. |
| **Backend Dev** | Mauricio | Crea la lógica del servidor y gestiona Firestore, autenticación y más. |

## 🚀 Instalación y Ejecución

```bash
# Clonar el repositorio
git clone https://github.com/usuario/tienda-virtual-soa.git

# Entrar al directorio del proyecto
cd tienda-virtual-soa

# Instalar dependencias
npm install

# Correr el proyecto en modo desarrollo
ng serve --open
