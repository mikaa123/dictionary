/**
 * Base class for Table views.
 */
module.exports = Backbone.View.extend({
	tagName: 'table',
	className: 'table',

	/**
	 * Base class constructor. Subclasses should call it.
	 * A mediator object can be passed to the view for communication.
	 */
	initialize: function(options) {
		this.listenTo(this.collection, "add remove", this.render);
		this.mediator = this.options.mediator;
		this.render();
	},

	render: function() {
		if (!this.collection.length && this.emptyTemplate) {
			this.$el.html(this.emptyTemplate());
			return this;
		}
		
		this.$el.html(this.template());
		this.collection.each(function(model) {
			var tableElement = new this.ElementView({
				model: model,
				mediator: this.mediator
			});

			this.$('tbody').append(tableElement.el);
		}, this);
		return this;
	}
});