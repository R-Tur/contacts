define(['views/edit', 'models/contact', 'app/global'],
  function(Edit, Model,global){
    var model = global.models.contact = new Model();
	var edit = global.views.edit = new Edit(global.models.contact);
    return function(id) {
	  model.set("id",id);
	  model.fetch({success: function(data) { 
	    edit.render();
	  }});
  }
 }
);