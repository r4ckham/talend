var infoControl = {

    init : function(){
        var that = this;

        $(infoPanel).on("panel-template-ready" , function(){
            that.loadPanelInfos();
        });

        infoPanel.init();
    },

    loadPanelInfos : function () {
        let that = this;
        let form = {
            action : "load-panel-info",
        };
        $.post(ajaxUrl , form , function(data){
            if (data.status != 200){
                console.log(data.error);
                return false;
            }
            console.log(data);
            let user = data.user;
            let res = data.residences;
            let resUs = data.resUs;
            infoPanel.templateSelectResidence(that.constructTemplateSelect(res) , user , resUs.id_residence);

        } , "json");
    },


    constructTemplateSelect : function(residences){
        let template = "";
        $.each(residences , function () {
            template += '<option value="'+ this.id_residence+'">'+ this.nom_residence + '</option>';
        });
        return template;
    },
};