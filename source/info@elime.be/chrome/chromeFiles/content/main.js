if(!be) var be={};
if(!be.elime)be.elime={};
if(!be.elime.easyxdebug) be.elime.easyxdebug={};

be.elime.easyxdebug = {
	state_idekey: 'netbeans-xdebug',
		
	start: function () {
		var doc= window.content.document;
		be.elime.easyxdebug.setCookie(doc,'XDEBUG_SESSION',be.elime.easyxdebug.state_idekey, 60);
	},
	
	startProfile: function () {
		var doc= window.content.document;
		be.elime.easyxdebug.setCookie(doc,'XDEBUG_PROFILE',1, 60);
	},
	
	stop: function (){	
		var doc= window.content.document;
		be.elime.easyxdebug.setCookie(doc,'XDEBUG_SESSION',null, -60);
	},
	
	stopProfile: function () {
		var doc= window.content.document;
		be.elime.easyxdebug.setCookie(doc,'XDEBUG_PROFILE',null, -60);
	},
	
	
	toggle: function() {
		var doc= window.content.document;
		var isEnabled = (be.elime.easyxdebug.getCookie(doc,'XDEBUG_SESSION')==be.elime.easyxdebug.state_idekey);
		if (isEnabled) {
			be.elime.easyxdebug.stop();
		} else {
			be.elime.easyxdebug.start();
		}
		be.elime.easyxdebug.refresh();
	},

	toggleProfile: function() {
		var doc= window.content.document;
		var isEnabled = (be.elime.easyxdebug.getCookie(doc,'XDEBUG_PROFILE')==1);
		if (isEnabled) {
			be.elime.easyxdebug.stopProfile();
		} else {
			be.elime.easyxdebug.startProfile();
		}
		be.elime.easyxdebug.refresh();
	},
	
	refresh: function() {
		var doc=window.content.document;

		var isEnabled = (be.elime.easyxdebug.getCookie(doc,'XDEBUG_SESSION')==be.elime.easyxdebug.state_idekey);
		var icon = document.getElementById('easyxdebug_debug');
		
		if(isEnabled){
			icon.src="chrome://easyxdebug/content/images/bug_delete.png";
			icon.tooltiptext="Stop xdebug session";
		}else{
			icon.src="chrome://easyxdebug/content/images/bug_go.png";
			icon.tooltiptext="Start xdebug session";
		}
		
		var isProfilerEnabled = (be.elime.easyxdebug.getCookie(doc,'XDEBUG_PROFILE')==1);
		var profilerIcon = document.getElementById('easyxdebug_profile');
		
		if (isProfilerEnabled) {
			profilerIcon.src="chrome://easyxdebug/content/images/stop_red.png";
			profilerIcon.tooltiptext="Stop xdebug profiler";
		}else{
			profilerIcon.src="chrome://easyxdebug/content/images/stop_green.png";
			profilerIcon.tooltiptext="Start xdebug profiler";
		}
	},
	
	init: function (){
		var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
		be.elime.easyxdebug.state_idekey = prefManager.getCharPref("extensions.easyxdebug.idekey");
		getBrowser().addEventListener("load",be.elime.easyxdebug.refresh, true);
	},
	
	setCookie: function (doc, cookieName, cookieVal,minutes) {
		var exp=new Date();
		exp.setTime(exp.getTime()+(minutes*60*1000));
		doc.cookie=cookieName+"="+cookieVal+"; expires="+exp.toGMTString()+"; path=/";
	},
	
	getCookie: function (doc,name) {
		var prefix = name + "="
		var cookieStartIndex = doc.cookie.indexOf(prefix)
		if (cookieStartIndex == -1)
				return null
		var cookieEndIndex = doc.cookie.indexOf(";", cookieStartIndex + prefix.length)
		if (cookieEndIndex == -1)
				cookieEndIndex = doc.cookie.length
		return unescape(doc.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex))
	}
};

window.addEventListener("load", be.elime.easyxdebug.init, false);