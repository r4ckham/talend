var dashboardControl = {

    init : function(container)
    {
        let that = this;

        this.interval = 30000;
        this.interval = 30000;
        this.div = $("#" + container);
        this.render();

        $(dashboardMap).on("click-on-lot" , function(e , idEmp){
            dashboardModale.loadInfosLot(idEmp);
        });

        $(dashboardMap).on("map-is-ready" , function(){
            that.loadCurrentDispoLots();
        });

        $(dashboardEmplacement).on("dispo-has-changed" , function(){
            that.loadCurrentDispoLots();
        });

        $(dashboardSearch).on("search-from-place" , function( e , str , end){
            that.clearIntervalCheckCurrentDispo();
            that.loadSearchDispoLots(str , end);
            that.setIntervalCheckSearchDispo(str , end);

            dashboardModale.setTimeToInputs(dashboardSearch.getSearchTimeStart() , dashboardSearch.getSearchTimeEnd());
        });

        $(dashboardSearch).on("search-from-place-end" , function(){
            that.clearIntervalCheckSearchDispo();
            that.loadCurrentDispoLots();
            that.setIntervalCheckCurrentDispo();
            dashboardModale.setTimeToInputs("lol" , dashboardSearch.getSearchTimeEnd());
            //dashboardModale.setTimeToInputs();
        });


        if($(window).width() >= 960){
            dashboardNavigation.init("dashboard-nav-up");
        } else {
            dashboardNavigation.init("dashboard-nav-down");
        }

        dashboardEmplacement.init("dashboard-emplacement");
        dashboardSearch.init("dashboard-car");
        dashboardMap.init("dashboard-map-container");
        dashboardModale.init("dashboard-modale");

        this.loadMap();
        this.loadUserLot();

        this.setIntervalCheckCurrentDispo();

    },

    setIntervalCheckCurrentDispo : function(){
        let that = this;
        this.checkCurrentDispo = setInterval(function(){
            that.loadCurrentDispoLots();
        }, that.interval);
    },

    setIntervalCheckSearchDispo : function(s , e){
        let that = this;
        this.checkSearchDispo = setInterval(function(){
            that.loadSearchDispoLots(s , e);
        }, that.interval);
    },

    clearIntervalCheckCurrentDispo : function(){
        clearInterval(this.checkCurrentDispo);
        console.log(this.checkCurrentDispo);
    },

    clearIntervalCheckSearchDispo : function(){
        clearInterval(this.checkSearchDispo);
    },

    render : function()
    {
        let template = "";
        template += '' +
            '   <div id="dashboard-col-navigation" class="row">\n' +
            '       <div id="dashboard-map-container" class="map-dashboard" style="margin-top: 20px"></div>\n' +
            '       <div id="dashboard-modale"></div>' +
            '   </div>';

        this.div.html(template);
    },

    loadMap : function ()
    {
        let form = {
            action : "getMap",
        }

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                console.log(data.error);
            }

            dashboardMap.render(data.map.svg_model);

            console.log(data);
        } , "json");
    },

    loadUserLot : function ()
    {
        let that = this;
        let form = {
            action : "getEmplacementUser",
        }

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                console.log(data.error);
            }

            dashboardEmplacement.completeSelect(that.constructLotOpts(data.places));

            console.log(data);
        } , "json");
    },

    constructLotOpts : function (lots)
    {
        let template = "";
        $.each(lots , function(){
            template += '<option value="'+ this.id_emplacement +'">'+ this.id_emplacement+'</option>';
        });
        return template;
    },


    loadCurrentDispoLots : function ()
    {
        let that = this;
        let form = {
            action : "get-current-dispo",
        }

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                console.log(data.error);
            }

            dashboardMap.setFreeLots(data.places);
        } , "json");

    },

    loadSearchDispoLots : function ( startDate , endDate ) {

        let that = this;
        let form = {
            action : "get-search-dispo",
            start : startDate,
            end : endDate,
        }

        $.post(ajaxUrl , form , function (data) {
            if (data.status != 200){
                console.log(data.error);
            }

            dashboardMap.setFreeLots(data.places);
        } , "json");

    },






};