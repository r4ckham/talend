var dashboardEmplacement = {

    init : function(container)
    {
        this.div = $("#" + container);
        this.render();
    },

    render : function()
    {
        let that = this;
        let template = "";
        template += ' <div id="dashboard-card-main-lot" class="panel panel-primary" style="margin-bottom: 20px">\n' +
            '\n' +
            '                <div class="panel-heading text-center">Mettre une place à disposition </div>\n' +
            '\n' +
            '                <div class="panel-body">\n' +
            '\n                 <div class="row">' +
            '                    <div class="form-group col-xl-12">\n' +
            '                        <div class="input-group">\n' +
            '                            <div class="input-group-addon">\n' +
            '                                <span class="input-group-text"><i class="fas fa-location-arrow"></i></span>\n' +
            '                            </div>\n' +
            '                            <select id="select-lot" type="text" class="form-control select-control">' +
            '                               <option> Choisir une place ...</option>'+
            '                            </select>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="form-group col-xl-6">\n' +
            '                        <div class="input-group">\n' +
            '                            <div class="input-group-addon">\n' +
            '                                <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>\n' +
            '                            </div>\n' +
            '                            <input id="input-main-lot-start-date" type="text" class="form-control" placeholder="Date de début">\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="form-group col-xl-6">\n' +
            '                        <div class="input-group">\n' +
            '                            <div class="input-group-addon">\n' +
            '                                <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>\n' +
            '                            </div>\n' +
            '                            <input id="input-main-lot-end-date" type="text" class="form-control" placeholder="Date de fin">\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '\n             </div>' +
            '                <div class="panel-footer">\n' +
            '                    <button id="btn-save-dispo" class="btn btn-success btn-block"> Enregistrer </button>\n' +
            '                </div>\n' +
            '            </div>';

        this.div.html(template);

        this.inputStartDate = this.div.find("#input-main-lot-start-date");
        this.inputEndDate = this.div.find("#input-main-lot-end-date");
        this.selectLot = this.div.find("#select-lot");

        this.inputStartDate.datetimepicker();
        this.inputEndDate.datetimepicker();

        this.btnSaveDispo = this.div.find("#btn-save-dispo");
        this.btnSaveDispo.click(function () {
            that.saveDispo();
        })
    },

     completeSelect : function (template) {
        if (template == "")
        {
            this.lockBtnSave(true);
            return false;
        }
        this.lockBtnSave(false);
        this.selectLot.html(template);
     },

    lockBtnSave : function(state){
        this.btnSaveDispo.prop("disabled" , state);
    },

    saveDispo : function () {
        let that = this;

        if(this.selectLot.val() == "" || this.inputStartDate.val() == "" ||this.inputEndDate.val() == ""){
            return;
        }

        let form = {
            action      : "save-dispo-place",
            idPlace     : this.selectLot.val(),
            startTime   : this.inputStartDate.val(),
            endTime     : this.inputEndDate.val(),
        };

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                alert(data.error);
            }
            console.log(data);
            that.notifyAddDispo();
        },"json");
    },

    notifyAddDispo : function () {
        $(this).trigger("dispo-has-changed");
    }


};