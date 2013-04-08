require.config({
    baseUrl: 'js/lib/',
    paths: {
        app: '../app',
		views: '../views',
		tpl: '../../tpl',
		models: '../models',
		controllers: '../controllers',
		collections: '../collections',
		'jquery': '//code.jquery.com/jquery-latest.min',
		'backbone': '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min',
		'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
		'text': '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.3/text'
    },
	shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    }
  }
});

require(['app/app'],
function   (App) {
  App.start();
});