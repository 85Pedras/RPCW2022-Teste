var express = require('express');
var router = express.Router();
var axios = require('axios')
var fs = require('fs')

const api_key = fs.readFileSync('./api_key.txt',{encoding:'utf-8', flag:'r'})

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Página Inicial' });
});

router.get('/classes', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=" + api_key)
    .then(dados => {
      var lista = dados.data
      res.render('nivel1', {dados: lista})
      })
      .catch(function(erro){
        res.render('error', { erro: erro });
      })
});

router.get('/classes/:id', function(req, res, next) {
  var id = req.params.id
  console.log(id)
  axios.get("http://clav-api.di.uminho.pt/v2/classes/c" + id + "?token=" + api_key)
    .then(dados => {
      var lista = dados.data
      res.render('classe', {dados: lista})
      })
      .catch(function(erro){
        res.render('error', { erro: erro });
      })
});

router.get('/termos', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/termosIndice?token=" + api_key)
    .then(dados => {
      var lista = dados.data
      res.render('termos', {dados: lista})
      })
      .catch(function(erro){
        res.render('error', { erro: erro });
      })
});

module.exports = router;
