var jade = require('jade');

global.$ = $;

window.ondragover = function (e) { e.preventDefault(); return false; };
window.ondrop = function (e) { e.preventDefault(); return false; };

// Template engine
var dropFileView = jade.compile([
	'ul',
    '	- each file in files',
    '		li #{file.path}'
].join('\n'));

$(document).ready(function() {
	var dictionaryDropzone = document.getElementById('dropzone'),
		navigation = require('navigation').init('.no-set-welcome');

	dictionaryDropzone.addEventListener('dragover', function ( e ) {
		$(e.currentTarget).addClass('hover');
	}, false);

	dictionaryDropzone.addEventListener("dragleave", function ( e ) {
		$(e.currentTarget).removeClass('hover');
	}, false);

	dictionaryDropzone.addEventListener('drop', function ( e ) {
		e.preventDefault();

		$('#file-list').html(dropFileView({
			files: e.dataTransfer.files
		}));

		// for (var i = 0; i < e.dataTransfer.files.length; ++i) {
		// 	console.log(e.dataTransfer.files[i].path);
		// }

		$(e.currentTarget).removeClass('hover');
	}, false);
});