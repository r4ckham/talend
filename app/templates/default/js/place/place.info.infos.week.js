"use strict";

var _template = '<div id="chart-info-week"></div>';

var _optionHighchart = {
    colors : ["#3c8dbc" , "coral"],

    chart: {
        backgroundColor : 'black',
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 5,
        type:"line",
        zoomType: 'x',
    },

    title: {
        text: 'Place de Parking : Triangle'
    },

    subtitle: {
        text: 'Source: data.montpellier3m.fr'
    },

    yAxis: {
        title: {
            text: 'Occupation'
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
};

var placeInfosWeek = {

    props : ["frees"],

    template: _template,

    data:  function(){
        return {
            container: "chart-info-week",
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
            Highcharts.setOptions(_optionHighchart);
            $("#" + this.container ).highcharts({
                colors : ["steelblue"],

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
                    text: 'Graphique Hebdomadaire'
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