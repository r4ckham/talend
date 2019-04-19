var userCar = {

    init : function(container)
    {
        this.div = $("#" + container);
        this.render();
    },

    render : function()
    {
        let that = this;
        let template = "";
        template += ' <div id="" class="panel panel-default" style="margin-bottom: 20px">\n' +
            '\n' +
            '                <div class="panel-heading text-center"> Gérer vos voitures </div>\n' +
            '\n' +
            '                <div class="panel-body">\n' +
            '                   <div id="profil-dispo-user"></div>' +
            '                </div>\n' +
            '\n' +
            '            </div>';

        this.div.html(template);
        this.divTableAllCar = this.div.find("#profil-dispo-user");
        this.initDivTableAllCar();

    },

    getUserCar : function () {
        let that = this;

        let form = {
            action : "get-all-user-cars",
        };

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                console.log(data.error);
            }
            console.log(data);
            that.deleteRows();
            that.construcRowsCars(data.cars);
        },"json");
    },

    initDivTableAllCar : function () {
        let that = this;
        let template = '  <table id="table-all-cars" class="table table-hover table-bordered responsive text-center" style="color: black">\n' +
            '    <thead>\n' +
            '      <tr>\n' +
            '        <th>Immatriculation</th>\n' +
            '        <th>Type</th>\n' +
            '        <th>Couleur</th>\n' +
            '        <th>Supprimer</th>\n' +
            '      </tr>\n' +
            '    </thead>\n' +
            '    <tbody>\n' +
            '    </tbody>\n' +
            '  </table>';

        this.divTableAllCar.html(template);
        this.tableUserCar = this.divTableAllCar.find("#table-all-cars");
        this.tableUserCar.DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
            }
        });

        // Abonnement after rezise row
        this.tableUserCar.on( 'responsive-display.dt', function ( e, datatable, row, showHide, update ) {

            $(this).find(".dispo-canceled").click(function () {
                that.removeCar($(this).data("id"));
            });
        });

        this.getUserCar();
    },

    construcRowsCars : function (cars) {
        let that = this;

        $.each(cars, function () {
            that.tableUserCar.DataTable().row.add(
                [
                    this.immatriculation,
                    this.type,
                    this.couleur,
                    that.constructTemplateBtnRemoveCar(this.immatriculation),
                ]
            ).draw(false);
        });

        this.tableUserCar.find(".dispo-canceled").click(function () {
            that.removeCar($(this).data("id"));
        });

    },

    constructTemplateBtnRemoveCar : function (id) {
        let template = '<button class="btn btn-danger dispo-canceled" data-id="'+ id +'"><i class="fas fa-trash-alt"></i></button>';
        return template;
    },

    deleteRows : function () {
        this.tableUserCar.DataTable().rows().remove().draw();
    },

    removeCar : function (id) {
        let that = this;

        let form = {
            action  : "remove-car",
            immat   : id,
        };

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                console.log(data.error);
            }
            that.getUserCar();
        },"json");
    },

};