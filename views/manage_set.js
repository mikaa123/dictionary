var DictionaryListView = require('./dictionarylist/dictionarylist_view'),
	SetCollectionView = require('./setcollection/setcollection_view'),
	SetCollectionElementSelectView = require('./setcollection/setcollection_element_select_view'),
	Dictionaries = require('../collections/dictionaries'),
	MigrateKeyCollection = require('../collections/migratekeys'),
	MigrateCollectionView = require('./migratecollection/migratecollection_view'),
	DictionarySet = require('../models/dictionary_set'),
	async = require('async');

function migrationFeedbackMaker(options) {
	var html = function() {
		if (options.migrated) {
			return '<b>Well done!</b> You successfully ported ' + options.migrated + ' keys to ' + options.targets.join(',') + '.';
		} else {
			return '<b>Oh snap!</b> No keys were ported to ' + options.targets.join(',') + '.';
		}
	};

	return {
		execute: function($successAlert, $errorAlert) {
			if (options.migrated) {
				$alert = $successAlert;
			} else {
				$alert = $errorAlert;
			}

			$alert.html(html()).fadeIn(2000, function() {
				$alert.fadeOut(2000);
			});
		}
	};
}

function deleteFeedbackMaker(options) {
	var html = function() {
		if (options.deleted) {
			return '<b>Well done!</b> You deleted ' + options.deleted + ' keys.';
		} else {
			return '<b>Oh snap!</b> No keys were deleted';
		}
	};

	return {
		execute: function($successAlert, $errorAlert) {
			if (options.deleted) {
				$alert = $successAlert;
			} else {
				$alert = $errorAlert;
			}

			$alert.html(html()).fadeIn(2000, function() {
				$alert.fadeOut(2000);
			});
		}
	};
}

module.exports = Backbone.View.extend({
	initialize: function(options) {
		this.mediator = _.extend({}, Backbone.Events);
		this.currentSet = options.currentSet;
		this.dictionaryListView = new DictionaryListView({
			collection: this.currentSet.get('dictionaries')
		});

		this.setCollection = new Dictionaries(DICTIONARY.sets.filter(function(s) { return s !== DICTIONARY.current; }));
		this.setCollectionView = new SetCollectionView({
			collection: this.setCollection,
			template: _.template($('#setcollection-select-table-template').html()),
			ElementView: SetCollectionElementSelectView,
			mediator: this.mediator
		});

		this.migrateKeyCollection = new MigrateKeyCollection();
		this.migrateCollectionView = new MigrateCollectionView({
			collection: this.migrateKeyCollection
		});

		this.listenTo(this.mediator, 'feedback', function(feedback) {
			feedback.execute($('.success-feedback'), $('.error-feedback'));
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
		'click #migrate-modal-migrate': 'migrateKeys',
		'click #select-all': 'toggleAllDictionaries',
	},

	toggleAllDictionaries: function() {
		var checked = this.$('#select-all').is(':checked');
		this.currentSet.get('dictionaries').each(function(d) {
			d.set('selected', checked);
		});
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
			$button = $(e.currentTarget),
			that = this;

		$button.button('loading');
		async.reduce(selectedDictionaries, 0, function(memo, dictionary, callback) {
			dictionary.removeKeys(keys, function(keyRemoved) { 
				callback(null, memo + keyRemoved);
			});
		}, function(err, result) {
			$(e.currentTarget).button('complete');
			that.mediator.trigger('feedback', deleteFeedbackMaker({
				deleted: result
			}));
			setTimeout(function() {
				$(e.currentTarget).button('reset');
			}, 500);
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
			selectedSets = this.filterSelectedFrom(this.setCollection),
			that = this;

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

		this.$('#migrate-modal-migrate').button('loading');

		// Let's start by creating the current sub-set of dictionaries we'd like to merge into
		// the selected sets.
		currentSubSet = new DictionarySet({
			name: DICTIONARY.current.get('name'),
			dictionaries: new Dictionaries(this.filterSelectedFrom(this.dictionaryListView.collection))
		});

		// Now we can migrate each of the selected sets with the sub-set chose by the user.
		async.reduce(selectedSets, 0, function(totalMigrated, set, callback) {
			set.migrate(currentSubSet, that.migrateKeyCollection, function(migrated) {
				callback(null, totalMigrated + migrated);
			});
		}, function(err, result) {
			that.$('#migrate-modal-migrate').button('reset');
			that.migrateDialogClose();
			that.mediator.trigger('feedback', migrationFeedbackMaker({
				migrated: result,
				targets: selectedSets.map(function(set) {
					return set.get('name');
				})
			}));
		});
	},

	render: function() {
		this.$('h1').text(this.currentSet.get('name'));
		this.$('.dictionary-list').html(this.dictionaryListView.el);
		this.$('.set-list').html(this.setCollectionView.el);
		this.$('.migrate-collection').html(this.migrateCollectionView.el);
	}
});