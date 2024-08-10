import { UsuarioModel } from "../Model/UsuarioModel.js"; 
import { TareaModel } from "../Model/TareaModel.js"; 

export const createUsuarios = async (req, res)=>{
    try {
     const {nombre, email, contraseña} = req.body
     if(!nombre || !email || !contraseña){
         res.status(401).json({'message' : 'No se permiten campos vacios'})
     }else{
        
             const usaurio = await UsuarioModel.create({
                nombre: nombre,
                email: email,
                contraseña: contraseña
             });

         res.status(201).json({'message':'create sucessfull', "usaurio": usaurio})
     }
    } catch (error) {
     res.status(500).json({message : error.message})
    }
}

export const getUsuarios = async (req, res) =>{
    const usuarios = await UsuarioModel.findAll({});
    res.status(200).json({'usuarios' : usuarios})
}

