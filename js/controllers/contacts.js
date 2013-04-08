define(['views/contacts', 'collections/contacts', 'app/global'],
  function(View, Collection,global){
    var coll = global.collections.contacts = new Collection();
    var view = global.views.contacts = new View(global.collections.contacts);
    return function(global) {
      coll.fetch({success: function(){
        view.render();
      }});
    }
 }
);
