// importar express
// importar handlebars
// importar body-parser

const express = require("express");
const app = express();
const handlebars = require("express-handlebars").engine;
const bodyParser = require("body-parser");
const post = require("./models/post");
const { where } = require("sequelize");

// Configuração do Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.get("/", function (req, res) {
    res.render("primeira_pagina");
});

app.post("/cadastrar", function (req, res) {
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function () {
        console.log("Dados cadastrados com sucesso!");
        res.send("Dados cadastrados com sucesso");
    }).catch(function () {
        console.log("Erro ao gravar os dados na entidade");
    });
});

app.get("/consulta", function (req, res) {
    post.findAll().then(function (posts) {
        res.render("segunda_pagina.handlebars", { posts });
        console.log(posts);
    });
});

app.get("/editar/:id", function (req, res) {
    post.findAll({ where: { 'id': req.params.id } }).then(function (posts) {
        res.render("terceira_pagina", { posts });
        console.log(posts);
    });
});

app.post('/atualizar', function (req, res) {
    post.update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }, {
        where: {
            id: req.body.id
        }
    }).then(function () {
        console.log("Dados atualizados com sucesso!");
        res.render("primeira_pagina");
    });
});

// Rota para Excluir
app.get("/excluir/:id", function (req, res) {
    post.findOne({ where: { id: req.params.id } }).then(function (post) {
        if (post) {
            res.render("quarta_pagina", { post: post.dataValues });
        } else {
            res.status(404).send("Usuário não encontrado");
        }
    }).catch(function (err) {
        console.log("Erro ao buscar usuário", err);
        res.status(500).send("Erro ao buscar usuário");
    });
});

app.post("/excluir", function (req, res) {
    post.destroy({ where: { id: req.body.id } }).then(function () {
        console.log("Dados excluídos com sucesso");
        res.redirect("/consulta");
    }).catch(function (err) {
        console.log("Erro ao excluir o usuário", err);
        res.status(500).send("Erro ao excluir o usuário");
    });
});


app.listen(8081, function () {
    console.log("Servidor Ativo! http://localhost:8081");
});
