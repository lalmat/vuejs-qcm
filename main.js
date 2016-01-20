var qcm = function(title) {
  this.title  = title;
  this.qstAry = [];
  this.qstRemove = function(i) {
    this.qstAry.splice(i, 1)
  }
}

var qcm_question = function(texte) {
  this.texte  = texte;
  this.rspAry = [];
  this.rspRemove = function(i) {
    this.qstAry.splice(i, 1)
  }
}

var qcm_reponse = function(texte, isOk, nbPts) {
  this.texte = texte;
  this.isOk  = isOk;
  this.nbPts = nbPts;
}

var v = new Vue({
  el: "#app",
  data: {
    qcmId: "", // Rang du questionnaire choisi
    qstId: "", // Rang de la question du QCM choisi
    rspId: "", // Rang de la réponse de la question du QCM choisi

    qcmAry: [],
  },
  compiled: function() {
    this.qcmAdd();
  },
  methods: {

    // Questionnaire ------------------------------------------------------------------------------
    qcmAdd: function() {
      this.qcmAry.push(new qcm("Nouveau QCM"))
    },
    
    // Questions ----------------------------------------------------------------------------------
    questionAdd: function() {
      this.qcmAry[this.qcmId].qstAry.push(new qcm_question("Texte de la question"));
    },
    questionAlt: function(i) {
      console.debug(i);
      this.qstId = i;
    },
    questionDel: function(i) {
      this.qcmAry[this.qcmId].qstRemove(i);
    },

    // Responses ----------------------------------------------------------------------------------
    responseAdd: function() {
      this.qcmAry[this.qcmId].qstAry[this.qstId].rspAry.push(new qcm_reponse("Texte de la reponse"));
    },
    responseAlt: function(i) {
      this.rspId = i;
    },
    responseDel: function(i) {
      this.qcmAry[this.qcmId].qstAry[this.qstId].rspRemove(i);
    }
  }
});