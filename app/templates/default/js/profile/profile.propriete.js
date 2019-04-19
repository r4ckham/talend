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
        template += ' <div id="profile-card-add-car" class="card bg-dark text-white">\n' +
            '\n' +
            '                <div class="card-header text-center">Ajouter une voiture </div>\n' +
            '\n' +
            '                <div class="card-body">\n' +
            '\n' +
            '                    <div class="form-group">\n' +
            '                        <div class="input-group">\n' +
            '                            <div class="input-group-prepend">\n' +
            '                                <span class="input-group-text"><i class="fas fa-list"></i></span>\n' +
            '                            </div>\n' +
            '                            <select id="select-type" type="text" class="custom-select ">' +
            '                               <option> Choisir un type ...</option>'+
            '                            </select>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="form-group">\n' +
            '                        <div class="input-group">\n' +
            '                            <div class="input-group-prepend">\n' +
            '                                <span class="input-group-text"><i class="fas fa-key"></i></span>\n' +
            '                            </div>\n' +
            '                            <input id="input-immatriculation" type="text" class="form-control" placeholder="Immatriculation">\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="form-group">\n' +
            '                        <div class="input-group">\n' +
            '                            <div class="input-group-prepend">\n' +
            '                                <span class="input-group-text"><i class="fas fa-palette"></i></span>\n' +
            '                            </div>\n' +
            '                            <input id="input-color" type="text" class="form-control" placeholder="Couleur">\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '\n' +
            '                <div class="card-footer">\n' +
            '                    <button id="btn-save-car" class="btn btn-success btn-block"> Enregistrer </button>\n' +
            '                </div>\n' +
            '            </div>';

        this.div.html(template);

        this.inputImmat = this.div.find("#input-immatriculation");
        this.selectColor = this.div.find("#input-color");
        this.selectType = this.div.find("#select-type");

        this.btnSaveCar = this.div.find("#btn-save-car");
        this.btnSaveCar.click(function () {
            that.saveCar();
        });

        this.completeSelect();
    },

    // TODO complete in db
    completeSelect : function () {

        let template = '<option = "voiture"> Voiture </option>';
        template += '<option = "camion"> Camion </option>';
        template += '<option = "moto"> Moto </option>';

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