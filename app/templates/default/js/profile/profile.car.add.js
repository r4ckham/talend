var profileAddCar = {

    init : function(container)
    {
        this.div = $("#" + container);
        this.render();
    },

    render : function()
    {
        let that = this;
        let template = "";
        template += ' <div id="profile-card-add-car" class="panel panel-default">\n' +
            '\n' +
            '                <div class="panel-body">\n' +
            '\n' +
            '                    <div class="form-group">\n' +
            '                        <div class="input-group">\n' +
            '                            <div class="input-group-addon">\n' +
            '                                <span class="input-group-text"><i class="fas fa-list"></i></span>\n' +
            '                            </div>\n' +
            '                            <select id="select-type" type="text" class="form-control ">' +
            '                               <option> Choisir un type ...</option>'+
            '                            </select>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="form-group">\n' +
            '                        <div class="input-group">\n' +
            '                            <div class="input-group-addon">\n' +
            '                                <span class="input-group-text"><i class="fas fa-key"></i></span>\n' +
            '                            </div>\n' +
            '                            <input id="input-immatriculation" type="text" class="form-control" placeholder="Immatriculation">\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="form-group">\n' +
            '                        <div class="input-group">\n' +
            '                            <div class="input-group-addon">\n' +
            '                                <span class="input-group-text"><i class="fas fa-palette"></i></span>\n' +
            '                            </div>\n' +
            '                            <select id="select-color" class="form-control"></select>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
                '                <div class="">\n' +
                '                    <button id="btn-save-car" class="btn btn-default btn-block"> Enregistrer </button>\n' +
                '                </div>\n' +
            '                </div>\n' +
            '\n' +

            '            </div>';

        this.div.html(template);

        this.inputImmat = this.div.find("#input-immatriculation");
        this.selectColor = this.div.find("#select-color");
        this.selectType = this.div.find("#select-type");

        this.construcSelectColor();

        this.btnSaveCar = this.div.find("#btn-save-car");
        this.btnSaveCar.click(function () {
            that.saveCar();
        });

        this.inputImmat.keypress(function(e){
            let val = $(this).val();

            if(val.length == 2 || val.length == 6){
                $(this).val(val.toUpperCase() +"-");
            }
            if(val.length >= 2 && val.length < 6 && $.isNumeric(e.key) == false){
                return false;
            }
            if(val.length <= 2 && val.length >= 6 && e.key === "A"){
                return false;
            }
            if (val.length >= 9){
                $(this).val(val.toUpperCase());
                return false;
            }
        });

        this.completeSelect();
    },

    construcSelectColor : function(){
        let template = "";
        template += '<option value="Blanc">Blanc</option>';
        template += '<option value="Noir">Noir</option>';
        template += '<option value="Rouge">Rouge</option>';
        template += '<option value="Bleu">Bleu</option>';
        template += '<option value="Rose">Rose</option>';
        template += '<option value="Orange">Jaune</option>';
        template += '<option value="Gris">Gris</option>';
        template += '<option value="Jaune">Jaune</option>';
        template += '<option value="Violet">Violet</option>';

        this.selectColor.html(template);

    },

    // TODO complete in db
    completeSelect : function () {

        let template = '<option = "Voiture"> Berline </option>';
        template += '<option = "Familiale"> Familiale </option>';
        template += '<option = "Break"> Break </option>';
        template += '<option = "Camion"> Camion </option>';
        template += '<option = "Camionette"> Camionette </option>';
        template += '<option = "Camping-Car"> Camping-Car </option>';
        template += '<option = "Moto"> Moto </option>';
        template += '<option = "Scooter"> Scooter </option>';

        this.lockBtnSave(false);
        this.selectType.html(template);
    },

    lockBtnSave : function(state){
        this.btnSaveCar.prop("disabled" , state);
    },

    saveCar : function () {
        let that = this;

        if(this.inputImmat.val() == "" || this.selectType.val() == "" ||this.selectColor.val() == ""){
            return;
        }

        if(this.inputImmat.val().length < 9){
            alert("Immatriculation non valide");
            return;
        }

        let form = {
            action : "save-car",
            immat  : this.inputImmat.val(),
            type   : this.selectType.val(),
            color  : this.selectColor.val(),
        };

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                alert(data.error);
            }
            console.log(data);
            that.notifyAddCar();
        },"json");
    },

    notifyAddCar : function () {
        $(this).trigger("cars-has-changed");
    }


};