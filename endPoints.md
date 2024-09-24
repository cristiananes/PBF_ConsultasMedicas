## 1. Registro de Usuarios
- **POST**: `/api/user/register`
  - **Descripción**: Registra un nuevo usuario en el sistema.

---

## 2. Validación de Usuario
- **POST**: `/api/user/validate`
  - **Descripción**: Valida si un usuario está autenticado correctamente mediante un token JWT.

---

## 3. Login de Usuarios
- **POST**: `/api/user/login`
  - **Descripción**: Permite a los usuarios iniciar sesión.

---

## 4. Información del Usuario
- **GET**: `/api/user/:userId`
  - **Descripción**: Devuelve la información del usuario autenticado.

---

## 5. Cambio de contraseña
- **PUT**: `/api/user/changePassword`
  - **Descripción**: Cambia la contraseña.

---

## 6. Lista nombres médicos 
- **GET**: `/api/users/doctors`
  - **Descripción**: Devuelve la lista de nombres de los médicos.

---

## 7. Lista de especialidades 
- **GET**: `/api/user/specialties`
  - **Descripción**: Devuelve la lista de especialidades de los médicos.
  ---

## 8. Creación de una consulta 
- **POST**: `/api/user/new-consult`
  - **Descripción**: Creación de una consulta.

---

## 9. Lista de consultas
- **GET**: `/api/user/consults` **(?)**
  - **Descripción**: Devuelve la lista/datos de cada consulta.
  - **Datos a mostrar**:
- Título
- Médico / Especialidad
- Gravedad
- Fecha
- Usuario
- Número de respuestas
  ---


## 10. Visualización de una consulta 
- **GET**: `/api/user/:userId/consultId`
  - **Descripción**: Visualizamos una consuta.
  - **Datos adicionales**:
- Descripción
- Foto/Archivo
- Listado de respuestas (con avatar, email/nombre, valoración de la respuesta)
---


## 11. Respuesta a una consulta 
- **POST**: `/api/user/:userId/:consultId/reply`
  - **Descripción**: Respuesta a una consulta.
  -**Restricciones**:
- El paciente solo puede responder a sus propias consultas.
- El médico solo puede responder a consultas de su especialidad o asignadas.
---


## 12. Valoración respuesta del médico 
- **POST**: `/api/user/:userId/rating`
  - **Descripción**: Valora la respuesta del médico (1-5).
---



## 13. Eliminación de una consulta  
- **DELETE**: `/api/user/:userId/:consultId`
  - **Descripción**:Eliminación de una consulta.
---



## 14. Eliminación de una respuesta  
- **DELETE**: `/api/user/:userId/:consultId/:replyId`
  - **Descripción**:Eliminación de una respuesta.
---


## 15. Listado médicos con media rating de cada uno
- **GET**: `/api/users/doctors/rating`
  - **Descripción**:Listado con el rating de los médicos.
---


## 16. Detalle médico
- **GET**: `/api/user/:userId`
  - **Descripción**: Datos del médico. 
---





