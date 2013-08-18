// In order to use backbone in node modules, we need to tell the interpreter
// that it's a global variable.
global._ = _;
global.Backbone = Backbone;
global.$ = $;

// App's namespace.
global.DICTIONARY = {};

window.ondragover = function(e) { e.preventDefault(); return false; };
window.ondrop = function(e) { e.preventDefault(); return false; };

$(document).ready(function() {
	var AppRouter = require('./routers/router');
		router = new AppRouter(),
		Sets = require('./collections/sets');

	Backbone.history.start();
	router.navigate('createSet', { trigger: true });

	global.DICTIONARY.sets = new Sets();
	global.DICTIONARY.router = router;
});