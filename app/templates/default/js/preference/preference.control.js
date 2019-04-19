var preferenceControl = {

    init : function(container)
    {
        let that = this;

        $(demandeUser).on("demande-has-been-removed" , function(){
            demandeProprio.getUsersDmdProrio();
        });
        this.div = $("#" + container);
        this.render();
    },


    render : function()
    {
        let template = "";
        template += '' +
            '   <div id="pref-main-row" class="row">\n' +
            '       <div id="pref-demande-proprio-container"  class="col-lg-12 col-12" style="margin-top: 0px"></div>\n' +
            '       <div id="pref-demande-demandeur-container"  class="col-lg-12 col-12" style="margin-top: 0px"></div>\n' +
            '       <div id="pref-dispo-container"   class="col-lg-12 col-12" style="margin-top: 0px"></div>\n' +
            '   </div>';

        this.div.html(template);

        demandeProprio.init("pref-demande-proprio-container");
        demandeUser.init("pref-demande-demandeur-container");
        dispoUser.init("pref-dispo-container");
    },

};