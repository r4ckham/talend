var demandeUser = {

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
            '                <div class="panel-heading text-center w3-text-black"> Consulter vos demandes </div>\n' +
            '\n' +
            '                <div class="panel-body">\n' +
            '                   <div id="profil-table-dmd-users"></div>' +
            '                </div>\n' +
            '            </div>';

        this.div.html(template);
        this.divTableAllUserDemandeProprio = this.div.find("#profil-table-dmd-users");
        this.initDivTableAllUser();

    },

    getUsersDmdProrio : function () {
        let that = this;

        let form = {
            action : "get-demande-users",
        };

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                console.log(data.error);
            }
            console.log(data);
            that.deleteRows();
            that.construcRowsDemande(data.demandes);
        },"json");
    },

    initDivTableAllUser : function () {
        let that = this;
        let template = '  <table id="table-all-demande" class="table table-hover table-bordered responsive text-center" style="color: black">\n' +
            '    <thead>\n' +
            '      <tr>\n' +
            '        <th>Date Demande</th>\n' +
            '        <th>Emplacement</th>\n' +
            '        <th>Nom</th>\n' +
            '        <th>Prénom</th>\n' +
            '        <th>Mail</th>\n' +
            '        <th>Date Début</th>\n' +
            '        <th>Date Fin</th>\n' +
            '        <th>Message</th>\n' +
            '        <th>Status</th>\n' +
            '        <th>Annuler</th>\n' +
            '        <th>Mail</th>\n' +
            '      </tr>\n' +
            '    </thead>\n' +
            '    <tbody>\n' +
            '    </tbody>\n' +
            '  </table>';

        this.divTableAllUserDemandeProprio.html(template);
        this.tableDemandeUser = this.divTableAllUserDemandeProprio.find("#table-all-demande");
        this.tableDemandeUser.DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
            }
        });

        // Abonnement after rezise row
        this.tableDemandeUser.on( 'responsive-display.dt', function ( e, datatable, row, showHide, update ) {
            $(this).find(".canceled").click(function () {
                that.cancelDemande($(this).data("id"));
            });
        });

        this.getUsersDmdProrio();
    },

    construcRowsDemande : function (users) {
        let that = this;

        $.each(users, function () {
            that.tableDemandeUser.DataTable().row.add(
                [
                    this.date_demande,
                    this.id_emplacement,
                    this.nom,
                    this.prenom,
                    this.mail,
                    this.date_debut,
                    this.date_fin,
                    this.message_demande,
                    this.lib_dmd,
                    that.constructTemplateBtnCancel(this.id),
                    that.constructTemplateBtnMail(this.id , this.mail , this.message_demande)
                ]
            ).draw(false);
        });

        this.tableDemandeUser.find(".canceled").click(function () {
            that.cancelDemande($(this).data("id"));
        });

    },

    constructTemplateBtnCancel : function (id) {
        let template = '<button class="btn btn-danger canceled" data-id="'+ id +'"><i class="fas fa-trash-alt"></i></button>';
        return template;
    },

    constructTemplateBtnMail : function (id , mail , sujet) {
        let template = '<a class="btn btn-dark" href="mailto:'+mail+'?subject=Demande de Location&body='+sujet+'"><i class="far fa-envelope"></i></a>'
        return template;
    },

    deleteRows : function () {
        this.tableDemandeUser.DataTable().rows().remove().draw();
    },

    cancelDemande : function (id) {
        let that = this;

        let form = {
            action  : "cancel_demande",
            idDmd   : id,
        };

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                console.log(data.error);
            }
            that.getUsersDmdProrio();
            that.notifyDeleted();
        },"json");
    },

    notifyDeleted : function () {
        $(this).trigger("demande-has-been-removed");
    }

};