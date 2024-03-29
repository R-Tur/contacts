define(['backbone', 'text!tpl/view.html'], function (Backbone, Tpl) {
	return Backbone.View.extend({
		el : "body",
		events : {
			'click a.contacts' : 'to_main',
			"click a.edit_contact" : "edit",
		},
		edit : function (e) {
			e.preventDefault();
			Backbone.history.loadUrl("edit/" + this.model.get('id'));
		},
		to_main : function (e) {
			e.preventDefault();
			Backbone.history.loadUrl("start");
		},
		initialize : function (m) {
			this.model = m;
			this.template = _.template(Tpl);
		},
		render : function () {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}
	});
});
