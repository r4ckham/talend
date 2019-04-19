var dashboardModale = {

    init : function(container)
    {
        this.div = $("#" + container);
        this.render();
    },

    render : function()
    {
        let that = this;
        let template = "";
        template += '            <!-- Modal -->\n' +
            '            <div class="modal fade" id="dashboard-modale" role="dialog">\n' +
            '                <div class="modal-dialog modal-dialog-centered">\n' +
            '\n' +
            '                    <!-- Modal content-->\n' +
            '                    <div class="modal-content" style="color: black">\n' +
            '                        <div class="modal-header">\n' +
            '                            <h4 class="modal-title">Place : <span id="span-modale-place"></span></h4>\n' +
            '                            <button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
            '                        </div>\n' +
            '                        <div class="modal-body">\n' +
            '\n'+
            '                            <div class="alert alert-dark">\n' +
            '                                   <strong> Description : </strong> <span id="span-desc-place" class="text-center"></span> ' +
            '                            </div>'+
            '\n'+
            '                            <div class="alert alert-dark">\n' +
            '                                   <strong>  <u>Liste des disponibilités :</u> </strong> <br><small><span id="span-dispo-place" class="text-center"></span></small> ' +
            '                            </div>'+
            '\n'+
            '                            <div class="form-group">\n' +
            '                                <div class="input-group">\n' +
            '                                    <div class="input-group-prepend">\n' +
            '                                        <span class="input-group-text"><i class="fas fa-car-side"></i></span>\n' +
            '                                    </div>\n' +
            '                                    <select id="select-user-vehicule" type="text" class="custom-select"></select>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '\n'+
            '                            <div class="form-group">\n' +
            '                                <div class="input-group">\n' +
            '                                    <div class="input-group-prepend">\n' +
            '                                        <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>\n' +
            '                                    </div>\n' +
            '                                    <input id="input-modale-start-date" type="text" class="form-control" placeholder="Date de début">\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div class="form-group">\n' +
            '                                <div class="input-group">\n' +
            '                                    <div class="input-group-prepend">\n' +
            '                                        <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>\n' +
            '                                    </div>\n' +
            '                                    <input id="input-modale-end-date" type="text" class="form-control" placeholder="Date de fin">\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div class="form-group">\n' +
            '                                <div class="input-group">\n' +
            '                                    <div class="input-group-prepend">\n' +
            '                                        <span class="input-group-text"><i class="far fa-comments"></i></span>\n' +
            '                                    </div>\n' +
            '                                    <textarea id="input-modale-comment" type="text" class="form-control" placeholder="Facultatif..."></textarea>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <button id="dashboard-btn-send-demande" class="btn btn-success btn-block"> Effectuer une demande !</button>\n' +
            '\n' +
            '\n' +
            '                        </div>\n' +
            '                        <div class="modal-footer">\n' +
            '                            <button type="button" class="btn btn-danger" data-dismiss="modal">Fermer</button>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                </div>\n' +
            '            </div>';

        this.div.html(template);
        this.modale = this.div.find("#dashboard-modale");
        this.spanPlace = this.div.find("#span-modale-place");
        this.spanDesc = this.div.find("#span-desc-place");
        this.spanDispo = this.div.find("#span-dispo-place");

        this.selectUserCar = this.div.find("#select-user-vehicule");
        this.textareaMess = this.div.find("#input-modale-comment");

        this.inputStartDate = this.div.find("#input-modale-start-date");
        this.inputEndDate = this.div.find("#input-modale-end-date");
        this.btnSendDemande = this.div.find("#dashboard-btn-send-demande");

        this.inputStartDate.datetimepicker();
        this.inputEndDate.datetimepicker();
        this.setCurrentTimeToInputs();

        this.btnSendDemande.click(function () {
            that.saveDemande();
        })

        this.modale.modal({show: false});
    },

    show : function()
    {
        this.modale.modal({show: true});
        $("body").removeClass('modal-open');
    },

    mask : function()
    {
        this.modale.modal("hide");
    },

    constructSelectUserCar : function(data)
    {
        let template = "";

        if (data.length == 0){
            template += '<option value="0"> Pas de véhicule enregistré ! </option>';
            this.selectUserCar.prop("disabled" , true);
        } else {
            $.each(data , function(){
                template += '<option value="' + this.immatriculation + '">'+ this.immatriculation +'</option>'
            });
            this.selectUserCar.prop("disabled" , false);
        }
        this.selectUserCar.html(template);

    },

    constructListdispo : function(dispos)
    {
        let template = "";
        let i = 1;
        $.each(dispos , function(){
            this.time_debut = this.time_debut.replace(/ /g, " à ");
            this.time_fin = this.time_fin.replace(/ /g, " à ");
            template += 'Disponibilité n°'+ i + ' du : <b>' + this.time_debut + '</b> au : <b>' + this.time_fin + '</b> <br>';
            i++
        });
        this.spanDispo.html(template);
    },

    loadInfosLot : function ( idEmp )
    {
        let that = this;
        if(idEmp == ""){
            return false;
        }
        this.idEmp = idEmp;

        let form = {
            action : "get-lot-info",
            idEmp : idEmp,
        }

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                console.log(data.error);
                return false;
            }
            console.log(data);

            let place = data.place;
            let dispo = data.dispo;
            let userCar  = data.userCar;

            that.constructSelectUserCar(userCar);

            if(place.description == ""){
                place.description = "Aucune description renseignée !";
            }

            that.spanPlace.html(place.id_emplacement);
            that.spanDesc.html(place.description);

            that.constructListdispo(data.dispo);

            that.show();

        } , "json");
    },

    setCurrentTimeToInputs : function(){
        Date.prototype.addHours= function(h){
            this.setHours(this.getHours()+h);
            return this;
        }

        var dt = new Date();
        var dt2 = new Date().addHours(1);

        let month = ((dt.getMonth() + 1) < 10) ? "0"+(dt.getMonth() + 1) : dt.getMonth() + 1;
        let day = (dt.getDate() < 10) ? "0" + dt.getDate() : dt.getDate();
        let hour = (dt.getHours() < 10) ? "0" + dt.getHours() : dt.getHours();
        let min = (dt.getMinutes() < 10 ) ? "0" + dt.getMinutes() : dt.getMinutes();

        let month2 = ((dt2.getMonth() + 1) < 10) ? "0"+(dt2.getMonth() + 1) : dt2.getMonth() + 1;
        let day2 = (dt2.getDate() < 10) ? "0" + dt2.getDate() : dt2.getDate();
        let hour2 = (dt2.getHours() < 10) ? "0" + dt2.getHours() : dt2.getHours();
        let min2 = (dt2.getMinutes() < 10 ) ? "0" + dt2.getMinutes() : dt2.getMinutes();

        let dateTime1 = dt.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + min ;
        let dateTime2 = dt2.getFullYear() + "-" + month2 + "-" + day2 + " " + hour2 + ":" + min2;

        this.setTimeToInputs(dateTime1 , dateTime2);
    },

    setTimeToInputs : function(dateTime1 , dateTime2){
        this.inputStartDate.val(dateTime1);
        this.inputEndDate.val(dateTime2);
    },

    ifInputsFilled : function(){
        if(this.idEmp == ""){
            alert("Emplacement vide !")
            return false;
        }
        if(this.inputStartDate.val() == ""){
            alert("Date de départ absente !");
            return false;
        }
        if(this.inputEndDate.val() == ""){
            alert("Date de fin absente !");
            return false;
        }
        if(this.selectUserCar.val() == 0){
            alert("Aucune voiture renseignée !");
            return false;
        }
        return true
    },

    saveDemande : function ()
    {
        let that = this;

        if (!that.ifInputsFilled())
        {
            return false;
        }

        let form = {
            action : "save-demande",
            idEmp : this.idEmp,
            message : this.textareaMess.val(),
            startDate : this.inputStartDate.val(),
            endDate : this.inputEndDate.val(),
            idCar : this.selectUserCar.val(),
        }

        $.post(ajaxUrl , form , function (data) {
            if (data.status == 615){
                alert(data.error);
            }

            if (data.status != 200){
                console.log(data.error);
                return false;
            }

            alert("La demande à bien été envoyée !");

            that.textareaMess.val(null);
            that.inputStartDate.val(null);
            that.inputEndDate.val(null);
            that.selectUserCar.val(null);
            that.mask();

            console.log(data);

        } , "json");
    }


};