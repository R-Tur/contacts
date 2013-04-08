define(['views/contacts', 'collections/contacts'],
	function (View, Collection) {
	var coll =  new Collection();
	var view = new View(coll);
	return function (global) {
		coll.fetch({
			success : function () {
				view.render();
			}
		});
	}
});
