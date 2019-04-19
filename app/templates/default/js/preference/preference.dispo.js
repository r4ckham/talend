var dispoUser = {

    init : function(container)
    {
        this.div = $("#" + container);
        this.render();
    },

    render : function()
    {
        let that = this;
        let template = "";
        template += ' <div id="" class="panel panel-primary" style="margin-bottom: 20px">\n' +
            '\n' +
            '                <div class="panel-heading text-center w3-text-black"> Gérer vos disponibilités </div>\n' +
            '\n' +
            '                <div class="panel-body">\n' +
            '                   <div id="profil-dispo-user"></div>' +
            '                </div>\n' +
            '\n' +
            '                <div class="card-footer">\n' +
            '\n' +
            '                </div>\n' +
            '            </div>';

        this.div.html(template);
        this.divTableAllDispo = this.div.find("#profil-dispo-user");
        this.initDivTableAllDispo();

    },

    getUserDispo : function () {
        let that = this;

        let form = {
            action : "get-all-dispo-user",
        };

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                console.log(data.error);
            }
            console.log(data);
            that.deleteRows();
            that.construcRowsDispo(data.lots);
        },"json");
    },

    initDivTableAllDispo : function () {
        let that = this;
        let template = '  <table id="table-all-dispo" class="table table-hover table-bordered responsive text-center" style="color: black">\n' +
            '    <thead>\n' +
            '      <tr>\n' +
            '        <th>Identifiant</th>\n' +
            '        <th>Description</th>\n' +
            '        <th>Date Début</th>\n' +
            '        <th>Date Fin</th>\n' +
            '        <th>Annuler</th>\n' +
            '      </tr>\n' +
            '    </thead>\n' +
            '    <tbody>\n' +
            '    </tbody>\n' +
            '  </table>';

        this.divTableAllDispo.html(template);
        this.tableDispoUser = this.divTableAllDispo.find("#table-all-dispo");
        this.tableDispoUser.DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
            }
        });

        // Abonnement after rezise row
        this.tableDispoUser.on( 'responsive-display.dt', function ( e, datatable, row, showHide, update ) {
            $(this).find(".dispo-canceled").click(function () {
                that.cancelDemande($(this).data("id"));
            });
        });

        this.getUserDispo();
    },

    construcRowsDispo : function (dispos) {
        let that = this;

        $.each(dispos, function () {
            that.tableDispoUser.DataTable().row.add(
                [
                    this.id_emp,
                    this.description,
                    this.time_debut,
                    this.time_fin,
                    that.constructTemplateBtnCancel(this.id),
                ]
            ).draw(false);
        });

        this.tableDispoUser.find(".dispo-canceled").click(function () {
            that.cancelDemande($(this).data("id"));
        });

    },

    constructTemplateBtnCancel : function (id) {
        let template = '<button class="btn btn-danger dispo-canceled" data-id="'+ id +'"><i class="fas fa-trash-alt"></i></button>';
        return template;
    },

    deleteRows : function () {
        this.tableDispoUser.DataTable().rows().remove().draw();
    },

    cancelDemande : function (id) {
        let that = this;

        let form = {
            action  : "cancel_dispo",
            idDispo   : id,
        };

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                console.log(data.error);
            }
            that.getUserDispo();
            that.notifyDeleted();
        },"json");
    },

    notifyDeleted : function () {
        $(this).trigger("demande-has-been-removed");
    }

};