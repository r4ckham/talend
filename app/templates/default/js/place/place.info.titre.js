"use strict";

var _template = " <div class='alert alert-info row text-center' style='margin-left: 0px;margin-right: 0px;margin-top: 10px;background-color: #3c8dbc!important'> " +
                    "<div class='col-lg-2'> " +
                        "<div class=\"input-group\">\n" +
                            "<span class='input-group-addon'>Nom </span>\n" +
                            "<select class='form-control' @change='onChange($event)' style='border-radius : 0%;-webkit-appearance: none;'>"+
                                "<option v-for='option in options' :value='option.code'>"+
                                    "{{ option.nom }}"+
                                "</option>"+
                            "</select>" +
                        "</div>" +
                    "</div>" +
                    "<div class='col-lg-4'> " +
                        "<div class=\"input-group\">\n" +
                            "<span class='input-group-addon'>Dernier Import</span>\n" +
                            "<p type='text' class='form-control' style='font-weight: bold'> {{ lastDate }} </p>" +
                        "</div>" +
                    "</div>" +
                    "<div class='col-lg-2'> " +
                        "<div class=\"input-group\">\n" +
                            "<span class='input-group-addon'>Status</span>\n" +
                            "<p type='text' class='form-control' style='font-weight: bold'> {{ status }} </p>" +
                        "</div>" +
                    "</div>" +
                    "<div class='col-lg-2'> " +
                        "<div class=\"input-group\">\n" +
                            "<span class='input-group-addon'>Code</span>\n" +
                            "<p type='text' class='form-control' style='font-weight: bold'> {{ value }} </p>" +
                        "</div>" +
                    "</div>" +
                    "<div class='col-lg-2'> " +
                        "<div class=\"input-group\">\n" +
                            "<span class='input-group-addon'>Total</span>\n" +
                            "<p type='text' class='form-control' style='font-weight: bold'> {{ total }} </p>" +
                        "</div>" +
                    "</div>" +
                "</div>";

var placeTitre = {

    props : ["titre" , "total" , "lastDate" , "status" , "value"],

    template: _template,

    data:  function(){
        return {
            selected : "Triangle",
            options: [
                { nom : "Corum"             , code : "CORU"},
                { nom : "Triangle"          , code : "Triangle"},
                { nom : "Antigone"          , code : "ANTI"},
                { nom : "Arc de Triomphe"   , code : "ARCT"},
                { nom : "Foch"              , code : "FOCH"},
                { nom : "Gambetta"          , code : "GAMB"},
                { nom : "Gare"              , code : "GARE"},
                { nom : "Europa"            , code : "EURO"},
            ],
        };
    },

    created : function(){
        console.log(this.value);
    },

    methods : {
        onChange : function(event) {
            console.log(event.target.value);
            this.$emit("input" , event.target.value);
        },
    },
};