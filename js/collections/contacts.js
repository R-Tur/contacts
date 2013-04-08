define(['backbone','models/contact'], 
 function(Backbone, Model){
   return Backbone.Collection.extend({
     model: Model,
     url: "backend/contact.php",
   });
});
