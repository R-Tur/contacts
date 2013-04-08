define(['backbone'],
function(Backbone){
  return Backbone.Model.extend({
    urlRoot: "backend/contact.php",
    url: function(){
      return this.urlRoot+"?id="+this.id;
    },
    initialize: function(){
    }
  });
}
);
