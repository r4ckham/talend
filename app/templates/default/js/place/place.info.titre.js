"use strict";

var _template = " <div class='alert alert-info row text-center' style='margin-left: 0px;margin-right: 0px;margin-top: 10px;background-color: #3c8dbc!important'> " +
                    "<div class='col-lg-2'> " +
                        "<div class=\"input-group\">\n" +
                            "<span class='input-group-addon'>Nom</span>\n" +
                            "<p type='text' class='form-control' style='font-weight: bold'> {{ titre }} </p>" +
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
                            "<p type='text' class='form-control' style='font-weight: bold'> {{ code }} </p>" +
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

    props : ["titre" , "total" , "lastDate" , "status" , "code"],

    template: _template,

    data:  function(){
        return {

        };
    },
};