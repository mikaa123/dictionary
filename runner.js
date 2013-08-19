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
		Sets = require('./collections/sets');

	global.DICTIONARY.sets = new Sets();
	global.DICTIONARY.router = new AppRouter();

	Backbone.history.start();

	if (localStorage.sets) {
		global.DICTIONARY.sets.addFromJSON(JSON.parse(localStorage.sets));
		global.DICTIONARY.router.navigate('sets', { trigger: true });
	} else {
		global.DICTIONARY.router.navigate('createSet', { trigger: true });
	}

	global.DICTIONARY.sets.on('add', function() {
		localStorage.sets = JSON.stringify(global.DICTIONARY.sets.toJSON());
	});
	global.DICTIONARY.sets.on('remove', function() {
		localStorage.sets = JSON.stringify(global.DICTIONARY.sets.toJSON());
	});
});