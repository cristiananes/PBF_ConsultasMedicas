## 1. Registro de Usuarios
- **POST**: `/api/user/register`
  - **Descripción**: Registra un nuevo usuario en el sistema.

---
## 1.1 Registro de Usuarios(admin)
- **POST**: `/api/user/admin-register`
  - **Descripción**: Registra un nuevo usuario (admin) en el sistema.
token de administrador 
---

## 2. Validación de Usuario
- **PATCH**: `/api/user/validate/:registrationCode`
  - **Descripción**: Valida si un usuario está autenticado correctamente.

---

## 3. Login de Usuarios
- **POST**: `/api/user/login`
  - **Descripción**: Permite a los usuarios iniciar sesión.

---

## 4. Información del Usuario
- **GET**: `/api/user/:userId`
  - **Descripción**: Devuelve la información del usuario autenticado.
    //token. en el header.

---

## 5. Cambio de contraseña
- **PATCH**: `/api/user/change-password`
  - **Descripción**: Cambia la contraseña.
  //token. en el header.

---

## 6. Lista nombres médicos y media
- **GET**: `/api/users/doctors`
  - **Descripción**: Devuelve la lista de nombres de los médicos.
  //filtrar por especialidad
  /api/users/doctors?orderBy=rating$order=DESC&speciality=1
  - **Descripción**:Listado con el rating de los médicos.
---

---

## 7. Lista de especialidades 
- **GET**: `/api/user/specialties`
  - **Descripción**: Devuelve la lista de especialidades de los médicos.
  ---

## 8. Creación de una consulta 
- **POST**: `/api/user/new-consult`
  - **Descripción**: Creación de una consulta.
    //token en el header.

---

## 9. Lista de consultas
- **GET**: `/api/user/consults`
  - **Descripción**: Devuelve la lista/datos de cada consulta.
  - **Datos a mostrar**:
- Título
- Médico / Especialidad
- Gravedad
- Fecha
- Usuario
- Número de respuestas
  //token. en el header.
  wirefame

//si la hace un paciente devuelve las consultas de este paciente. Si la hace un doctor devuelve todas las consultas asignadas (Ejemplo peticion: /api/user/consults?asignadas=true ) a este y las no asignadas de su especialidad. 

  ---


## 10. Visualización de una consulta 
- **GET**: `/api/consult/:consultId`
  - **Descripción**: Visualizamos una consuta.
  - **Datos adicionales**:
- Descripción
- Foto/Archivo
- Listado de respuestas (con avatar, email/nombre, valoración de la respuesta)
TOKEN
---


## 11. Respuesta a una consulta 
- **POST**: `/api/consult/:consultId/reply`
  - **Descripción**: Respuesta a una consulta.
  -**Restricciones**:
- El paciente solo puede responder a sus propias consultas.
- El médico solo puede responder a consultas de su especialidad o asignadas.
TOKEN
---


## 12. Valoración respuesta del médico 
- **POST**: `/api/reply/:replyIdadd/rating`
  - **Descripción**: Valora la respuesta del médico (1-5).
  TOKEN
---


## 13. Eliminación de una consulta  
- **DELETE**:  `/api/consult/:consultId"
  - **Descripción**:Eliminación de una consulta.
  TOKEN
---



## 14. Eliminación de una respuesta  
- **DELETE**: `/api/user/:userId/:consultId/:replyId`
  - **Descripción**:Eliminación de una respuesta.
  TOKEN
---





## 16. Detalle médico
- **GET**: `/api/doctor/:doctorId`
  - **Descripción**: Datos del médico. 
---





