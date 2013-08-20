var DictionaryListView = require('./dictionarylist/dictionarylist_view'),
	SetCollectionView = require('./setcollection/setcollection_view'),
	SetCollectionElementSelectView = require('./setcollection/setcollection_element_select_view'),
	Dictionaries = require('../collections/dictionaries'),
	MigrateKeyCollection = require('../collections/migratekeys'),
	MigrateCollectionView = require('./migratecollection/migratecollection_view'),
	DictionarySet = require('../models/dictionary_set');

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

		this.migrateKeyCollection = new MigrateKeyCollection();
		this.migrateCollectionView = new MigrateCollectionView({
			collection: this.migrateKeyCollection
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
		return _.uniq(_.compact(this.$('#keys').val().replace(/\s+/g, '').split(';')));
	},

	filterSelectedFrom: function(collection) {
		return collection.filter(function(d) {
			return d.get('selected');
		});
	},

	deleteKeys: function(e) {
		var keys = this.keysFromPrompt(),
			selectedDictionaries = this.filterSelectedFrom(this.dictionaryListView.collection),
			$button = $(e.currentTarget);

		$button.button('loading');
		_.each(selectedDictionaries, function(dictionary) {
			dictionary.removeKeys(keys, function() {
				$(e.currentTarget).button('complete');
				setTimeout(function() {
					$(e.currentTarget).button('reset');
				}, 500);
			});
		});
	},

	// when the link is called
	migrateDialogOpen: function() {
		var keys = this.keysFromPrompt();

		_.each(keys, function(key) {
			this.migrateKeyCollection.add({ oldKey: key });
		}, this);

		this.$('#migrate-modal').modal('show');
	},

	// when the close button is pressed
	migrateDialogClose: function () {
		this.migrateKeyCollection.reset();
		this.$('#migrate-modal').modal('hide');
	},

	// when the migrate button is called.
	migrateKeys: function() {
		var keys,

			// The selected dictionaries in the current set.
			currentSubSet,

			// The sets we want to migrate the current sub-set to.
			selectedSets = this.filterSelectedFrom(this.setCollection);

		this.$('.newkey-input').each(function(input) {
			if (!$(this).val()) {
				$(this).parent().addClass('has-error');
			} else {
				$(this).parent().removeClass('has-error');
			}
		});

		if (this.$('.has-error').length) {
			return;
		}

		// Let's start by creating the current sub-set of dictionaries we'd like to merge into
		// the selected sets.
		currentSubSet = new DictionarySet({
			name: DICTIONARY.current.get('name'),
			dictionaries: this.filterSelectedFrom(this.dictionaryListView.collection)
		});

		// Now we can migrate each of the selected sets with the sub-set chose by the user.
		_.each(selectedSets, function(set) {
			set.migrate(currentSubSet, this.migrateKeyCollection, function() {
				// Probably do some button state business here.
				console.log('DONE.');
			});
		}, this);
	},

	render: function() {
		this.$('.dictionary-list').html(this.dictionaryListView.el);
		this.$('.set-list').html(this.setCollectionView.el);
		this.$('.migrate-collection').html(this.migrateCollectionView.el);
	}
});