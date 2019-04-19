var dashboardNavigation = {

    init : function(container)
    {
        this.div = $("#" + container);
        this.render();
    },

    render : function()
    {
        let template = "";
        template += '<div id="dashboard-row-nav" class="" style="margin-bottom: 20px;">\n' +
            '                <div id="dashboard-row-zoom" class="row" style="margin: auto;">\n' +
            '                    <button id="zoom-in" class="btn btn-primary col-xs-4" style="border-top-right-radius : 0px;border-bottom-right-radius : 0px">\n' +
            '                        <i class="fas fa-search-plus"></i>\n' +
            '                    </button>\n' +
            '                    <button id="zoom-out" class="btn btn-primary col-xs-4" style="border-radius: 0px">\n' +
            '                        <i class="fas fa-search-minus"></i>\n' +
            '                    </button>\n' +
            '                    <button id="reset" class="btn btn-success col-xs-4" style="border-top-left-radius : 0px;border-bottom-left-radius : 0px">\n' +
            '                        <i class="fas fa-broom"></i>\n' +
            '                    </button>\n' +
            '                </div>\n' +
            '\n' +
            '            </div>';


        this.div.html(template);

    },

};