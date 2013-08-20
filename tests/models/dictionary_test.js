/* global describe: false, it: false, before: false */

var assert = require('assert'),
	Dictionary,
	dictionary,
	data;

global.Backbone = require('backbone');
global._ = require('underscore');

Dictionary = require('../../models/dictionary');

var dictionary = new Dictionary(),
	dataXml = [
		'"SOMEKEY"',
		'"SOME_OTHER_KEY"',
		'"SOMEKEY"',
		'"SOME_MORE_KEY"'
	],
	dataProperties = [
		'SOMEKEY=ghjghj',
		'SOME_OTHER_KEY=gfd',
		'SOMEKEY=',
		'SOME_MORE_KEY=sdfsd'
	],
	xmlFile = [
        '<term name="AUTHENTICATE_STATUS_1">Identifiant ou mot de passe incorrect</term>',
        '<term name="AUTHENTICATE_STATUS_2">Session expiré</term>',
        '<term name="AUTHENTICATE_STATUS_3">Compte désactivé</term>',
        '<term name="AUTHENTICATE_STATUS_4">Connexion refusée</term>',
        '<term name="AUTHENTICATE_STATUS_9">Erreur inconnue</term>',
        '<term name="AUTHENTICATE_STATUS_10">Compte suspendu</term>',
        '<term name="AUTHENTICATE_STATUS_11">Service en maintenance</term>'
	],
	propertiesFile = [
		"EasyWeb.view.dataroom.admin.wizard.steps.ContactsStep.FILE_NAME=Template_carnet_adresses.xls",
		"EasyWeb.view.dataroom.admin.wizard.steps.ContactsStep.UPLOAD_DESC=Une fois votre template complété, importez-le ici\u00A0:",
		"EasyWeb.view.dataroom.admin.wizard.steps.ContactsStep.IMPORT=Lancer l'importation",
		"EasyWeb.view.dataroom.admin.wizard.steps.ContactsStep.IMPORT_PHASE_UPLOAD=Envoi du fichier...",
		"EasyWeb.view.dataroom.admin.wizard.steps.ContactsStep.IMPORT_PHASE_TRT=Traitement du fichier...",
		"EasyWeb.view.dataroom.admin.wizard.steps.ContactsStep.IMPORT_FINISHED=Importation réussie"
	];

function arrayEqualXml(keys, expected) {
	return function() {
		var dataArray = dataXml.slice(0);
		var newArr = dictionary.removeKeysFromArray(dataArray, keys);
		assert.deepEqual(newArr, expected);
	};
}

function arrayEqualProperties(keys, expected) {
	return function() {
		var dataArray = dataProperties.slice(0);
		var newArr = dictionary.removeKeysFromArray(dataArray, keys);
		assert.deepEqual(newArr, expected);
	};
}

describe('Dictionary', function() {
	before(function() {

	}),
	describe('#removeKeysFromArray for xml file', function() {
		before(function() {
			dictionary.set('type', 'xml');
		});
		it('removes one key', arrayEqualXml(['SOME_OTHER_KEY'],
			[
				'"SOMEKEY"',
				'"SOMEKEY"',
				'"SOME_MORE_KEY"'
			]
		));
		it('removes several keys', arrayEqualXml(['SOME_OTHER_KEY', 'SOME_MORE_KEY'],
			[
				'"SOMEKEY"',
				'"SOMEKEY"'
			]
		));
		it('removes duplicate keys', arrayEqualXml(['SOMEKEY'],
			[
				'"SOME_OTHER_KEY"',
				'"SOME_MORE_KEY"'
			]
		));
		it('does not do anything when no keys are found', arrayEqualXml(['UNDEFINED_KEY'],
			dataXml
		));
		it('does not do anything when no keys are passed', arrayEqualXml([],
			dataXml
		));
	});
	describe('#removeKeysFromArray for properties file', function() {
		before(function() {
			dictionary.set('type', 'properties');
		});
		it('removes one key', arrayEqualProperties(['SOME_OTHER_KEY'],
			[
				'SOMEKEY=ghjghj',
				'SOMEKEY=',
				'SOME_MORE_KEY=sdfsd'
			]
		));
		it('removes several keys', arrayEqualProperties(['SOME_OTHER_KEY', 'SOME_MORE_KEY'],
			[
				'SOMEKEY=ghjghj',
				'SOMEKEY='
			]
		));
		it('removes duplicate keys', arrayEqualProperties(['SOMEKEY'],
			[
				'SOME_OTHER_KEY=gfd',
				'SOME_MORE_KEY=sdfsd'
			]
		));
		it('does not do anything when no keys are found', arrayEqualProperties(['UNDEFINED_KEY'],
			dataProperties
		));
		it('does not do anything when no keys are passed', arrayEqualProperties([],
			dataProperties
		));
	});
	describe('#valueForKeyArray for xml files', function() {
		before(function() {
			dictionary.set('type', 'xml');
		});
		it('returns the value for the key', function() {
			assert.deepEqual(dictionary.valueForKeyArray(xmlFile, 'AUTHENTICATE_STATUS_9'), 'Erreur inconnue');
		});
		it('returns nothing if the key is not found', function() {
			assert.deepEqual(dictionary.valueForKeyArray(xmlFile, 'UNDEFINEDKEY'), undefined);
		});
	});
	describe('#valueForKeyArray for properties files', function() {
		before(function() {
			dictionary.set('type', 'properties');
		});
		it('returns the value for the key', function() {
			assert.deepEqual(dictionary.valueForKeyArray(propertiesFile, 'EasyWeb.view.dataroom.admin.wizard.steps.ContactsStep.IMPORT_PHASE_TRT'), 'Traitement du fichier...');
		});
		it('returns nothing if the key is not found', function() {
			assert.deepEqual(dictionary.valueForKeyArray(propertiesFile, 'UNDEFINEDKEY'), undefined);
		});
	});
});