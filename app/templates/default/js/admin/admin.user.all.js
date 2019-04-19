var adminUserAll = {

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
            '                <div class="panel-heading text-center w3-text-black"> Gérer l\'ensemble des utilisateurs </div>\n' +
            '\n' +
            '                <div class="panel-body">\n' +
            '                   <div id="admin-div-table-all-users"></div>' +
            '                </div>\n' +
            '\n' +
            '            </div>';

        this.div.html(template);
        this.divTableAllUser = this.div.find("#admin-div-table-all-users");
        this.initDivTableAllUser();

    },

    getUsers : function () {
        let that = this;

        let form = {
            action      : "get-all-users",
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

    initDivTableAllUser : function () {
        let that = this;
        let template = '  <table id="table-all-user" class="table table-hover table-bordered responsive text-center" style="color: black">\n' +
            '    <thead>\n' +
            '      <tr>\n' +
            '        <th>Nom</th>\n' +
            '        <th>Prenom</th>\n' +
            '        <th>Mail</th>\n' +
            '        <th>téléphone</th>\n' +
            '        <th></th>\n' +
            '        <th></th>\n' +
            '      </tr>\n' +
            '    </thead>\n' +
            '    <tbody>\n' +
            '    </tbody>\n' +
            '  </table>';

        this.divTableAllUser.html(template);
        this.tableNewUser = this.divTableAllUser.find("#table-all-user");
        this.tableNewUser.DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
            }
        });

        // Abonnement after rezise row
        this.tableNewUser.on( 'responsive-display.dt', function ( e, datatable, row, showHide, update ) {
            $(this).find(".admin").on('click'  , function () {
                that.makeUserAdmin($(this).data("id"));
            });

            $(this).find(".rejected").click(function () {
                that.rejectUser($(this).data("id"));
            });

            $(this).find(".normal").click(function () {
                that.makeUserNormal($(this).data("id"));
            });
        } );

        this.getUsers();
    },

    construcRowsNewUser : function (users) {
        let that = this;

        $.each(users, function () {
            let btn = "";
            if (this.rights != 10){
                btn = that.constructTemplateBtnAdmin(this.id_coproprietaire);
            } else {
                btn = that.constructTemplateBtnNormal(this.id_coproprietaire)
            }

            that.tableNewUser.DataTable().row.add(
                [
                    this.nom,
                    this.prenom,
                    this.mail,
                    this.tel,
                    btn,
                    that.constructTemplateBtnReject(this.id_coproprietaire)
                ]
            ).draw(false);
        });

        this.tableNewUser.find(".admin").on('click'  , function () {
            that.makeUserAdmin($(this).data("id"));
        });

        this.tableNewUser.find(".rejected").click(function () {
            that.rejectUser($(this).data("id"));
        });

        this.tableNewUser.find(".normal").click(function () {
            that.makeUserNormal($(this).data("id"));
        });

    },

    constructTemplateBtnAdmin : function (idUser) {
        let template = '<button class="btn btn-success admin" data-id="'+ idUser +'"><i class="fas fa-user-shield"></i></button>';
        return template;
    },

    constructTemplateBtnReject : function (idUser) {
        let template = '<button class="btn btn-danger rejected" data-id="'+ idUser +'"><i class="fas fa-user-slash"></i></button>';
        return template;
    },

    constructTemplateBtnNormal : function (idUser) {
        let template = '<button class="btn btn-dark normal" data-id="'+ idUser +'"><i class="fas fa-user-edit"></i></button>';
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

    makeUserAdmin : function (id) {
        let that = this;

        let form = {
            action      : "make-user-admin",
            idCopro     : id,
        };

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                console.log(data.error);
            }
            that.getUsers();
        },"json");
    },


    makeUserNormal : function (id) {
        let that = this;

        let form = {
            action      : "set-normal-right-user",
            idCopro     : id,
        };

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                console.log(data.error);
            }
            that.getUsers();
        },"json");
    },




};