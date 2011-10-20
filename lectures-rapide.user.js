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

	/*
	 * jSort - jQury sorting plugin
	 * http://do-web.com/jsort/overview
	 *
	 * Copyright 2011, Miriam Zusin
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 * http://do-web.com/jsort/license
	 */
 
	(function($){$.fn.jSort=function(options){var options=$.extend({sort_by:"p",item:"div",order:"asc",is_num:false,sort_by_attr:false,attr_name:""},options);return this.each(function(){var a=this,hndl=a,titles=[],i=0;$(a).find(options.item).each(function(){var a,b=$(this).find(options.sort_by);if(options.sort_by_attr)a=b.attr(options.attr_name).toLowerCase();else a=b.text().toLowerCase();titles.push([a,i]);$(this).attr("rel","sort"+i);i++});a.sortNum=function(a,b){return eval(a[0]-b[0])};a.sortABC=function(a,b){return a[0]>b[0]?1:-1};if(options.is_num)titles.sort(hndl.sortNum);else titles.sort(hndl.sortABC);if(options.order=="desc")if(options.is_num)titles.reverse(hndl.sortNum);else titles.reverse(hndl.sortABC);for(var t=0;t<titles.length;t++){var el=$(hndl).find(options.item+"[rel='sort"+titles[t][1]+"']");$(hndl).append(el)}})}})(jQuery);



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
	    // On soumet le formulaire avec <Entrée> dans le champ valeur
	    $('#valeur').removeAttr('onkeypress');
	    $('#valeur').keypress(function(e) {
		 if ( e.which == 13 ) {
		     e.preventDefault();
		     $('#noticebiblio dl input').last().click();
		 }
	    });

	    // Listener pour clic sur "Sélectionner cet élément" dans le plugin Decitre
	    document.getElementById('resultsContainer').addEventListener("DOMNodeInserted", function(event) {
		var targ = $(event.target);
		// 
		targ.find('input').click(function() {

		    // Date de publication -> Année seule
		    var datepub = $('#datepublication').val();
		    datepub = datepub.replace(/\d\d\/\d\d\/(\d\d\d\d)/, "$1");
		    $('#datepublication').val(datepub);

		    // Ajout URL Decitre
		    if ($(this).prev().find('img').attr('alt') == "Decitre") {
			var url_decitre = 'http://www.decitre.fr/livres/index.aspx/' + $('#ean').val();
			$('#urldecitre').val(url_decitre);
		    };

		    // Couverture de livres
		    var url_couv=$('#couverture').val();
		    if (url_couv != "") {
			window.open(url_couv,'Télécharger la couverture');  
		    }
		    
 		});
	    });

	}

	// Page de parcours des rubriques et items
	if ((path == '/lodel/edition/' || path == '/lodel/edition/index.php') && typeof(do_value) === "undefined") {
	    
	    // On monitore l'insertion d'items dans la liste
	    document.getElementById('listEntities').addEventListener("DOMNodeInserted", function(event) {
		var targ = $(event.target);

		// On inverse l'ordre de tri des entités
		targ.find('ul li').reverseOrder(); 

		// On trie les rédacteurs par ordre alphabétique
		targ.find('#childContainer3344 ul').first().jSort({
		    sort_by: '.titre_document',
		    item: 'li',
		    order: 'asc'
		});

	    });

	    

	}

    })(jQuery);
    
}

// load jQuery and execute the main function
addJQuery(main);


