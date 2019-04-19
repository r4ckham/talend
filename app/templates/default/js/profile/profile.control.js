var profilControl = {

    init : function(container)
    {
        let that = this;

        $(profileAddCar).on("cars-has-changed" , function(){
            userCar.getUserCar();
        });

        this.div = $("#" + container);
        this.render();
    },


    render : function()
    {
        let template = "";
        template += '' +
            '   <div id="profile-main-row" class="row">\n' +
            '       <div id="profile-car-container"    class="col-xl-9 col-lg-12 col-12" style="margin-top: 10px"></div>\n' +
            '       <div id="profile-propriete-container"  class="col-lg-12 col-12" style="margin-top: 0px"></div>\n' +
            '   </div>';

        this.div.html(template);

        userCar.init("profile-car-container");
        profileAddCar.init("profile-info-container");
    },

};