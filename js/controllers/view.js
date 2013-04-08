define(['views/view', 'models/contact', 'app/global'],
  function(View, Model,global){
    var model = global.models.contact = new Model();
    var view = global.views.view = new View(global.models.contact);
    return function(id) {
      model.set("id",id);
      model.fetch({success: function(data) { 
        view.render();
      }});
    }
 }
);
