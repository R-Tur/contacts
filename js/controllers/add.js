define(['views/add', 'models/contact'],
	function (Add, Model) {
	var model = new Model();
	var view = new Add(model);
	return function () {
		model.clear();
		view.render();
	}
});
