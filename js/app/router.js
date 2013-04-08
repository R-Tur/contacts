define(['backbone', 'controllers/contacts', 'controllers/view', 'controllers/edit', 'controllers/add'],
  function(Backbone, Contacts, View, Edit, Add){
    return Backbone.Router.extend({
      initialize: function(){},
      routes: {
        "start": "start",
		"edit/:id": "edit",
		"view/:id": "view",
		"add": "add"
      },
      start: function () {
	    Contacts();
      },
	  edit: function(id){
	    Edit(id);
	  },
	  view: function(id){
	    View(id);
	  },
	  add: function(){
	    Add();
	  }
    });
  }
);