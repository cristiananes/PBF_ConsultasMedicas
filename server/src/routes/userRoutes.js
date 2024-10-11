// Importamos dependencias
import express from 'express';
<<<<<<< HEAD
=======
//Importamos upload files
>>>>>>> 49a6957 (DeleteConsultDetailPage y Delete Consult Boton añadido, tiene fallos que tenemos que mirar)
import upload from '../middlewares/uploadFileController.js';
// Importar los controladores de usuarios
import {
    userAvatarController,
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

//middleware que crea admis
router.post(
    `/user/admin-register`,
    authAdminController,
    adminRegisterController
);
router.put(
<<<<<<< HEAD
    `/user/avatar`,
=======
    '/user/avatar',
>>>>>>> 49a6957 (DeleteConsultDetailPage y Delete Consult Boton añadido, tiene fallos que tenemos que mirar)
    authUserController,
    upload.single('avatar'),
    userAvatarController
);

//middleware que valida usuarios
router.patch(`/user/validate/:registrationCode`, validateUserController);

//middleware de login de user
router.post(`/user/login`, userLoginController);

//middleware que retorna info del user
router.get(`/user/:userId`, authUserController, userInfoController);

//middleware que cambia la contraseña
router.patch(
    `/user/change-password`,
    authUserController,
    userPassResetController
);

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
router.get(`/doctor/:userId`, authUserController, doctorDetailsController);

export default router; // Esta es la exportación por defecto
