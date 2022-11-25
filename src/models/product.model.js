const { v4: uuidv4 } = require('uuid');
// uuidv4();

module.exports = function (nom, prix) {
    this.id = uuidv4();
    this.nom = nom;
    this.prix = prix;
    this.setId = function (id){
        this.id = id;
        return this;
    };
    this.getId = function (){
        return this.id;
    };
    this.setNom = function (nom){
        this.nom = nom;
        return this;
    };
    this.getNom = function (){
        return this.nom;
    };
    this.setPrix = function (prix){
        this.prix = prix;
        return this;
    };
    this.getPrix = function (){
        return this.prix;
    };
}