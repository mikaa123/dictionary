var NavigationSetCollectionElementView = Backbone.View.extend({
	tagName: 'li',
	template: _.template('<a href="#"><%= name %></a>'),

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.render();
	},

	events: {
		'click a': 'navigate'
	},

	navigate: function() {
		DICTIONARY.current = this.model;
		DICTIONARY.router.navigate('set', { trigger: true });
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
		if (!options.router) throw 'You need to pass the router.';

		this.setCollection = options.setCollection;
		this.navigationSetCollectionView = new NavigationSetCollectionView({
			collection: this.setCollection,
			el: this.$('.sets-list')[0]
		});

		this.router = options.router;
		this.listenTo(this.router, 'route', _.bind(function(route) {
			this.$('.nav li').removeClass('active');
			switch(route) {
				case 'createSet':
					this.$('#create-set-nav').addClass('active');
					break;
				case 'sets':
					this.$('#manage-sets-nav').addClass('active');
					break;
				case 'set':
					this.$('#set-nav').addClass('active');
					break;
			}
		}, this));
		this.listenTo(this.setCollection, 'add remove', _.bind(function() {
			this.render();
		}, this));
		this.render();
	},

	events: {
		'click .nav li': 'navigate'
	},

	navigate: function(e) {
		var $clicked = $(e.currentTarget);

		switch($clicked.attr('id')) {
			case 'create-set-nav':
				this.router.navigate('createSet', { trigger: true });
				break;
			case 'manage-sets-nav':
				this.router.navigate('sets', { trigger: true });
				break;
		}
	},

	render: function() {
		this.$('.sets').html(this.navigationSetCollectionView.el);
		this.setCollection.length ? this.$('#set-nav').show() : this.$('#set-nav').hide();
	}
});

module.exports = NavigationView;