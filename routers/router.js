var DropZoneView = require('../views/dropzone_view'),
	DictionaryCollection = require('../collections/dictionaries'),
	Dictionary = require('../models/dictionary');

module.exports = Backbone.Router.extend({

	routes: {
		'sets': 'sets',
		'set': 'set',
		'sets/new': 'createSet'
	},

	createSet: function() {
		var dictionaries = new DictionaryCollection();
		var dropzoneView = new DropZoneView({
			collection: dictionaries
		});

		$('.create-set').html(dropzoneView.el);

		dictionaries.add([{
			lang: 'French',
			type: 'xml'
		}]);
	}
});