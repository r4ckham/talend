"use strict";

$.widget( "custom.line", {
    // default options
    options: {
        infos : null,
        name : null,
    },

    _create : function () {

        console.log("infos" , this.options.infos);

        var template = "<div id='line_libre'class='col-lg-4'></div>";
        template    += "<div id='line_occu' class='col-lg-4'></div>";
        template    += "<div id='line_prct' class='col-lg-4'></div>";

        this.element.html(template);

        this.lineLib = this.element.find("#line_libre");
        this.lineOcc = this.element.find("#line_occu");
        this.linePtc = this.element.find("#line_prct");

        Highcharts.setOptions({
            title: {
                text: '<span style="color:mediumblue"> ' + this.options.name + " </span>"
            },
        });

       this.lineLib.highcharts({
            series: [{
                name: 'Place Libres',
                type: 'area',
                data: this.options.infos.frees
            },{
                name: 'Place Total',
                data: this.options.infos.totals
            }],
        });

        this.lineOcc.highcharts({
            series: [{
                name: 'Place Occupées',
                type: 'area',
                data: this.options.infos.occupees
            },{
                name: 'Place Total',
                data: this.options.infos.totals
            }]
        })

        this.linePtc.highcharts({
            yAxis: {
                title: {
                    text: 'Pourcentage'
                }
            },
            series: [{
                name: 'Occupation %',
                type: 'area',
                data: this.options.infos.occupations,
            }],
        });
    },

    refresh : function(data){

        this.lineLib.highcharts().series[0].setData(data.infos.frees);
        this.lineLib.highcharts().series[1].setData(data.infos.totals);

        this.lineOcc.highcharts().series[0].setData(data.infos.occupees);
        this.lineOcc.highcharts().series[1].setData(data.infos.totals);

        this.linePtc.highcharts().series[0].setData(data.infos.occupations);

    },


});