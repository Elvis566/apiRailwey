import { Model } from "sequelize";
import { TareaModel } from "../Model/TareaModel.js"; 
import { UsuarioModel } from "../Model/UsuarioModel.js"; 
import { CategoriaModel } from "../Model/Categoria.js";

export const createTarea = async (req, res)=>{
    try {
     const {description, detalles, categoria_id, usuario_id } = req.body
     if(!description || !detalles || !categoria_id || !usuario_id){
         res.status(401).json({'message' : 'No se permiten campos vacios'})
     }else{
        
            const tarea = await TareaModel.create({
                description: description,
                detalles: detalles,
                categoria_id: categoria_id,
                usuario_id :usuario_id
             });

         res.status(201).json({'message':'create sucessfull', "tarea": tarea})
     }
    } catch (error) {
     res.status(500).json({message : error.message})
    }
}


export  const deleteTarea = async(req, res)=>{
    try {
        const id = req.params.id;
        const tareaSelec = await TareaModel.findByPk(id);
        if (tareaSelec) {
            tareaSelec.set({estado :true});
            tareaSelec.save();
           return res.status(200).json({message:'Eliminado Correctamente' })
        }else{
            return res.status(404).json({ message: "not type found"})
        }
    } catch (error) {
        res.status(500).json({message : error.message})
    }

}

export  const marcarTarea = async(req, res)=>{
    try {
        const id = req.params.id;
        const tareaSelec = await TareaModel.findByPk(id);
        if (tareaSelec) {
            tareaSelec.set({disponibilidad :true});
            tareaSelec.save();
           return res.status(200).json({message:'Tarea completada correctamente' })
        }else{
            return res.status(404).json({ message: "not type found"})
        }
    } catch (error) {
        res.status(500).json({message : error.message})
    }

}

 
export const selecTarea = async (req, res)=>{
    try {
        const id = req.params.id;
        const tareaSelec = await TareaModel.findByPk(id);
        if(tareaSelec){
            res.status(201).json({'message':'Datos entregados', "tareaSelec": tareaSelec})
        }else{
            return res.status(404).json({ message: "not type found"})
        }
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const updateTarea = async (req,res)=>{
    try {
        const id = req.params.id;
        const newDetalle = req.body.detalles;
        const tareaSelec = await TareaModel.findByPk(id);
        if(tareaSelec){
            tareaSelec.detalles = newDetalle ;
            tareaSelec.save();
            res.status(201).json({'message':'Tarea actualizada correctamente', "tareaSelec": tareaSelec})
        }else{
            return res.status(404).json({ message: "not type found"})
        }
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const getTareas = async (req, res) =>{
    const type = await TareaModel.findAll({
        attributes : {exclude: ['estado']},
        where: { estado : false}
    });
    res.status(200).json({'type' : type})
}

export const getTareasC = async (req, res) =>{
    const type = await TareaModel.findAll({
        attributes : {exclude: ['estado']},
        where: { 
            estado : false, 
            disponibilidad : true
         },
    });
    res.status(200).json({'type' : type})
}

export const getTareasF = async (req, res) =>{
    try {
     const id = req.params.id;
     const filtro = req.body.filtro;
     const disp = req.body.disponibilidad;
     if(!filtro && !disp){
         const tareas = await TareaModel.findAll({
             include : {
                 model :  UsuarioModel,
                 as : 'usuario',
                 where : {id : id},
                 attributes :['nombre']
             },
             attributes : { exclude: ['estado'] },
             where : {  estado : false &&  UsuarioModel.id == TareaModel.usuario_id }
         });
         res.status(200).json({'tareas' : tareas})
     }else{
         if(filtro && !disp){
            const tareas = await TareaModel.findAll({
                include : [
                    {
                        model :  UsuarioModel,
                        as : 'usuario',
                        where : {id : id},
                        attributes :['nombre']
                    },
                    {
                        model : CategoriaModel ,
                        as : "categorias",
                        order : 'categoria',
                        attributes : ['categoria'],
                    }
                ],
               
                attributes : { exclude: ['estado'] },
                where : {  estado : false &&  UsuarioModel.id == TareaModel.usuario_id && CategoriaModel.id == TareaModel.categoria_id && categorias.categoria == filtro}
            });
            res.status(200).json({'tareas' : tareas})
         }
     }
     
    } catch (error) {
     res.status(500).json({message : error.message})
    }
 }