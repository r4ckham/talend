"use strict";


var _app = {
    el: '#app',

    data:  {
        titre       : "titre de base",

        aggloHeures : [],
        aggloJours  : [],
        infosDay    :
        {
            frees   : [],
            totals  : [],
        },
        infosWeek   :
        {
            frees   : [],
            totals  : [],
        },
        total       : 0,
        lastDate    : null,
        code        : null,
        status      : null,

        test        : "zut",
    },

    components : {
        "place-titre" : placeTitre,
        "place-infos-week" : placeInfosWeek,
        "place-infos-day" : placeInfosDay,
        "place-agglo-heure" : placeAggloHeure,
        "place-agglo-jour" : placeAggloJour,
    },

    created : function(){
        this.titre = "Triangle";
        this.code="CORU";
    },

    mounted : function(){
        var that = this;
        that.initAllData();
        setInterval(function(){
            that.initAllData();
            console.log("TIMEOUT");
        }, 20000);
    },

    methods :  {

        initAllData : function()
        {
            var that = this;

            var form = {
                action : "init-all-data",
                name : this.code,
            };
            // TODO ARRAYENTITE
            $.post(ajaxUrl , form , function(data){
                if(data.status != 200){
                    console.log(data.error);
                }

                var tempFrees = [];
                var tempTotals= [];

                $.each(data.infosWeek , function(index , info){
                    // var date = info.Datetime;
                    var date = new Date(info.Datetime.replace(/-/g,"/"));
                    date = Date.UTC(date.getFullYear() , date.getMonth() , date.getDate() , date.getHours() , date.getMinutes());

                    var free = parseInt(info.Free , 10);
                    var total = parseInt(info.Total , 10);

                    tempFrees.push([date , free]);
                    tempTotals.push([date , total]);

                    if(index == data.infosWeek.length - 1){
                        that.total = total;
                        that.lastDate = info.Datetime;
                        that.code = info.Name;
                        that.status = info.Status;
                    }

                });

                var tempFreesDays = [];
                var tempTotalsDays = [];
                $.each(data.infosDay , function(index , info){
                    // var date = info.Datetime;
                    var date = new Date(info.Datetime.replace(/-/g,"/"));
                    date = Date.UTC(date.getFullYear() , date.getMonth() , date.getDate() , date.getHours() , date.getMinutes());

                    var free = parseInt(info.Free , 10);
                    var total = parseInt(info.Total , 10);

                    tempFreesDays.push([date , free]);
                    tempTotalsDays.push([date , total]);

                });

                var tempAggloHeures = [];
                $.each(data.aggloHeure , function(index , agglo){
                    // var date = info.Datetime;
                    var date = new Date(agglo.Datetime.replace(/-/g,"/"));
                    date = Date.UTC(date.getFullYear() , date.getMonth() , date.getDate() , date.getHours() , date.getMinutes());
                    //console.log(date);
                    var free = parseInt(agglo.free , 10);
                    var total = parseInt(agglo.total , 10);
                    var occupation = 100 - (free * 100) / total ;

                    tempAggloHeures.push([date , Math.round(occupation)]);
                });

                var tempAggloJours = [];
                $.each(data.aggloJour , function(index , agglo){
                    // var date = info.Datetime;
                    var date = new Date(agglo.Datetime.replace(/-/g,"/"));
                    date = Date.UTC(date.getFullYear() , date.getMonth() , date.getDate() , date.getHours() , date.getMinutes());
                    //console.log(date);
                    var free = parseInt(agglo.free , 10);
                    var total = parseInt(agglo.total , 10);
                    var occupation = 100 - (free * 100) / total ;

                    tempAggloJours.push([date , Math.round(occupation)]);
                });


                that.infosWeek.frees = tempFrees;
                that.infosWeek.totals = tempTotals;

                that.infosDay.frees = tempFreesDays;
                that.infosDay.totals = tempTotalsDays;

                that.aggloHeures = tempAggloHeures;
                that.aggloJours = tempAggloJours;

                console.log(data);
            } , "json");
        },

    },
};

$(document).ready(function(){
    var app = new Vue(_app);
});