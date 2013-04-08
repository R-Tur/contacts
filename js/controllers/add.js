define(['views/add', 'models/contact','app/global'],
  function(Add, Model, global){
    global.models.contact = new Model();
    global.views.add = new Add(global.models.contact);
    return function() {
      global.models.contact.clear();
      global.views.add.render();
    }
 }
);
