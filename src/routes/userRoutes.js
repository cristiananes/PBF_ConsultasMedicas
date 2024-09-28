// Importamos dependencias
import express from 'express';
// Importar los controladores de usuarios
import {
    adminRegisterController,
    userInfoController,
    userLoginController,
    userPassRestController,
    userRegisterController,
    validateUserController,
} from '..controllers/users/index.js';

//importamos los utils
import {
    authUserController,
    notFoundController,
    uploadFileController,
} from '../middlewares/index.js'

// Creamos el router a traves de express
const router = express.Router();



// Define tus rutas aquí

//middleware que registra usuarios
router.post(
    `/api/user/register`,
    userRegisterController,
);

//middleware que crea admis
router.post(
    `/api/user/admin-register`,
    authUserController,
    adminRegisterController,
);

//middleware que valida usuarios
router.patch(
    `/api/user/validate/:registrationCode`,
    validateUserController,
);

//middleware de logini de user
router.post(
    `/api/user/login`,
    userLoginController,
);

//middleware que retorna info del user
router.get(
    `/api/user/:userId`,
    userInfoController,
);

//middleware que cambia la contraseña
router.patch(
    `/api/user/change-password`,
    authUserController,
    userPassRestController
);

//middleware que retorna el listado de medicos
router.get(
    `/api/users/doctors`,
    //añadir cuando se cree
);

//middleware que retorna las especialidades
router.get(
    `/api/user/specialties`
    //añadir cuando se cree clase

);

//middleware detalle medico
router.get(
    `/api/doctor/:doctorId`,
);
export default router; // Esta es la exportación por defecto
