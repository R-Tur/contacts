define(['views/edit', 'models/contact'],
	function (Edit, Model) {
	var model = new Model();
	var view =  new Edit(model);
	return function (id) {
		model.set("id", id);
		model.fetch({
			success : function (data) {
				view.render();
			}
		});
	}
});
