// Le modèle que l'on pourrait externaliser via Browserify
var qcm = function(title) {
  this.title  = title;
  this.qstAry = [];
  this.qstAdd    = function(i)   { this.qstAry.push(i); }
  this.qstRemove = function(i)   { this.qstAry.splice(i, 1); }
}

var qcm_question = function(texte) {
  this.texte  = texte;
  this.rspAry = [];
  this.rspRemove = function(i) { this.rspAry.splice(i, 1); }
  this.rspAdd    = function(i) { this.rspAry.push(i); }
}

var qcm_reponse = function(texte, isOk, nbPts) {
  this.texte = texte;
  this.isOk  = isOk;
  this.nbPts = nbPts;
}

// La vue
var v = new Vue({
  el: "#app",
  data: {
    qcmId: "", // Rang du questionnaire choisi
    qstId: "", // Rang de la question du QCM choisi
    rspId: "", // Rang de la réponse de la question du QCM choisi

    qcmAry: [],
  },
  compiled: function() {
    this.qcmAdd(); // On ajoute un questionnaire par défaut.
  },
  computed: {
    qcmSelected: function() {
      return this.isSelected(this.qcmId); // Fct définie à la fin de cet objet
    },
    qstSelected: function() {
      return this.isSelected(this.qstId);
    },
    rspSelected: function() {
      return this.isSelected(this.rspId);
    }
  },
  methods: {

    // Questionnaire ------------------------------------------------------------------------------
    qcmAdd: function() {
      this.qcmAry.push(new qcm("Nouveau QCM"))
    },
    qcmSave: function() {
      var qcmSerial = JSON.stringify(this.qcmAry)
      localStorage.set("qcm-"+qcmId, qcmSerial);
    },

    // Questions ----------------------------------------------------------------------------------
    questionAdd: function() {
      var q = new qcm_question("Texte de la question");
      this.qcmAry[this.qcmId].qstAdd(q);
      // Chargement de la dernire question par défaut dans l'éditeur de question.
      this.qstId = this.qcmAry[this.qcmId].qstAry.length-1; 
    },
    questionAlt: function(i) {
      this.qstId = i*1; // Cast rapide en "number" 
    },
    questionDel: function(i) {
      this.qcmAry[this.qcmId].qstRemove(i);
      if (this.qstId == i) this.qstId = "";
    },

    // Responses ----------------------------------------------------------------------------------
    responseAdd: function() {
      var r = new qcm_reponse("Texte de la reponse", true, 0);
      this.qcmAry[this.qcmId].qstAry[this.qstId].rspAdd(r);
      // Chargement de la dernire réponse par défaut dans l'éditeur de réponse.
      this.rspId = this.qcmAry[this.qcmId].qstAry[this.qstId].rspAry.length-1; 
    },
    responseAlt: function(i) {
      this.rspId = i*1;
    },
    responseDel: function(i) {
      this.qcmAry[this.qcmId].qstAry[this.qstId].rspRemove(i);
      if (this.rspId == i) this.rspId = "";
    },

    // Fonction outils ----------------------------------------------------------------------------
    isSelected: function(val) {
      return (typeof val == "number" && val >=0);
    }
  }
});