// Importamos dependencias
import express from 'express';
import upload from '../middlewares/uploadFileController.js';
// Importar los controladores de usuarios
import {
    adminRegisterController,
    userInfoController,
    userLoginController,
    userRegisterController,
    userAvatarController,
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

//middleware de creación de usuarios para admins (permite crear: pacientes, medicos y admins)
router.post(
    `/user/admin-register`,
    authUserController,
    authAdminController,
    adminRegisterController
);
router.put(
    `/user/avatar`,
    authUserController,
    upload.single('avatar'),
    userAvatarController
);

//middleware que valida usuarios
router.patch(`/user/validate/:registrationCode`, validateUserController);

//middleware de login de user
router.post(`/user/login`, userLoginController);

//middleware que retorna info del user
router.get(`/user`, authUserController, userInfoController);

//middleware que cambia la contraseña
router.patch(
    `/user/change-password`,
    authUserController,
    userPassResetController
);

//middleware que retorna el listado de medicos
router.get(
    `/users/doctors`,

    authUserController,
    listMedicsController
);

//middleware que retorna las especialidades
router.get(
    `/specialties`,

    authUserController,
    listSpecialitiesController
);

//middleware detalle medico
router.get(`/doctor/:userId`, authUserController, doctorDetailsController);

export default router;
