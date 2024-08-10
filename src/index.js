import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// modulos importados desde el proyecto 
import { sequelize  } from './DB/conexion.js';

import { usuarioRouter} from './router/UsuarioRouter.js';
import { tareaRouter} from './router/TareaRouter.js';
import { categoriaRouter} from './router/CategoriaRouter.js';
// import { categoriaRouter} from './router/CategoriaRouter.js';
import { PORT } from './config/config.js';

const app = express()
const port =    PORT;

app.use(cors());
app.use(bodyParser.json()) // para que se puedan recibir datos en formato JSON
app.use(bodyParser.urlencoded({ extended: false })) // para que se puedan enviar
app.use('/usuario', usuarioRouter);
app.use('/tarea', tareaRouter);
app.use('/categoria', categoriaRouter);
// app.use('/api', categoriaRouter)

const conexion= async () =>{
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: false });
      console.log('Connection has been established successfully.');
      app.listen(port, () => {
        console.log(`Servidor corriendo en el puerto ${port}`)
      })
  } catch (error) {
      console.error(`Error ${error}`);
  }
}

conexion()