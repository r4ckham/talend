var demandeProprio = {

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
            '                <div class="panel-heading text-center w3-text-black"> Consulter les demandes de vos emplacements </div>\n' +
            '\n' +
            '                <div class="panel-body">\n' +
            '                   <div id="profil-table-dmd-users"></div>' +
            '                </div>\n' +
            '\n' +
            '                <div class="card-footer">\n' +
            '\n' +
            '                </div>\n' +
            '            </div>';

        this.div.html(template);
        this.divTableAllUserDemandeProprio = this.div.find("#profil-table-dmd-users");
        this.initDivTableAllUser();

    },

    getUsersDmdProrio : function () {
        let that = this;

        let form = {
            action : "get-demande-users-proprio",
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
        let template = '  <table id="table-all-demande-proprio" class="table table-hover table-bordered responsive text-center" style="color: black">\n' +
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
            '        <th>Refuser</th>\n' +
            '        <th>Accepter</th>\n' +
            '      </tr>\n' +
            '    </thead>\n' +
            '    <tbody>\n' +
            '    </tbody>\n' +
            '  </table>';

        this.divTableAllUserDemandeProprio.html(template);
        this.tableDemandeUser = this.divTableAllUserDemandeProprio.find("#table-all-demande-proprio");
        this.tableDemandeUser.DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
            }
        });

        // Abonnement after rezise row
        this.tableDemandeUser.on( 'responsive-display.dt', function ( e, datatable, row, showHide, update ) {

            $(this).find(".accepted").click(function () {
                that.acceptDemande($(this).data("id"));
            });

            $(this).find(".rejected").click(function () {
                that.rejectDemande($(this).data("id"));
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
                    that.constructTemplateBtnReject(this.id),
                    that.constructTemplateBtnAccept(this.id)
                ]
            ).draw(false);
        });

        this.tableDemandeUser.find(".accepted").click(function () {
            that.acceptDemande($(this).data("id"));
        });

        this.tableDemandeUser.find(".rejected").click(function () {
            that.rejectDemande($(this).data("id"));
        });

    },

    constructTemplateBtnAccept : function (id) {
        let template = '<button class="btn btn-success accepted" data-id="'+ id +'"><i class="fas fa-road"></i></button>';
        return template;
    },

    constructTemplateBtnReject : function (id) {
        let template = '<button class="btn btn-danger rejected" data-id="'+ id +'"><i class="fas fa-car-crash"></i></button>';
        return template;
    },

    deleteRows : function () {
        this.tableDemandeUser.DataTable().rows().remove().draw();
    },

    acceptDemande : function (id) {
        let that = this;

        let form = {
            action      : "accept_demande",
            idDmd     : id,
        };

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                console.log(data.error);
                console.log(data);
            }
            that.getUsersDmdProrio();
        },"json");
    },

    rejectDemande : function (id) {
        let that = this;

        let form = {
            action      : "reject_demande",
            idDmd     : id,
        };

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                console.log(data.error);
            }
            that.getUsersDmdProrio();
        },"json");
    },

};