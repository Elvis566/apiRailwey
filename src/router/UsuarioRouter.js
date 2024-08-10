import {createUsuarios } from '../controller/UsuarioController.js';
import { Router } from 'express';

const router = Router();

router.post('/', createUsuarios);


export const usuarioRouter = router;