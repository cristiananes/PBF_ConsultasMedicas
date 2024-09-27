// Importamos dependencias
import express from 'express';

// Creamos el router a traves de express
const router = express.Router();

// Importar los controladores de usuarios
import {
    // adminRegisterController,
    // userInfoController,
    userLoginController,
    // userPassResetController,
    userRegisterController,
    validateUserController,
} from '../controllers/users/index.js';
// Define tus rutas aquí

router.post('/user/register', userRegisterController);
router.put('/users/validate/:registrationCode', validateUserController);
router.post('/users/login', userLoginController);
export default router; // Esta es la exportación por defecto
