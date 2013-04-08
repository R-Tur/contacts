define(['views/view', 'models/contact'],
  function(View, Model){
    var model =  new Model();
    var view = new View(model);
    return function(id) {
      model.set("id",id);
      model.fetch({success: function(data) { 
        view.render();
      }});
    }
 }
);
