import { createTarea, deleteTarea, marcarTarea, selecTarea, updateTarea, getTareas, getTareasC, getTareasF} from '../controller/TareaController.js';
import { Router } from 'express';

const router = Router();

router.post('/createTarea', createTarea);
router.get('/obtenerTareas', getTareas);
router.get('/completadas', getTareasC);
router.get('/obtenerTarea/:id', selecTarea);
router.put('/Actualizar/:id', updateTarea);
router.delete('/Eliminar/:id', deleteTarea);
router.put('/completar/:id', marcarTarea);
router.get('/filtro/:id', getTareasF);

export const tareaRouter = router;