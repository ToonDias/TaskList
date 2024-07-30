const express = require("express");
const Task = require("./Task");
const { where } = require("sequelize");

const router = express.Router();

router.get("/admin/tasks", (req, res) => {
    Task.findAll().then( tasks => {
        if(tasks != undefined){
            res.render("admin/tasks/index", {tasks: tasks});
        }
    }).catch( error => {
        res.redirect("/");
    });
});

router.get("/admin/tasks/new", (req, res) => {
    res.render("admin/tasks/create");
});

router.post("/admin/tasks/save", (req, res) => {
    var nome = req.body.nome;
    var status = req.body.status;
    var responsavel = req.body.responsavel;
    
    Task.create({
        nome: nome,
        status: status,
        responsavel: responsavel
    }).then( ()=> {
        res.redirect("/")
    });
});

router.get("/admin/tasks/edit/:id", (req, res) => {
    var id = req.params.id;
    Task.findByPk(id).then( task =>{
        if(task != undefined){
            res.render("admin/tasks/update", {task: task});
        }else{
            res.redirect("/admin/tasks");
        }
    }).catch( error =>{ 
        res.redirect("/admin/tasks");
    });
});

router.post("/admin/tasks/saveupdate", (req, res) =>{
    var id = req.body.id;
    var nome = req.body.nome;
    var status = req.body.status;
    var responsavel = req.body.responsavel;
    res.json({id, nome, status,responsavel}); 
});

router.post("/admin/tasks/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        Task.destroy({where: {id: id}}).then( () => {
        res.redirect("/")
        });
    }else{
        res.redirect("/");
    }
});

module.exports = router;