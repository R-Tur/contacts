define(['backbone', 'text!tpl/add.html'], function (Backbone, Tpl) {
	return Backbone.View.extend({
		el : "body",
		events : {
			'click a.contacts' : 'to_main',
			'submit #add_contact_form' : 'save_contact'
		},
		to_main : function (e) {
			e.preventDefault();
			Backbone.history.loadUrl("start");
		},
		save_contact : function (e) {
			e.preventDefault();
			var th_ = this;
			var form = $(e.target).serializeArray();
			_.each(form, function (item) {
				th_.model.set(item.name, item.value);
			});
			this.model.save();
			Backbone.history.loadUrl("start");
			return false;
		},
		initialize : function (m) {
			this.model = m;
			this.template = _.template(Tpl);
		},
		render : function () {
			$(this.el).html(this.template());
			return this;
		}
	});
});
