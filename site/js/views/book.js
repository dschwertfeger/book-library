var app = app || {};

app.BookView = Backbone.View.extend({
  tagName: 'div',
  className: 'bookContainer',
  tempplate: Handlebars.compile( $('#bookTemplate'.hmtl() ) ),
  render: function() {
    // this.el is what we defined in tagName. use $el to get access to jQuery html() function.
    this.$el.html( this.tempplate( this.model.toJSON() ) );
    return this;
  }
});