"use strict";

var _template = '<div id="chart-occupation-jour"></div>';

var _optionHighchart = {
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
};

var placeAggloJour = {

    props : ["occupations"],

    template: _template,

    data:  function(){
        return {
            container: "chart-occupation-jour",
        };
    },

    watch : {
        occupations : function() {
            $("#" + this.container).highcharts().series[0].setData(this.occupations);
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
                colors : ["blueviolet"],

                chart: {
                    backgroundColor: {
                        linearGradient: [0, 0, 500, 500],
                        stops: [
                            [0, 'rgb(255, 255, 255)'],
                            [1, 'rgb(240, 240, 255)']
                        ]
                    },
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
                    text: 'Occupation agglomérée sur 24 heures'
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
                    name: 'Occupation (%)',
                    type: 'area',
                    dataagglo: that.occupations
                }],
            });
        },


    },
};