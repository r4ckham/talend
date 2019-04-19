var infoPanel = {

    init : function () {
        this.div = $("#info-container");
        this.template();
    },

    template : function() {
        let that = this;
        let template = '<div class="card bg-dark" style="height: auto">\n' +
            '                <div class="card-header"> <h1> Complément d\'information <i class="fas fa-info-circle float-right"></i> </h1></div>\n' +
            '                <div class="card-body">\n' +
            '\n' +
            '                    <div class="form-group">\n' +
            '                        <label for="input-info-phone"> Résidence </label>\n' +
            '                        <div class="input-group">\n' +
            '                            <div class="input-group-prepend">\n' +
            '                                <span class="input-group-text"><i class="fas fa-city"></i></span>\n' +
            '                            </div>\n' +
            '                            <select id="select-info-residence" class="custom-select">\n' +
            '                            </select>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="form-group">\n' +
            '                        <label for="input-info-phone"> Emplacement </label>\n' +
            '                        <div class="input-group">\n' +
            '                            <div class="input-group-prepend">\n' +
            '                                <span class="input-group-text"><i class="fas fa-parking"></i></span>\n' +
            '                            </div>\n' +
            '                            <select id="select-free-lot" class="custom-select disabled">\n' +
            '                            </select>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="form-group">\n' +
            '                        <label for="input-info-nom"> Nom </label>\n' +
            '                        <div class="input-group">\n' +
            '                            <div class="input-group-prepend">\n' +
            '                                <span class="input-group-text"><i class="fas fa-user-circle"></i></span>\n' +
            '                            </div>\n' +
            '                            <input id="input-info-nom" type="text" class="form-control" placeholder="Votre nom...">\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="form-group">\n' +
            '                        <label for="input-info-prenom"> Prénom </label>\n' +
            '                        <div class="input-group">\n' +
            '                            <div class="input-group-prepend">\n' +
            '                                <span class="input-group-text"><i class="fas fa-user-circle"></i></span>\n' +
            '                            </div>\n' +
            '                            <input id="input-info-prenom" type="text" class="form-control" placeholder="Votre prénom">\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="form-group">\n' +
            '                        <label for="input-info-phone"> N° de télèphone </label>\n' +
            '                        <div class="input-group">\n' +
            '                            <div class="input-group-prepend">\n' +
            '                                <span class="input-group-text"><i class="fas fa-mobile-alt"></i></span>\n' +
            '                            </div>\n' +
            '                            <input id="input-info-phone" type="text" class="form-control" placeholder="Numéro de télèphone">\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <button id="btn-info-send" class="btn btn-block btn-danger" style="margin-top: 40px" disabled> Faire une demande d\'adhésion </button>\n' +
            '\n' +
            '                </div>\n' +
            '            </div>';

        this.div.html(template);
        this.selectResidence = this.div.find("#select-info-residence");
        this.inputNom = this.div.find("#input-info-nom");
        this.inputPrenom = this.div.find("#input-info-prenom");
        this.inputPhone = this.div.find("#input-info-phone");
        this.btnInfoSend = this.div.find("#btn-info-send");
        this.selectFreeLot = this.div.find("#select-free-lot");

        this.selectResidence.addClass("info").data("field" , "0");
        this.inputNom.addClass("info").data("field" , "1");
        this.inputPrenom.addClass("info").data("field" , "2");
        this.inputPhone.addClass("info").data("field" , "3");
        this.selectFreeLot.addClass("info").data("field" , "4");

        // On change save input after class affectation
        this.div.find(".info").on("change" , function(){
            console.log($(this).val());
            that.changeInputBorder($(this) , $(this).val());
            that.saveUserInfo($(this));
        });

        this.selectResidence.on("change" , function(){
            let idRes = $(this).val();
            if (idRes == 0 || idRes == ""){
                return;
            }
            that.loadSelectFreeLot(idRes);
        });

        this.btnInfoSend.click(function(){
            that.saveDemande();
        });

        this.notifyTemplateReady();
    },

    templateSelectResidence : function(templateSelect , user , idRes ){
      let opt = '<option value="0"> Choisir une résidence </option>';
      this.selectResidence.html(opt + templateSelect);
      this.selectResidence.val(idRes);
      this.loadSelectFreeLotFromId(idRes , user.id_emp_prov);

      this.changeBtnSendDemande(user);
      this.changeInputBorder(this.inputNom, user.nom);
      this.changeInputBorder(this.inputPrenom,user.prenom);
      this.changeInputBorder(this.inputPhone,user.tel);
    },

    templateFreeLot : function(emplacements , idEmp){
        let template = "";
        $.each(emplacements , function () {
            if (this.description == ""){
                this.description = "<small> Aucune information !</small>";
            }
            template += '<option value="'+ this.id_emplacement +'">'+ this.id_emplacement +' - '+ this.description +'</option>';
        });
        this.selectFreeLot.html(template);
        this.selectFreeLot.val(idEmp);
    },

    changeBtnSendDemande : function(user){

        if (user.is_complete != "1")
        {
            this.btnInfoSend.prop("disabled" , true);
            this.btnInfoSend.html("Merci de remplir l'ensemble des informations !");
        }

        if (user.is_complete == "1" && user.rights == "0")
        {
            this.btnInfoSend.prop("disabled" , false);
            this.btnInfoSend.html("Envoyer votre demande d'adhésion !");
        }

        if (user.is_complete == "1" && user.rights == "1")
        {
            this.btnInfoSend.prop("disabled" , true);
            this.btnInfoSend.html("Votre demande est en cours d'approbation!");
            this.lockInput(true);
        }

    },

    lockInput : function(state)
    {
      this.div.find(".info").prop("disabled" , state);
    },

    changeInputBorder(input , val){
      if(val == null) {
          input.css("border-color" , "red");
          input.css("box-shadow" , "inset 0 1px 2px red, 0 0 5px red");
      }else{
          input.css("border-color" , "#ced4da");
          input.css("box-shadow" , "inset 0 1px 2px rgba(0, 0, 0, 0.075), 0 0 5px rgba(128, 189, 255, 0.5)");
      }
      input.val(val);
    },

    notifyTemplateReady : function () {
        $(this).trigger("panel-template-ready");
    },

    saveUserInfo : function(input)
    {
        let that = this;
        let form = {
            action : "save-user-info",
            field : input.data("field"),
            value : input.val(),
        };
        $.post(ajaxUrl , form , function(data){
            if (data.status != 200){
                console.log(data.error);
            }

            console.log(data.isComplete);
            that.changeBtnSendDemande(data.user);

        } , "json");
    },

    saveDemande : function()
    {
        let that = this;
        let form = {
            action : "save-demande",
        };

        $.post(ajaxUrl , form , function(data){
            if (data.status != 200){
                console.log(data.error);
            }

            that.changeBtnSendDemande(data.user);

        } , "json");
    },

    loadSelectFreeLot : function () {
        let that = this;
        let idRes = this.selectResidence.val();

        if(idRes == "" || idRes == 0){
            alert("Aucune résidence sélectionée !");
            return false;
        }

        let form = {
            action : "get-free-lot",
            idRes : idRes,
        };
        $.post(ajaxUrl , form , function(data){
            if (data.status != 200){
                alert(data.error);
                return false;
            }

            that.templateFreeLot(data.lots);

        } , "json");
    },

    loadSelectFreeLotFromId : function (idRes , idEmp) {
        let that = this;

        if(idRes == "" || idRes == 0){
            return false;
        }

        let form = {
            action : "get-free-lot",
            idRes : idRes,
        };
        $.post(ajaxUrl , form , function(data){
            if (data.status != 200){
                alert(data.error);
                return false;
            }

            that.templateFreeLot(data.lots , idEmp);

        } , "json");
    },

};