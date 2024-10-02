// Importamos dependencias
import express from 'express';
// Importar los controladores de usuarios
import {
    adminRegisterController,
    userInfoController,
    userLoginController,
    userRegisterController,
    validateUserController,
    listMedicsController,
    doctorDetailsController,
    listSpecialitiesController,
} from '../controllers/users/index.js';

//importamos los utils
import {
    authAdminController,
    authUserController,
} from '../middlewares/index.js';
import userPassResetController from '../controllers/users/userPassResetController.js';

// Creamos el router a traves de express
const router = express.Router();

// Define tus rutas aquí

//middleware que registra usuarios
router.post(`/user/register`, userRegisterController);

//middleware que crea admis
router.post(
    `/user/admin-register`,
    authAdminController,
    adminRegisterController
);

//middleware que valida usuarios
router.patch(`/user/validate/:registrationCode`, validateUserController);

//middleware de logini de user
router.post(`/user/login`, userLoginController);

//middleware que retorna info del user
router.get(`/user/:userId`, authUserController, userInfoController);

//middleware que cambia la contraseña
router.patch(`/user/change-password`, authUserController, userPassResetController);

//middleware que retorna el listado de medicos
router.get(
    `/users/doctors`,
    //añadir cuando se cree
    authUserController,
    listMedicsController
);

//middleware que retorna las especialidades
router.get(
    `/specialties`,
    //añadir cuando se cree clase
    authUserController,
    listSpecialitiesController
);

//middleware detalle medico
router.get(`/doctor/:doctorId`, authUserController, doctorDetailsController);
export default router; // Esta es la exportación por defecto
