"use strict";

var _template = '<div id="chart-info"></div>';

var placeInfos = {

    props : ["frees"],

    template: _template,

    data:  function(){
        return {
            container: "chart-info",
        };
    },

    watch : {
        frees : function() {
            $("#" + this.container).highcharts().series[0].setData(this.frees);
        },

    },

    mounted : function(){
        this.displayChartsInfos();
    },

    methods : {

        displayChartsInfos : function(){
            var that = this;
            $("#" + this.container ).highcharts({
                colors : ["#008d4c"],

                chart: {
                    backgroundColor : 'black',
                    borderColor: 'lightgrey',
                    borderWidth: 1,
                    borderRadius: 5,
                    type:"line",
                    zoomType: 'x'
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    x: 0,
                    y: 0
                },
                title: {
                    text: 'Graphique Temps réel'
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
                series: [{
                    name: 'Place Libres',
                    type: 'area',
                    data: that.frees
                }],
            });
        },


    },
};