import {createUsuarios } from '../controller/UsuarioController.js';
import { Router } from 'express';

const router = Router();

router.post('/createUsuario', createUsuarios);


export const usuarioRouter = router;