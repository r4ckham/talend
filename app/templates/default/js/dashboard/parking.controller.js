"use strict";

var parkingController = {

    parkingDatas : null,
    ajaxUrl : null,
    div : null,

    init : function(ajaxUrl , container){

        this.ajaxUrl = ajaxUrl;

        this.initHighchart();

        this.div = $("#" + container);

        this.template();

        var that = this;

        setInterval(function(){
            that.updateLines();
            console.log("TIMEOUT");
        }, 120000);
    },

    template : function(){
        var template =  "<div id='line_corum' class='row' style='margin-top: 20px'></div>";
        template    +=  "<div id='line_triangle' class='row' style='margin-top: 20px'></div>";
        template    +=  "<div id='line_gare' class='row' style='margin-top: 20px'></div>";
        template    +=  "<div id='line_foch' class='row' style='margin-top: 20px'></div>";
        template    +=  "<div id='line_gambetta' class='row' style='margin-top: 20px'></div>";
        template    +=  "<div id='line_europa' class='row' style='margin-top: 20px'></div>";
        template    +=  "<div id='line_antigone' class='row' style='margin-top: 20px'></div>";
        template    +=  "<div id='line_arc' class='row' style='margin-top: 20px'></div>";
        template    +=  "<div id='line_comedie' class='row' style='margin-top: 20px'></div>";

        this.div.html(template);

        this.getDataForParking( "CORU", "Corum" , "line_corum" , true);
        this.getDataForParking("Triangle" ,"Triangle","line_triangle", true);
        this.getDataForParking("GARE" ,"Gare","line_gare", true);
        this.getDataForParking("FOCH" ,"Foch","line_foch", true);
        this.getDataForParking("GAMB" ,"Gambetta","line_gambetta", true);
        this.getDataForParking("EURO" ,"Europa","line_europa", true);
        this.getDataForParking("ANTI" ,"Antigone","line_antigone", true);
        this.getDataForParking("ARCT" ,"Arc De Triomphe","line_arc", true);
        this.getDataForParking("COME" ,"Comedie","line_comedie", true);
    },

    updateLines : function(){
        this.getDataForParking( "CORU", "Corum" , "line_corum" , false);
        this.getDataForParking("Triangle" ,"Triangle","line_triangle", false);
        this.getDataForParking("GARE" ,"Gare","line_gare", false);
        this.getDataForParking("FOCH" ,"Foch","line_foch", false);
        this.getDataForParking("GAMB" ,"Gambetta","line_gambetta", false);
        this.getDataForParking("EURO" ,"Europa","line_europa", false);
        this.getDataForParking("ANTI" ,"Antigone","line_antigone", false);
        this.getDataForParking("ARCT" ,"Arc De Triomphe","line_arc", false);
        this.getDataForParking("COME" ,"Comedie","line_comedie", false);
    },

    getDataForParking : function (code , name , div , init ){
        var form = {
            action : "get_parking_data_day",
            name : code,
        };

        var that = this;

        $.post(this.ajaxUrl , form , function (data) {

            that.infos = null;

            if(data.status != 200){
                console.log(data.message);
            }

            var infos =  {
                frees : [],
                totals : [],
                occupees : [],
                occupations : [],
            };

            $.each(data.infos , function(index , info){
                // var date = info.Datetime;
                var date = new Date(info.Datetime.replace(/-/g,"/"));
                date = Date.UTC(date.getFullYear() , date.getMonth() , date.getDate() , date.getHours() , date.getMinutes());
                //console.log(date);
                var free = parseInt(info.Free , 10);
                var total = parseInt(info.Total , 10);
                var occupe = total - free ;
                var occupation = 100 - (free * 100) / total ;

                infos.frees.push([date , free]);
                infos.totals.push([date , total]);
                infos.occupees.push([date , occupe]);
                infos.occupations.push([date , Math.round(occupation)]);

            });

            if(init){
                that.constructLine(div , infos , name);
            }else{
                that.refreshLine(div , infos);
            }

        }, "JSON" );

    },

    constructLine : function(div , infos , name){
        $("#" + div).line({
            infos : infos ,
            name : name,
        });
    },

    refreshLine : function(div , infos){
        $("#" + div).line("refresh" , {
            infos : infos ,
        });
    },


    initHighchart : function(){
        Highcharts.setOptions({
            colors : ["#3c8dbc" , "coral"],

            chart: {
                borderColor: 'lightgrey',
                borderWidth: 1,
                borderRadius: 5,
                type:"line",
                zoomType: 'x'
            },

            title: {
                text: 'Place de Parking : Triangle'
            },

            subtitle: {
                text: 'Source: data.montpellier3m.fr'
            },

            yAxis: {
                title: {
                    text: 'Nombre de places'
                }
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%e de %b'
                },
                title: {
                    text: 'Date'
                },
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                }
            },

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            },

            credits: {
                enabled: false
            },
        });
    }

};
