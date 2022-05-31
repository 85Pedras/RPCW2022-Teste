var express = require('express');
var router = express.Router();
var Controller = require('../controllers/controller')
const url = require('url');

router.get('/', function(req, res, next) {
  var q = url.parse(req.url,true).query;
  if (q.origem != undefined){
    var origem = q.origem
    Controller.listarCidades()
      .then(dados => {
        var cidades = {}
        dados.forEach(c => {
          cidades[c.id] = c.nome
        })
        Controller.consultarLigacao(origem)
          .then(dados => {
            console.log(dados)
            var lig = []
            dados.forEach(o => {
              lig.push({ 'id': o.id, 'destino': o.destino, 'nome': cidades[o.destino] })
            })
            console.log(lig)
            res.status(200).jsonp(lig)
          })
          .catch(error => res.status(500).jsonp({erro:error}))
      })
      .catch(error => res.status(500).jsonp({erro:error}))
  }
  else if(q.dist != undefined){
   var dist = q.dist
   Controller.listarCidades()
    .then(dados => {
      var cidades = {}
      dados.forEach(c => {
        cidades[c.id] = c.nome
      })
      Controller.listarLigacoes()
        .then(dados => {
          var lig = []
          dados.forEach(o => {
            if (o.distância >= dist) {
              lig.push({ 'id': o.id, 'id_origem': o.origem, 'nome_origem': cidades[o.origem], 'id_destino': o.destino, 'nome_destino': cidades[o.destino], 'distância': o.distância })
            }
          })
          res.status(200).jsonp(lig)
        })
        .catch(error => res.status(500).jsonp({erro:error}))
    })
    .catch(error => res.status(500).jsonp({erro:error}))
  }
});

module.exports = router;
