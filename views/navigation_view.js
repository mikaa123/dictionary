var NavigationSetCollectionElementView = Backbone.View.extend({
	tagName: 'li',
	template: _.template('<a href="#"><%= name %></a>'),

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});

var NavigationSetCollectionView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "add", this.render);
	},

	render: function() {
		this.$el.html('');
		this.collection.each(function(model) {
			var elementView = new NavigationSetCollectionElementView({
				model: model
			});

			this.$el.append(elementView.el);
		}, this);
		return this;
	}
});

var NavigationView = Backbone.View.extend({
	initialize: function(options) {
		if (!options.setCollection) throw 'You need to pass a collection (setCollection).';
		this.setCollection = options.setCollection;
		this.navigationSetCollectionView = new NavigationSetCollectionView({
			collection: this.setCollection,
			el: this.$('.sets-list')[0]
		});
	},

	render: function() {
		this.$('.sets').html(this.navigationSetCollectionView.el);
	}
});

module.exports = NavigationView;