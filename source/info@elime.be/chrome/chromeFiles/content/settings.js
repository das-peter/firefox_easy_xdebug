if(!be) var be={};
if(!be.elime)be.elime={};
if(!be.elime.easyxdebugOptions) be.elime.easyxdebugOptions={};

be.elime.easyxdebugOptions = {
	initialize: function () {
		var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
		var idekey = document.getElementById("easyxdebug_prefs_idekey");
		idekey.setAttribute("value",prefManager.getCharPref("extensions.easyxdebug.idekey"));

		var p = document.getElementById("easyxdebug_prefs_phpini");
		p.value=p.value.replace(/;/g,"\n");
	},
	
	save: function () {
		var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
		prefManager.setCharPref("extensions.easyxdebug.idekey",document.getElementById("easyxdebug_prefs_idekey").value);
	}
};