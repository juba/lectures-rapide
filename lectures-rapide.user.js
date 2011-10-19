// ==UserScript==
// @id             lectures-rapide
// @name           Lectures rapide
// @version        0.1
// @namespace      lectures-rapides
// @author         Julien Barnier
// @description    Améliorations de l'interface d'édition de Lectures
// @include        http://lectures.revues.org/lodel/edition/*
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js 
// ==/UserScript==


$('#lodel-globalDesk').append('<div id="lectures-rapide-info">Lectures-rapide est actif</div>');
$('style').first().append('<style type="text/css"> #lectures-rapide-info { position: fixed; bottom: 0px; right: 0px; background-color: rgba(50,50,50,0.8); color: white; padding: 4px 8px; border-top-left-radius: 6px;} </style>');
