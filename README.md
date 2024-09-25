# PBF_ConsultasMedicas
Hola
# Consultas Médicas Online

## Descripción

Plataforma para conectar a pacientes y doctores. Los pacientes pueden seleccionar la especialidad para su consulta y dejar un mensaje con los detalles de sus síntomas. La plataforma ofrece diversas funcionalidades tanto para usuarios no registrados como para usuarios registrados (pacientes y médicos).

## Funcionalidades

### Usuario No Registrado

-   **Visualizar la landing page**: Página de inicio con información general sobre la plataforma.
-   **Registro**: Proceso de registro que incluye el envío de un e-mail de validación.
    -   Campos requeridos: e-mail, username, contraseña, tipo de usuario (paciente o médico).
-   **Login**: Acceso a la plataforma con opción de recuperación de contraseña.

### Usuarios Paciente

-   **Visualizar la landing page**: Página de inicio con el listado de sus consultas.
-   **Búsqueda / Filtro de consultas**: Por palabra, especialidad, gravedad.
-   **Ordenación de consultas**: Por fecha, especialidad, gravedad.
-   **Acceder a la ficha de la consulta**: Ver todos los detalles de la consulta, incluidas las respuestas.
-   **Gestión del perfil**: Edición de datos personales (e-mail, username, nombre y apellido/s, contraseña, biografía, avatar).
-   **Crear consulta**: A un profesional concreto o a un equipo de especialistas (título, descripción, foto/archivo, especialidad, médico, gravedad).
-   **Eliminar una consulta**: Solo si no tiene respuestas.
-   **Contestar a una propia consulta**: Añadir más detalles o información.
-   **Eliminar una propia respuesta**: Si es necesario.
-   **Rating de la respuesta del doctor**: Calificación de 1 a 5.
-   **Página con listado de médicos**: Mostrar la media del rating de cada uno.
-   **Acceder al detalle de un médico**: Ver información detallada del médico.

### Usuarios Médico

-   **Visualizar la landing page**: Página de inicio con el listado de consultas.
-   **Búsqueda, filtro y ordenación de consultas**: Igual que un usuario paciente.
-   **Acceder a la ficha de la consulta**: Ver todos los detalles de la consulta, incluidas las respuestas.
-   **Gestión del perfil**: Edición de datos personales (e-mail, username, nombre y apellido/s, contraseña, biografía, avatar, especialidad, años de experiencia, media rating no modificable).
-   **Histórico de consultas**: Ver consultas donde respondió o que le fueron asignadas.
-   **Contestar a una consulta**: De su especialidad o asignada.
-   **Eliminar una propia respuesta**: Solo si no ha sido valorada.
-   **Rating de la respuesta del profesional**: Calificación de 1 a 5, no a sí mismo.
-   **Página con listado de médicos**: Mostrar la media del rating de cada uno.
-   **Acceder al detalle de un médico**: Ver información detallada del médico.

## Consideraciones Adicionales

-   **Seguridad y Privacidad**: Implementar medidas de seguridad para proteger la información personal y médica de los usuarios.
-   **Notificaciones**: Enviar notificaciones por e-mail para eventos importantes como respuestas a consultas, calificaciones, etc.
-   **Interfaz de Usuario**: Diseñar una interfaz intuitiva y fácil de usar tanto para pacientes como para médicos.
-   **Soporte Técnico**: Proveer soporte técnico para resolver problemas y dudas de los usuarios.

Esta plataforma busca facilitar la comunicación entre pacientes y médicos, permitiendo un acceso rápido y eficiente a consultas médicas online.
