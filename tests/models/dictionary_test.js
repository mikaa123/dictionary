/* global describe: false, it: false, before: false */

var assert = require('assert'),
	Dictionary,
	DictionaryProperties,
	dictionary,
	data;

global.Backbone = require('backbone');
global._ = require('underscore');

DictionaryXML = require('../../models/dictionary_xml');
DictionaryProperties = require('../../models/dictionary_properties');

var dictionaryXML = new DictionaryXML(),
	dictionaryProperties = new DictionaryProperties(),
	dataXml = [
		'<term name="KEY1">val1</term>',
		'<term name="KEY2">val2</term>',
		'<term name="KEY1">val1</term>',
		'<term name="KEY3">val3</term>'
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
		var newArr = dictionaryXML.removeKeysFromArray(dataArray, keys);
		assert.deepEqual(newArr, expected);
	};
}

function arrayEqualProperties(keys, expected) {
	return function() {
		var dataArray = dataProperties.slice(0);
		var newArr = dictionaryProperties.removeKeysFromArray(dataArray, keys);
		assert.deepEqual(newArr, expected);
	};
}

describe('Dictionary', function() {
	describe('#removeKeysFromArray for xml file', function() {
		it('removes one key', arrayEqualXml(['KEY2'],
			[
				'<term name="KEY1">val1</term>',
				'<term name="KEY1">val1</term>',
				'<term name="KEY3">val3</term>'
			]
		));
		it('removes several keys', arrayEqualXml(['KEY2', 'KEY3'],
			[
				'<term name="KEY1">val1</term>',
				'<term name="KEY1">val1</term>'
			]
		));
		it('removes duplicate keys', arrayEqualXml(['KEY1'],
			[
				'<term name="KEY2">val2</term>',
				'<term name="KEY3">val3</term>'
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
		it('returns the value for the key', function() {
			assert.deepEqual(dictionaryXML.valueForKeyArray(xmlFile, 'AUTHENTICATE_STATUS_9'), 'Erreur inconnue');
		});
		it('returns nothing if the key is not found', function() {
			assert.deepEqual(dictionaryXML.valueForKeyArray(xmlFile, 'UNDEFINEDKEY'), undefined);
		});
	});
	describe('#valueForKeyArray for properties files', function() {
		it('returns the value for the key', function() {
			assert.deepEqual(dictionaryProperties.valueForKeyArray(propertiesFile, 'EasyWeb.view.dataroom.admin.wizard.steps.ContactsStep.IMPORT_PHASE_TRT'), 'Traitement du fichier...');
		});
		it('returns nothing if the key is not found', function() {
			assert.deepEqual(dictionaryProperties.valueForKeyArray(propertiesFile, 'UNDEFINEDKEY'), undefined);
		});
	});
});