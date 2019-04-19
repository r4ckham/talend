var adminControl = {

    init : function(container)
    {
        let that = this;
        this.div = $("#" + container);
        this.render();

    },


    render : function()
    {
        let template = "";
        template += ''+

        '<div id="pref-main-row" class="nav-tabs-custom">\n' +
        '            <ul class="nav nav-tabs container-fluid" role = "tablist">\n' +
        '              <li class="nav-item active"><a id="a-tab1" href="#tab_1" data-toggle="tab" aria-expanded="false">Nouvelle Demande</a></li>\n' +
        '              <li class="nav-item"><a href="#tab_2" data-toggle="tab" aria-expanded="false">Utilisateurs</a></li>\n' +
        '            </ul>\n' +
        '            <div class="tab-content">\n' +
        '              <div class="tab-pane fade in active" id="tab_1">\n' +
        '                  <div id="admin-user-new"></div>  '+
        '              </div>\n' +
        '              <!-- /.tab-pane -->\n' +
        '              <div class="tab-pane" id="tab_2">\n' +
        '                    <div id="admin-user-all" style="z-index: 99999"></div>'+
        '              </div>\n' +
        '              <!-- /.tab-pane -->\n' +
        '            </div>\n' +
        '            <!-- /.tab-content -->\n' +
        '          </div>'

        this.div.html(template);

        adminUserNew.init("admin-user-new");
        adminUserAll.init("admin-user-all");
    },

};