// ==UserScript==
// @id             lectures-rapide
// @name           Lectures rapide
// @version        0.1.11
// @namespace      lectures-rapides
// @author         Julien Barnier
// @description    Améliorations de l'interface d'édition de Lectures
// @grant          none
// @match          https://journals.openedition.org/lectures/lodel/edition/*
// @noframes
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
// http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
	script.addEventListener('load', function () {
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
	(function ($) {

		/*
		 * jSort - jQury sorting plugin
		 * http://do-web.com/jsort/overview
		 *	 * Copyright 2011, Miriam Zusin
		 * Dual licensed under the MIT or GPL Version 2 licenses.
		 * http://do-web.com/jsort/license
		 */

		(function ($) { $.fn.jSort = function (options) { var options = $.extend({ sort_by: "p", item: "div", order: "asc", is_num: false, sort_by_attr: false, attr_name: "" }, options); return this.each(function () { var a = this, hndl = a, titles = [], i = 0; $(a).find(options.item).each(function () { var a, b = $(this).find(options.sort_by); if (options.sort_by_attr) a = b.attr(options.attr_name).prototype.toLowerCase(); else a = b.text().prototype.toLowerCase(); titles.push([a, i]); $(this).attr("rel", "sort" + i); i++; }); a.sortNum = function (a, b) { return eval(a[0] - b[0]); }; a.sortABC = function (a, b) { return a[0] > b[0] ? 1 : -1; }; if (options.is_num) titles.sort(hndl.sortNum); else titles.sort(hndl.sortABC); if (options.order == "desc") if (options.is_num) titles.reverse(hndl.sortNum); else titles.reverse(hndl.sortABC); for (var t = 0; t < titles.length; t++) { var el = $(hndl).find(options.item + "[rel='sort" + titles[t][1] + "']"); $(hndl).append(el); } }); }; })(jQuery);



		// Tiré du plugin jQuery reverseOrder
		$.fn.reverseOrder = function () {
			return this.each(function () {
				$(this).prependTo($(this).parent());
			});
		};

		// Affichage info bas de page
		$('body').append('<div id="lectures-rapide-info">Lectures-rapide actif</div>');
		$('head').append('<style type="text/css"> #lectures-rapide-info { position:fixed; bottom:0px; right:0px; background-color:rgba(200,0,0,0.8); color:white; padding:4px 8px; border-top-left-radius:6px; font-size: 9px;} </style>');
		$('head').append('<style type="text/css"> .lectures-rapide-nav { margin: 8px 0px 2px 55px; font-size: 90%; } .lectures-rapide-nav a {color: #999; } </style>');
		$('head').append('<style type="text/css"> #lodel-container input, #lodel-container select { color: #333; } </style>');
		$('head').append('<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/ui-lightness/jquery-ui.css" />');

		// Affichage popup raccourcis
		var str = '<div id="lectures-rapide-shortcuts">';
		str += '<h2><span class="togg">↑</span> Raccourcis</h2>';
		str += '<div id="lectures-rapide-shortcuts-content">';
		str += '<ul>';
		str += '<li><a href="https://journals.openedition.org/lectures/lodel/edition/oochargement.php?idparent=23969&idtype=69">Nouveau compte rendu 2018</a></li>';
		str += '<li><a href="https://journals.openedition.org/lectures/lodel/edition/oochargement.php?idparent=23968&idtype=70">Nouvelle note critique 2018</a></li>';
		str += '<li><a href="https://journals.openedition.org/lectures/lodel/edition/index.php?do=view&idparent=23974&idtype=98">Nouvelle notice de livre 2018</a></li>';
		str += '<li><a href="https://journals.openedition.org/lectures/lodel/edition/index.php?do=view&idparent=23974&idtype=100">Nouvelle notice de revue 2018</a></li>';
		str += '<li><a href="https://journals.openedition.org/lectures/lodel/edition/index.php?do=view&idparent=23974&idtype=101">Nouvelle notice de film 2018</a></li>';
		str += '</ul>';
		str += '<ul>';
		str += '<li><a href="https://journals.openedition.org/lectures/lodel/edition/oochargement.php?idparent=21975&idtype=69">Nouveau compte rendu 2017</a></li>';
		str += '<li><a href="https://journals.openedition.org/lectures/lodel/edition/oochargement.php?idparent=21974&idtype=70">Nouvelle note critique 2017</a></li>';
		str += '<li><a href="https://journals.openedition.org/lectures/lodel/edition/index.php?do=view&idparent=21980&idtype=98">Nouvelle notice de livre 2017</a></li>';
		str += '<li><a href="https://journals.openedition.org/lectures/lodel/edition/index.php?do=view&idparent=21980&idtype=100">Nouvelle notice de revue 2017</a></li>';
		str += '<li><a href="https://journals.openedition.org/lectures/lodel/edition/index.php?do=view&idparent=21980&idtype=101">Nouvelle notice de film 2017</a></li>';
		str += '</ul>';
		str += '<ul>';
		str += '<li><a href="https://journals.openedition.org/lectures/lodel/edition/oochargement.php?idparent=1438&idtype=68">Nouvelle actualité</a></li>';
		str += '<li><a href="https://journals.openedition.org/lectures/lodel/edition/index.php?do=view&idparent=3344&idtype=82">Nouvelle notice biographique de rédacteur</a></li>';
		str += '</ul>';
		str += '<ul>';
		str += '<li><a href="https://journals.openedition.org/lectures/lodel/edition/index.php?id=23974">Liste des publications reçues en 2018</a></li>';
		str += '<li><a href="https://journals.openedition.org/lectures/lodel/edition/index.php?id=21980">Liste des publications reçues en 2017</a></li>';
		str += '<li><a href="https://journals.openedition.org/lectures/lodel/edition/index.php?id=1429">Liste des comptes rendus à paraître</a></li>';
		str += '</ul>';

		str += '</div>';
		str += '</div>';
		$('body').append(str);

		str = '<style type="text/css">';
		str += '#lectures-rapide-shortcuts h2 { display: inline; float: right;background-color:rgba(0,0,0,0.8); color:white; padding:4px 8px; margin: 0px;border-top-left-radius:6px; border-top-right-radius: 6px; font-size: 9px; cursor: pointer; z-index: 1000; font-weight: bold;}';
		str += '#lectures-rapide-shortcuts { position:fixed; bottom:0px; right:130px; padding: 0px; margin: 0px; font-size: 9px; z-index: 1000;}';
		str += '#lectures-rapide-shortcuts-content { clear: both; padding: 4px 12px 4px 8px; margin: 0px; border-top-left-radius:6px; background-color:rgba(0,0,0,0.8);color: white; }';
		str += '#lectures-rapide-shortcuts a { color: white; }';
		str += '#lectures-rapide-shortcuts a:hover { text-decoration: underline; }';
		str += '#lectures-rapide-shortcuts ul { clear: both; list-style-type: square; padding-left: 20px; line-height: 14px; }';
		str += '</style>';
		$('head').append(str);

		var sh_height = $('#lectures-rapide-shortcuts-content').outerHeight();
		$('#lectures-rapide-shortcuts').css('bottom', -1 * sh_height);
		$('#lectures-rapide-shortcuts h2').toggle(function () {
			$('#lectures-rapide-shortcuts').animate({ bottom: '+=' + sh_height }, 200);
			$('#lectures-rapide-shortcuts .togg').text('↓');
		}, function () {
			$('#lectures-rapide-shortcuts').animate({ bottom: '-=' + sh_height }, 200);
			$('#lectures-rapide-shortcuts .togg').text('↑');
		}
		);


		// Lecture paramètres url
		var url_params = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			url_params.push(hash[0]);
			url_params[hash[0]] = hash[1];
		}
		var do_value = url_params['do'];
		var path = window.location.pathname;

		// Replier la liste des rubriques sur la fenêtre "Déplacer"
		//if (path == '/lodel/edition/index.php' && do_value == 'preparemove') {
		//$('#move li:not(:has(a))').hide();
		//}

		// Inverser les items sur la fenêtre "sélectionner/retirer des entités"
		//if (path == '/lodel/edition/entitybrowser.php') {
		//	$('.listentities .listentities li').reverseOrder();
		//}

		// Formulaire d'ajout de notice
		if (path == '/lectures/lodel/edition/index.php' && do_value == 'view') {
			// @ISBN par défaut
			$('#type1').removeAttr('checked');
			$('#type2').attr('checked', 'checked');
			// Decitre coché par défaut
			$('#fournisseur_decitre').attr('checked', 'checked');
			// Focus sur 'valeur'
			$('#valeur').focus();
			// On soumet le formulaire avec <Entrée> dans le champ valeur
			// $('#valeur').removeAttr('onkeypress');
			// $('#valeur').keypress(function(e) {
			//  	 if ( e.which == 13 ) {
			//  	     e.preventDefault();
			//  	     $('#noticebiblio dl input').last().click();
			//  	 }
			// });

			// Autocomplétion pour saisie entités

			// Listener pour clic sur "Sélectionner cet élément" dans le plugin Decitre

			if ($('#resultsContainer').length) {
				$('#resultsContainer').bind("DOMNodeInserted", function (event) {
					var targ = $(event.target);
					targ.find('input').click(function () {

						// Date de publication -> Année seule
						var datepub = $('#datepublication').val();
						datepub = datepub.replace(/\d\d\/\d\d\/(\d\d\d\d)/, "$1");
						$('#datepublication').val(datepub);

						// Ajout URL Decitre
						// PLUS NECESSAIRE depuis la nouvelle version du plugin
						// if ($(this).prev().find('img').attr('alt') == "Decitre") {
						//     var url_decitre = 'http://www.decitre.fr/livres/index.aspx/' + $('#ean').val();
						//     $('#urldecitre').val(url_decitre);
						// };

						// Couverture de livres
						var url_couv = $('#couverture').val();
						if (url_couv != "") {
							window.open(url_couv, 'Télécharger la couverture');
						}

					});
				});
			};

			// Chargement jquery-ui
			$.getScript("https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js",
				function () {
					// Pour chaque zone de sélection multiple
					$('.entrieseditionarea').each(function () {
						var type = $(this).attr('id').replace('entries_', '');
						var hidden_input_id = $(this).find('input[id^="entries["]').first().attr('id');
						// insertion input recherche
						var input_id = 'saisielibre_' + type;
						var input_elem = '<p>Recherche : <input type="text" size="30" id="' + input_id + '" /></p>';
						$(input_elem).insertBefore($(this));
						var input = $('#' + input_id);
						// création liste valeurs pour autocomplétion
						var source = [];
						$('#pool_candidats_' + type).find('option').each(function () { source.push($(this).text()); });
						input.autocomplete({ source: source });
						// touche entrée
						input.keypress(function (e) {
							if (e.which == 13) {
								e.preventDefault();
								var str = $(this).val();
								// si la valeur saisie est dans les valeurs possibles
								if ($.inArray(str, source) == -1) {
									alert("La valeur '" + str + "' n'existe pas.\nUtilisez le bouton 'Ajouter' si vous voulez la créer.");
								} else {
									var membres = [];
									$('#pool_member_' + type).find('option').each(function () { membres.push($(this).text()); });
									// si la valeur saisie a déjà été ajoutée
									if ($.inArray(str, membres) == -1) {
										$('#pool_member_' + type).append('<option value="' + str + '">' + str + '</option>');
										$(this).val('');
										updatetxt(hidden_input_id, 'pool_member_' + type);
									} else {
										alert("'" + str + "' déjà ajouté !");
									};
								};
							};
						});
					});
				});

		};


		// Fonction d'ajout des liens de navigation premier/dernier
		$.fn.add_nav_links = function () {
			// On inverse l'ordre de tri des entités
			return this.each(function () {
				var items = $(this).find('.line1_entity');
				if (items.length > 5) {
					var first_item = items.first();
					var last_item = items.last();
					var id = last_item.prev().attr('id');

					first_item.parent().prepend('<p class="lectures-rapide-nav"><a href="#' + id + '" id="prev' + id + '">[Aller au dernier]</a></p>');
					last_item.parent().append('<p class="lectures-rapide-nav"><a href="#prev' + id + '">[Aller au premier]</a></p>');
				}
			});
		};

		// Page de parcours des rubriques et items
		if ((path == '/lectures/lodel/edition/' || path == '/lectures/lodel/edition/index.php') && typeof (do_value) === "undefined") {
			$('#listEntities').add_nav_links();

			// On monitore l'insertion d'items dans la liste
			$('#listEntities').bind("DOMNodeInserted", function (event) {
				$(event.target).add_nav_links();

				// On trie les rédacteurs par ordre alphabétique
				//targ.find('#childContainer3344 ul').first().jSort({
				//    sort_by: '.titre_document',
				//    item: 'li',
				//    order: 'asc'
				//});

			});



		}

	})(jQuery);

}

// load jQuery and execute the main function
addJQuery(main);
