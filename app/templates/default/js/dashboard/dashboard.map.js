var dashboardMap = {

    init : function(container)
    {
        this.div = $("#" + container);
    },

    render : function(map) {
        this.div.html(map);
        let that = this;
        var map = Snap("#map");
        // Zoom on div
        map.addClass("zoomable");
        var area = $(".zoomable");
        area.panzoom({
            panOnlyWhenZoomed: true,
            minScale: 1,
            cursor : "pointer",
            $zoomIn: $("#zoom-in"),
            $zoomOut: $("#zoom-out"),
            $reset: $("#reset"),
        });

        this.loadParkingLot();
    },

    loadParkingLot : function(){
        let that = this;
        let form = {
            action : "getEmplacementResidence",
        };
        $.post(ajaxUrl , form , function(data){
            if(data.status != 200)
            {
                console.log(data.error);
            }

            console.log(data.places);
            that.constructLots(data.places);

        } , "json");
    },

    constructLots : function(places){
        let that = this;
        var map = Snap("#map");

        $.each(places , function(){
            rect = map.rect(this.coo_x, this.coo_y,this.largeur , this.longueur);
            if(this.id_coproprietaire == "" || this.id_coproprietaire == null )
            {
                rect.attr({
                    fill : "grey",
                    stroke : "yellow",
                    id : this.id_emplacement,
                });
                rect.addClass("no-participate");
                $("#" + this.id_emplacement).click(function () {
                    alert("Place non participative !");
                });
            }else {
                rect.attr({
                    fill : "red",
                    stroke : "green",
                    id : this.id_emplacement,
                });
                rect.addClass("participate");
                $("#" + this.id_emplacement).data("id_emplacement" , this.id_emplacement);
                $("#" + this.id_emplacement).data("description" , this.description);
            }
        });

        this.notifyTemplateMapReady();
    },

    setFreeLots : function(places){
        let that = this;
        // Raz de la place aux chargement des disponibilités
        this.div.find(".participate").css({fill : "red"}).unbind("click");

        $.each(places , function(){
            $("#" + this.id_emp).css({
                fill : "lime",
            });
            $("#" + this.id_emp).data("description" , this.description);
            $("#" + this.id_emp).click(function () {
                //that.notifyClickOnLot($(this).data("id_emplacement"));
            });
            $("#" + this.id_emp).on('touchend click', function(event) {
                event.stopPropagation();
                event.preventDefault();
                that.notifyClickOnLot($(this).data("id_emplacement"));
                // this fires once on all devices
            });
        });

    },

    notifyClickOnLot : function (idEmp) {
      $(this).trigger("click-on-lot" , [idEmp]);
    },

    notifyTemplateMapReady : function () {
        $(this).trigger("map-is-ready")
    }


};