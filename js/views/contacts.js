define(['backbone', 'text!tpl/contacts.html'], function (Backbone, Tpl) {
	return Backbone.View.extend({
		el : "body",
		events : {
			"click a.edit" : "edit",
			"click .view" : "view",
			"click a.add_contact" : "add",
		},
		edit : function (e) {
			e.preventDefault();
			var id = $(e.currentTarget).closest(".name").data("id");
			Backbone.history.loadUrl("edit/" + id);
		},
		add : function (e) {
			e.preventDefault();
			Backbone.history.loadUrl("add");
		},
		view : function (e) {
			e.preventDefault();
			var id = $(e.currentTarget).closest(".name").data("id");
			Backbone.history.loadUrl("view/" + id);
		},
		initialize : function (collection) {
			this.collection = collection;
			this.template = _.template(Tpl);
		},
		render : function () {
			$(this.el).html(this.template({
					items : this.collection.toJSON()
				}));
			return this;
		}
	});
});
