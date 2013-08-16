var dictionaryScanner = require('dictionary_scanner');

global.$ = $;

window.ondragover = function (e) { e.preventDefault(); return false; };
window.ondrop = function (e) { e.preventDefault(); return false; };

$(document).ready(function() {
	var dictionaryDropzone = document.getElementById('dictionary-dropzone'),
		navigation = require('navigation').init('.no-set-welcome');

	dictionaryDropzone.addEventListener('dragover', function ( e ) {
		$(e.currentTarget).addClass('hover');
	}, false);

	dictionaryDropzone.addEventListener("dragleave", function ( e ) {
		$(e.currentTarget).removeClass('hover');
	}, false);

	dictionaryDropzone.addEventListener('drop', function ( e ) {
		e.preventDefault();

		for (var i = 0; i < e.dataTransfer.files.length; ++i) {
			console.log(e.dataTransfer.files[i].path);
		}

		$(e.currentTarget).removeClass('hover');
	}, false);
});