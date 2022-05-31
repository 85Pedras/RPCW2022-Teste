var express = require('express');
var router = express.Router();
var Controller = require('../controllers/controller')
const url = require('url');

router.get('/', function(req, res, next) {
  var q = url.parse(req.url,true).query;
  if (q.distrito != undefined){
    var distrito = q.distrito
    Controller.listarCidadesPorDistrito(distrito)
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch(error => {
      res.status(500).jsonp({erro:error})
    })
  }
  else {
    Controller.listarCidades()
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch(error => {
      res.status(500).jsonp({erro:error})
    })
  }
});

router.get('/nomes', function(req, res, next) {
  var id = req.params.id
  Controller.listarNomesCidades()
  .then(dados => {
    var lista = []
    dados.forEach(c => {
      lista.push(c.nome)
    })
    res.status(200).jsonp(lista)
  })
  .catch(error => {
    res.status(500).jsonp({erro:error})
  })
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id
  Controller.consultarCidade(id)
  .then(dados => {
    res.status(200).jsonp(dados)
  })
  .catch(error => {
    res.status(500).jsonp({erro:error})
  })
});

module.exports = router;
