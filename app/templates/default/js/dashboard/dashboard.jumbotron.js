var dashboardJumbotron = {

    init : function(container)
    {
        this.div = $("#" + container);
        this.render();
    },

    render : function()
    {
        let template = "";
        template += '<div class="container">\n' +
            '            <h1 class="text-center">Accueil</h1>\n' +
            '            <p class="text-center">Bon retour sur monPetitParking.fr </p>\n' +
            '        </div>';
        this.div.html(template);
    },
};