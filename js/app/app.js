define(['backbone','app/router'],
  function(Backbone, Router){
    return {
	  start: function(){
	    this.router = new Router();
        Backbone.history.start({pushState: true, hashChange: false, root: "/contacts/"});
		Backbone.history.loadUrl("start");
      }
    };
  }
);