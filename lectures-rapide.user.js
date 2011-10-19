// ==UserScript==
// @id             lectures-rapide
// @name           Lectures rapide
// @version        0.1
// @namespace      lectures-rapides
// @author         Julien Barnier
// @description    Améliorations de l'interface d'édition de Lectures
// @match          http://lectures.revues.org/lodel/edition/*
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
// http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


function main() {

    // Prévention conflit jQuery/mootools
    // http://davidwalsh.name/jquery-mootools
    jQuery.noConflict();
    (function($) {

	// Tiré du plugin jQuery reverseOrder
	$.fn.reverseOrder = function() {
	    return this.each(function() {
		$(this).prependTo( $(this).parent() );
	    });
	};
	
	// Affichage info bas de page
	$('body').append('<div id="lectures-rapide-info">Lectures-rapide actif</div>');
	$('style').first().append('<style type="text/css"> #lectures-rapide-info { position:fixed; bottom:0px; right:0px; background-color:rgba(200,0,0,0.7); color:white; padding:4px 8px; border-top-left-radius:6px; font-size: 9px;} </style>');
	
	// Lecture paramètres url
	var url_params = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            url_params.push(hash[0]);
            url_params[hash[0]] = hash[1];
	}
	var do_value = url_params['do'];
	var path = window.location.pathname;
	
	
	// Replier la liste des rubriques sur la fenêtre "Déplacer"
	if (path == '/lodel/edition/index.php' && do_value == 'preparemove') {
	    $('#move li:not(:has(a))').hide();
	}

	// Formulaire d'ajout de notice
	if (path == '/lodel/edition/index.php' && do_value == 'view') {
	    // @ISBN par défaut
	    $('#type1').removeAttr('checked');
	    $('#type2').attr('checked', 'checked');
	    // Decitre coché par défaut
	    $('#fournisseur_decitre').attr('checked', 'checked');
	    // Focus sur 'valeur'
	    $('#valeur').focus();
	    
	}

	// Formulaire d'ajout de notice
	if (path == '/lodel/edition/index.php' && typeof(do_value) === "undefined") {
	    document.getElementById('listEntities').addEventListener("DOMNodeInserted", function(event) {
		var targ = $(event.target);
		targ.find('ul li').reverseOrder(); 
	    });
	}

    })(jQuery);
    
}

// load jQuery and execute the main function
addJQuery(main);


