import { CategoriaModel } from "../Model/Categoria.js"; 

export const getCategorias = async (req, res) =>{
    const categoria = await CategoriaModel.findAll({});
    res.status(200).json({'categoria' : categoria})
}