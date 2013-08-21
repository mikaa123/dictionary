var Dictionary = require('./dictionary'),
	DictionaryXML = require('./dictionary_xml'),
	DictionaryProperties = require('./dictionary_properties');

module.exports = function(opts) {
	var type = opts.type,
		dictionary;

	if (!type) {
		throw 'No type option.';
	}

	delete opts.type;

	switch(type) {
		case 'xml':
			dictionary = new DictionaryXML(opts);
			break;
		case 'properties':
			dictionary = new DictionaryProperties(opts);
			break;
	}

	return dictionary;
};