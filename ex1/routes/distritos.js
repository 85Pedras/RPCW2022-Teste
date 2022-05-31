var express = require('express');
var router = express.Router();
var Controller = require('../controllers/controller')

router.get('/', function(req, res, next) {
    Controller.listarCidades()
    .then(dados => {
      var distritos = {}
      dados.forEach(c => {
        if (distritos[c.distrito] == undefined){
            distritos[c.distrito] = {
                cidades : [{
                    id_cidade: c.id,
                    nome_cidade: c.nome
                }]
            }
        }
        else{
            distritos[c.distrito].cidades.push({id_cidade: c.id,
                nome_cidade: c.nome})
        }
      })
      res.status(200).jsonp(distritos)
    })
    .catch(error => {
      res.status(500).jsonp({erro:error})
    })
  });

  module.exports = router;