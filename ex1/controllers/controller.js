var Cidade = require('../models/cidade')
var Ligacao = require('../models/ligacao')

module.exports.listarCidades = function(){
    return Cidade.find({},{_id:0,id:1,nome:1,distrito:1}).exec()
}

module.exports.listarNomesCidades = function(){
    return Cidade.find({},{_id:0,nome:1}).sort({nome:1}).exec()
}

module.exports.listarCidadesPorDistrito = function(distrito){
    return Cidade.find({distrito: distrito},{_id: 0, id: 1, nome: 1})
        .exec()
}

module.exports.consultarCidade = function(id){
    return Cidade.findOne({id: id}).exec()
}

module.exports.consultarCidadeNome = function(nome){
    return Cidade.findOne({nome: nome}).exec()
}

module.exports.listarLigacoes = function(){
    return Ligacao.find().exec()
}

module.exports.consultarLigacao = function(origem){
    return Ligacao.find({origem: origem}).exec()
}