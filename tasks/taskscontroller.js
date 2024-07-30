const express = require("express");
const router = express.Router();
const Task = require("./Task");
const { where } = require("sequelize");

router.get("/admin/tanks", (req, res) => {
    Task.findAll().then( tasks => {
        if(tasks != undefined){
            res.render("admin/tasks/index", {tasks: tasks});
        }
    }).catch( error => {
        res.redirect("/");
    });
});

router.get("/admin/tasks/new", (req, res) => {
    res.render("admin/tanks/create");
});

router.post("admin/tasks/save", (req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    var status = req.body.status;
    var responsavel = req.body.respnsalvel;
    res.json({id, nome, status,responsavel});    
});

router.get("/admin/tasks/edit/:id", (req, res) => {
    var id = req.params.id;
    Task.findByPk(id).then( task =>{
        if(task != undefined){
            res.render("admin/tanks/update", {task: task});
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
    var responsavel = req.body.respnsalvel;
    res.json({id, nome, status,responsavel}); 
});

router.post("/admin/tasks/delete", (req, res) => {
    var id = req.body.id;
    Task.destory({where: {id: id}});
});

module.exports = router;