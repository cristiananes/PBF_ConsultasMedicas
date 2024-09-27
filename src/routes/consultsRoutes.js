// Importamos dependencias
import express from 'express';

//importamos las funciones controladoras finales
import {
    addPhotoController,
    deleteConsultController,
    deletePhotoController,
    getConsultByIdController,
    listConsultsController,
    newConsultController,
    replyUserController,
    voteConsultController,
    deleteReplyConsultId,
} from '../controllers/consults/index.js'

//importamos los utils
import {
    authUserController,
    notFoundController,
    uploadFileController,
} from '../middlewares/index.js'


// Creamos el router a traves de express
const router = express.Router();



// Define rutas aquí
//middleware que crea una consulta
router.post(
    `/api/user/new-consult`,
    authUserController,
    newConsultController,

);

//middleware que lista las consultas
router.get(
    `/api/user/consults`,
    authUserController,
    listConsultsController,
);

//middleware que devuelve UNA consulta
router.get(
    `/api/consult/:consultId`,
    authUserController,
    getConsultByIdController,
);

//middleware que retorna respuesta a consulta
router.post(
    `/api/consult/:consultId/reply`,
    authUserController,
    replyUserController,

);
//middleware que permite valorar una consulta
router.post(
    `/api/reply/:replyIdadd/rating`,
    authUserController,
    voteConsultController,
);

//middleware que permite eliminar una consulta
router.delete(
    `/api/consult/:consultId`,
    authUserController,
    deleteConsultController,
);

//middleware que permite eliminar una respuesta a una consulta
router.delete(
    `/api/user/:userId/:consultId/:replyId`,
    authUserController,
    deleteReplyConsultId,
);

export default router; // Esta es la exportación por defecto
