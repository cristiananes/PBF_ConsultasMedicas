// Importamos dependencias
import express from 'express';

//importamos las funciones controladoras finales
import {
    deleteConsultController,
    getConsultByIdController,
    listConsultsController,
    newConsultController,
    replyConsultController,
    voteConsultController,
    deleteReplyConsultId,
    getReplyByConsultIdController,
} from '../controllers/consults/index.js';

//importamos los utils
import { authUserController } from '../middlewares/index.js';
//importamos el middleware de multer
import upload from '../middlewares/uploadFileController.js';

// Creamos el router a traves de express
const router = express.Router();

// Define rutas aquí
//middleware que crea una consulta
router.post(
    `/consult/new-consult`,
    authUserController,
    upload.single('file'),
    newConsultController
);

//middleware que lista las consultas
router.get(`/consults`, authUserController, listConsultsController);

//middleware que devuelve UNA consulta
router.get(`/consult/:consultId`, authUserController, getConsultByIdController);

//middleware que retorna respuesta a consulta
router.post(
    `/consult/:consultId/reply`,
    authUserController,
    replyConsultController
);
//middleware que permite valorar una consulta
router.post(
    `/reply/:replyId/rating`,
    authUserController,
    voteConsultController
);
router.get(
    `/replies/:consultId`,
    authUserController,
    getReplyByConsultIdController
);

//middleware que permite eliminar una consulta
router.delete(
    `/consult/:consultId`,
    authUserController,
    deleteConsultController
);

//middleware que permite eliminar una respuesta a una consulta
router.delete(
    `/user/:userId/:consultId/:replyId`,
    authUserController,
    deleteReplyConsultId
);

export default router; // Esta es la exportación por defecto
