var DictionaryListView = require('./dictionarylist/dictionarylist_view'),
	SetCollectionView = require('./setcollection/setcollection_view'),
	SetCollectionElementSelectView = require('./setcollection/setcollection_element_select_view'),
	Dictionaries = require('../collections/dictionaries');

module.exports = Backbone.View.extend({
	initialize: function(options) {
		this.dictionaryListView = new DictionaryListView({
			collection: options.dictionaries
		});

		this.setCollection = new Dictionaries(DICTIONARY.sets.filter(function(s) { return s !== DICTIONARY.current; }));
		this.setCollectionView = new SetCollectionView({
			collection: this.setCollection,
			template: _.template($('#setcollection-select-table-template').html()),
			ElementView: SetCollectionElementSelectView
		});

		this.render();
		this.disableBtns(true);
		this.$('#keys').val('');
	},

	disableBtns: function(b) {
		if (b) {
			this.$('#migrate-keys').attr('disabled', 'disabled');
			this.$('#delete-keys').attr('disabled', 'disabled');
		} else {
			this.$('#migrate-keys').removeAttr('disabled');
			this.$('#delete-keys').removeAttr('disabled');
		}
	},

	events: {
		'keyup #keys': 'keyTyped',
		'click a#delete-keys': 'deleteKeys',
		'click a#migrate-keys': 'migrateDialogOpen',
		'click #migrate-modal-close': 'migrateDialogClose',
		'click #migrate-modal-migrate': 'migrateKeys'
	},

	keyTyped: function() {
		if (this.$('#keys').val()) {
			this.disableBtns(false);
		} else {
			this.disableBtns(true);
		}
	},

	keysFromPrompt: function() {
		return _.compact(this.$('#keys').val().replace(/\s+/g, '').split(';'));
	},

	filterSelectedFrom: function(collection) {
		return collection.filter(function(d) {
			return d.get('selected');
		});
	},

	deleteKeys: function() {
		var keys = this.keysFromPrompt(),
			selectedDictionaries = this.filterSelectedFrom(this.dictionaryListView.collection);

		_.each(selectedDictionaries, function(dictionary) {
			dictionary.removeKeys(keys, function() {
				console.log("DONE.");
			});
		});
	},

	// when the link is called
	migrateDialogOpen: function() {
		this.$('#migrate-modal').modal('show');

		// should create as many inputs as there are keys.
		// the inputs will have the old key name as placeholder
		// input field (together with the label) will be a template
	},

	// when the close button is pressed
	migrateDialogClose: function () {
		this.$('#migrate-modal').modal('hide');
	},

	// when the migrate button is called.
	migrateKeys: function() {
		var keys,
			selectedSets = this.filterSelectedFrom(this.setCollection);

	},

	render: function() {
		this.$('.dictionary-list').html(this.dictionaryListView.el);
		this.$('.set-list').html(this.setCollectionView.el);
	}
});