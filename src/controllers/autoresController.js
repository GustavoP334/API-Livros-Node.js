import autores from "../models/Autor.js";
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
class AutorController {

    static listarAutores = (req, res) => {
        autores.find((err, autores) => {
            res.status(200).json(autores)
        })
    }

    static cadastrarAutor = (req, res) =>  {
        let autor = new autores(req.body);

        autor.save((err) => {
            if(err) {
                res.status(500).send({message: `${err.message} - falha ao cadastrar Autor.`})
            } else {
                res.status(201).send(autor.toJSON())
            }
        })
    }

    static atualizarAutor = (req, res) => {
        const id = req.params.id;

        autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: 'Autor atualizado com sucesso!'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

    static listarAutorPorId = (req, res) => {
        const id = req.params.id;

        autores.findById(id, (err, autores) => {
            if(err) {
                res.status(400).status({message: `${err.message} - Id do Autor não localizado.`})
            } else {
                res.status(200).send(autores);
            }
        })
    }

    static excluirAutor = (req, res) => {
        const id = req.params.id;

        autores.findByIdAndDelete(id, (err) => {
            if(!err) {
                res.status(200).send({message: 'Autor removido com sucesso'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }


    static login = (req, res, next) => {
        if(req.body.user === 'admin' && req.body.password === 'conectadmin'){
            //auth ok
            const id = 1; //esse id viria do banco de dados
            const token = jwt.sign({ id }, process.env.SECRET, {
              expiresIn: 300 // expires in 5min
            });
            return res.json({ auth: true, token: token });
          }
          
          res.status(500).json({message: 'Login inválido!'});
    }
}

export default AutorController