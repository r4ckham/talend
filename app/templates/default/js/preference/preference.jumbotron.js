var preferenceJumbotron = {

    init : function(container)
    {
        this.div = $("#" + container);
        this.render();
    },

    render : function()
    {
        let template = "";
        template += '<div class="container">\n' +
            '            <h1 class="text-center">Demandes</h1>\n' +
            '        </div>';
        this.div.html(template);
    },
};