var SetCollectionView = require('./setcollection/setcollection_view');

/**
 * Creates a new mediator object.
 * A mediator (http://addyosmani.com/resources/essentialjsdesignpatterns/book/#mediatorpatternjavascript)
 * Helps decouple the components by providing a communication channel for events.
 * @return {Backbone.Events}
 */
var mediatorFactory = function() {
	return _.extend({}, Backbone.Events);
};

module.exports = Backbone.View.extend({
	initialize: function() {
		this.mediator = mediatorFactory();
		this.setCollectionView = new SetCollectionView({
			collection: DICTIONARY.sets,
			mediator: this.mediator
		});

		this.listenTo(this.mediator, 'removeIntention', _.bind(function(item) {
			this.$('.modal .set-name').text(item.model.get('name'));
			this.$('.modal').modal('show');
			this.selectedItem = item;
		}, this));

		this.render();
	},

	events: {
		'click #add-set': 'addSet',
		'click #confirmation-delete': 'deleteSelectedItem',
		'click #confirmation-close': 'closeModal'

	},

	closeModal: function() {
		this.$('.modal').modal('hide');
	},

	deleteSelectedItem: function() {
		this.selectedItem && this.selectedItem.removeElement();
		debugger;
		this.closeModal();
	},

	addSet: function() {
		DICTIONARY.router.navigate('createSet', {
			trigger: true
		});
	},

	render: function() {
		this.$('.set-list').html(this.setCollectionView.el);
	}
});