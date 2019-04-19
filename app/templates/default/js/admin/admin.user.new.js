var adminUserNew = {

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
            '                <div class="panel-heading text-center w3-text-black"> Gérer les nouvelles demandes </div>\n' +
            '\n' +
            '                <div class="panel-body">\n' +
            '                   <div id="admin-div-table-new-user"></div>' +
            '                </div>\n' +
            '\n' +
            '            </div>';

        this.div.html(template);
        this.divTableNewUser = this.div.find("#admin-div-table-new-user");
        this.initDivTableNewUser();

    },

    getUsers : function () {
        let that = this;

        let form = {
            action      : "get-new-users",
        };

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                console.log(data.error);
            }
            console.log(data);
            that.deleteRows();
            that.construcRowsNewUser(data.users);
        },"json");
    },

    initDivTableNewUser : function () {
        let that = this;
        let template = '  <table id="table-new-user" class="table table-hover table-bordered responsive text-center" style="color: black">\n' +
            '    <thead>\n' +
            '      <tr>\n' +
            '        <th>Nom</th>\n' +
            '        <th>Prenom</th>\n' +
            '        <th>Mail</th>\n' +
            '        <th>téléphone</th>\n' +
            '        <th>Place</th>\n' +
            '        <th>Accepter</th>\n' +
            '        <th>Refuser</th>\n' +
            '      </tr>\n' +
            '    </thead>\n' +
            '    <tbody>\n' +
            '    </tbody>\n' +
            '  </table>';

        this.divTableNewUser.html(template);
        this.tableNewUser = this.divTableNewUser.find("#table-new-user");
        this.tableNewUser.DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
            }
        });

        // Abonnement after rezise row
        this.tableNewUser.on( 'responsive-display.dt', function ( e, datatable, row, showHide, update ) {

            $(this).find(".insert").click(function () {
                that.acceptUser($(this).data("id"));
            });

            $(this).find(".delete").click(function () {
                that.rejectUser($(this).data("id"));
            });
        } );

        this.getUsers();
    },

    construcRowsNewUser : function (users) {
        let that = this;

        $.each(users, function () {
            that.tableNewUser.DataTable().row.add(
                [
                    this.nom,
                    this.prenom,
                    this.mail,
                    this.tel,
                    this.id_emp_prov,
                    that.constructTemplateBtnYes(this.id_coproprietaire),
                    that.constructTemplateBtnNo(this.id_coproprietaire)
                ]
            ).draw(false);
        });

        this.tableNewUser.find(".insert").click(function () {
            that.acceptUser($(this).data("id"));
        });

        this.tableNewUser.find(".delete").click(function () {
            that.rejectUser($(this).data("id"));
        });

    },

    constructTemplateBtnYes : function (idUser) {
        let template = '<button class="btn btn-success insert" data-id="'+ idUser +'"><i class="far fa-check-circle"></i></button>';
        return template;
    },

    constructTemplateBtnNo : function (idUser) {
        let template = '<button class="btn btn-danger delete" data-id="'+ idUser +'"><i class="far fa-times-circle"></i></button>';
        return template;
    },

    deleteRows : function () {
        this.tableNewUser.DataTable().rows().remove().draw();
    },

    rejectUser : function (id) {
        let that = this;

        let form = {
            action      : "set-no-right-user",
            idCopro     : id,
        };

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                console.log(data.error);
            }
            that.getUsers();
        },"json");
    },

    acceptUser : function (id) {
        let that = this;

        let form = {
            action      : "set-normal-right-user",
            idCopro     : id,
        };

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                console.log(data.error);
                console.log(data);
            }
            that.getUsers();
        },"json");
    },




};