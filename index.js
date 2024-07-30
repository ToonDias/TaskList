const express = require("express");
const bodyParser = require("body-parser");
const Connection = require("./database/database");
const tasksController = require("./tasks/taskscontroller");
const Task = require("./tasks/Task");

const app = express();

//Carregando view engine
app.set('view engine', 'ejs');

//Carregando body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Configurando pasta de arquivos estativos
app.use(express.static('public'));

//Puxando as rotas do controler de taks
app.use("/", tasksController);

//Realizando conexão com o banco
Connection.authenticate()
    .then(() =>{
        console.log("Conexão feita com sucesso!");
    })
    .catch( error => {
        console.log(`Conexão falou! Erro: ${error}`);
    });

app.get("/", (req, res) => {
    res.render("tasks/index");
});

app.listen(8080, () => {
    console.log("Servidor rodando na URL: http://localhost:8080");
});

