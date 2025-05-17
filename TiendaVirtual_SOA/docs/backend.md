# Proyecto backend - Tienda virtual SOA

**Tienda virtual SOA**, backend para la gestión de autenticación y usuarios. Proporciona servicios para manejar la autenticación de usuarios mediante Firebase Authentication.

#### Construcción del proyecto
Este proyecto utiliza Firebase Authentication para la gestión de usuarios.

#### Tecnologías implementadas:
- Firebase Authentication: Servicio de autenticación basado en Firebase.
- AngularFire: Librería que facilita la integración de Firebase en Angular.
- TypeScript: Lenguaje de programación basado en JavaScript que añade tipado estático.

#### Funcionalidades:
Este proyecto incluye las siguientes características:
- Registro de usuarios
- Autenticación de usuarios

#### Instalación
**Antes de comenzar, asegúrate de tener instalados los siguientes programas:**
- Node.js
- Angular CLI
- Firebase CLI (Opcional, para configuraciones avanzadas)

Para instalar las dependencias necesarias, ejecuta:
```sh
npm install firebase @angular/fire
```

#### Versiones
- Node.js: v16.x o superior
- Firebase: 11.4.0
- AngularFire: Versión compatible con Angular del proyecto


## Inicio de Sesion Con Firebase Authentication

#### 🔧 Tecnologías utilizadas

- Firebase Authentication
- Firebase SDK v9+
- JavaScript / TypeScript
- Framework: [especificar si usaste React, Angular, Vanilla, etc.], en este caso Angular

---

#### 🎯 Objetivo

Permitir a los usuarios iniciar sesión en la aplicación web mediante su cuenta de Google, Facebook, y Github, utilizando Firebase Authentication de manera segura y sencilla.

---

#### 🚀 Configuración en Firebase Console

1. Ir a [https://console.firebase.google.com](https://console.firebase.google.com)
2. Seleccionar el proyecto correspondiente.
3. Ir a **Authentication** → **Método de inicio de sesión**
4. Habilitar el proveedor **Google**, **Facebook**, **Github**
5. Configurar el **correo de soporte** (requerido).
6. Guardar los cambios.

---

#### 🧩 Instalación del SDK

Instalé Firebase en el proyecto con:

```bash
npm install firebase
```

## Configuracion de Firebase en la APP

#### Dentro del archivo environments.ts
```js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_AUTH_DOMAIN',
  projectId: 'TU_PROJECT_ID',
  storageBucket: 'TU_STORAGE_BUCKET',
  messagingSenderId: 'TU_SENDER_ID',
  appId: 'TU_APP_ID'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```
## Inicio de Sesion Con Google

#### En el auth.service.ts o auth.ts
```js
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase-config';

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('Usuario logueado:', user.displayName, user.email);
    return user;
  } catch (error) {
    console.error('Error en el login con Google:', error);
    throw error;
  }
};
```
#### En la interfaz 
```html
<button onclick="loginWithGoogle()">Iniciar sesión con Google</button>
```
#### 🖼️ Ejemplo visual

A continuación se muestra un ejemplo del botón de inicio de sesión con Google implementado:

![Ejemplo de login con Google](./Imagenes_Evidencias/Login_Example.png)

#### 🖼️ Ejemplo visual

Asi deberia verse al hacer click

![Ejemplo de login con Google](./Imagenes_Evidencias/Google_Example.png)

