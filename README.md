# Horario Académico – Backend

Backend de la aplicación de gestión de horarios académicos, desarrollado con **NestJS** y **MySQL**.
Incluye autenticación JWT, modularización por recursos y manejo completo de CRUD para usuarios, asignaturas y horarios.

---

## Características principales

* API REST modular con NestJS
* Autenticación y autorización mediante **JWT**
* ORM basado en **TypeORM**
* Validación automática con **Class Validator**
* Configuración mediante variables de entorno
* Scripts para desarrollo, modo watch y producción
* Estructura escalable y lista para despliegue

---

## Requisitos

* **Node.js 18+**
* **MySQL 8+**
* **npm 9+**

---

## Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <url-del-repo>
   cd horario-academico-backend
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear un archivo `.env` en la raíz del proyecto:

   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=tu_password
   DB_NAME=horario_academico
   JWT_SECRET=tu_clave_secreta
   PORT=3000
   ```

4. **Crear la base de datos**
   Importar el archivo `database.sql` en tu servidor MySQL:

   ```bash
   mysql -u root -p < database.sql
   ```

---

## Ejecución

```bash
# Modo desarrollo
npm run start

# Modo watch (recarga automática)
npm run start:dev

# Producción
npm run start:prod
```

El servidor se ejecutará en:
**[http://localhost:3000/api](http://localhost:3000/api)**

---

## Endpoints principales

## Autenticación JWT

### Endpoints de Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario (público)
- `POST /api/auth/login` - Iniciar sesión (público)
- `GET /api/auth/profile` - Obtener perfil del usuario autenticado
- `GET /api/auth/verify` - Verificar validez del token

---

### Usuarios

* `GET /api/usuarios` – Listar usuarios
* `GET /api/usuarios/:id` – Obtener usuario
* `POST /api/usuarios` – Crear usuario
* `PATCH /api/usuarios/:id` – Actualizar usuario
* `DELETE /api/usuarios/:id` – Eliminar usuario

---

### Asignaturas

* `GET /api/asignaturas` – Listar asignaturas
* `GET /api/asignaturas/:id` – Obtener asignatura
* `POST /api/asignaturas` – Crear asignatura
* `PATCH /api/asignaturas/:id` – Actualizar asignatura
* `DELETE /api/asignaturas/:id` – Eliminar asignatura

---

### Horarios (Schedules)

* `GET /api/schedules` – Listar horarios
* `GET /api/schedules/:id` – Obtener horario
* `GET /api/schedules/usuario/:idUsuario` – Horarios por usuario
* `POST /api/schedules` – Crear horario
* `PATCH /api/schedules/:id` – Actualizar horario
* `DELETE /api/schedules/:id` – Eliminar horario

---

### Roles
- `estudiante`: Acceso básico
- `profesor`: Acceso a consultas y gestión de horarios
- `admin`: Acceso completo al sistema

---

## Tablas de Permisos por Rol
### Permisos Generales del Sistema
| Recurso | Operación         | Admin | Profesor | Estudiante |
| ------- | ----------------- | ----- | -------- | ---------- |
| Auth    | Login             | ✅     | ✅        | ✅          |
| Auth    | Register          | ✅     | ✅        | ✅          |
| Auth    | Ver perfil propio | ✅     | ✅        | ✅          |

### Módulo de Usuarios
| Operación                 | Admin | Profesor       | Estudiante     |
| ------------------------- | ----- | -------------- | -------------- |
| Crear usuarios            | ✅     | ❌              | ❌              |
| Ver lista de usuarios     | ✅     | ✅              | ❌              |
| Ver un usuario específico | ✅     | ✅              | ⚠️ Solo propio |
| Actualizar usuarios       | ✅     | ⚠️ Solo propio | ⚠️ Solo propio |
| Eliminar usuarios         | ✅     | ❌              | ❌              |

### Módulo de Asignaturas
| Operación                 | Admin | Profesor | Estudiante |
| ------------------------- | ----- | -------- | ---------- |
| Crear asignaturas         | ✅     | ✅        | ❌          |
| Ver todas las asignaturas | ✅     | ✅        | ✅          |
| Ver una asignatura        | ✅     | ✅        | ✅          |
| Actualizar asignaturas    | ✅     | ✅        | ❌          |
| Eliminar asignaturas      | ✅     | ✅        | ❌          |

### Módulo de Horarios
| Operación                 | Admin | Profesor | Estudiante      |
| ------------------------- | ----- | -------- | --------------- |
| Crear horarios            | ✅     | ✅        | ❌               |
| Ver todos los horarios    | ✅     | ✅        | ⚠️ Solo propios |
| Ver horarios por usuario  | ✅     | ✅        | ⚠️ Solo propios |
| Ver un horario específico | ✅     | ✅        | ⚠️ Solo propios |
| Actualizar horarios       | ✅     | ✅        | ❌               |
| Eliminar horarios         | ✅     | ✅        | ❌               |

---

## Tecnologías utilizadas

* **NestJS**
* **TypeORM**
* **MySQL**
* **Class Validator / Class Transformer**
* **JWT (JSON Web Tokens)**
