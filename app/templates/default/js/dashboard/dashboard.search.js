var dashboardSearch = {

    init : function (container) {

        this.div = $("#" + container);
        this.render();

    },

    render : function() {
        let that = this;
        let template = "";

        template += ' <div class="card bg-dark text-white">\n' +
            '\n' +
            '                <div class="card-header text-center">Rechercher à une date spécifique !</div>\n' +
            '\n' +
            '                <div class="card-body">\n' +
            '\n               <div class="row">'+
            '                    <div class="form-group col-xl-12 col-lg-6 col-sm-6 col-12">\n' +
            '                        <div class="input-group">\n' +
            '                            <div class="input-group-prepend">\n' +
            '                                <span class="input-group-text"><i class="fas fa-calendar-alt"></i></span>\n' +
            '                            </div>\n' +
            '                            <input id="input-search-dispo-start-date" type="text" class="form-control" placeholder="Date de début">\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="form-group col-xl-12 col-lg-6 col-sm-6 col-12">\n' +
            '                        <div class="input-group">\n' +
            '                            <div class="input-group-prepend">\n' +
            '                                <span class="input-group-text"><i class="fas fa-calendar-alt"></i></span>\n' +
            '                            </div>\n' +
            '                            <input id="input-search-dispo-end-date" class="form-control" placeholder="Date de fin">\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n                </div>' +
            '                </div>\n' +
            '                <div class="card-footer">\n' +
            '                   <div class="row" style="padding: 0rem 1.25rem;">' +
            '                    <button id="btn-dispo-search" class="btn btn-success col-6" style="border-bottom-right-radius: 0px;border-top-right-radius: 0px"><i class="fas fa-search"></i> </button>\n' +
            '                    <button id="btn-dispo-reset" class="btn btn-info col-6" style="border-bottom-left-radius: 0px;border-top-left-radius: 0px"><i class="far fa-trash-alt"></i></button>\n' +
            '                   </div>' +
            '                </div>\n' +
            '            </div>';

        this.div.html(template);

        this.inputStartDate = this.div.find("#input-search-dispo-start-date");
        this.inputEndDate = this.div.find("#input-search-dispo-end-date");
        this.btnSearch = this.div.find("#btn-dispo-search");
        this.btnReset = this.div.find("#btn-dispo-reset");

        this.inputStartDate.datetimepicker();
        this.inputEndDate.datetimepicker();

        this.btnSearch.click(function () {
            that.notifyBtnSearchClick(that.inputStartDate.val() , that.inputEndDate.val());
        });

        this.btnReset.click(function () {
            that.notifyBtnResetClick();
        })
    },

    getSearchTimeStart : function(){
        return this.inputStartDate.val();
    },

    getSearchTimeEnd : function(){
        return this.inputEndDate.val();
    },

    notifyBtnSearchClick : function (start , end) {
        if(start == "" || end == "")
        {
            return false;
        }
        $(this).trigger("search-from-place" , [ start , end ]);
    },

    notifyBtnResetClick : function () {
        $(this).trigger("search-from-place-end");
    },


};