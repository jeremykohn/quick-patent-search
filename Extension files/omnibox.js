(function() {
	"use strict";

	// Use the keyword "patent" to access Quick Patent Search in the Chrome address bar.

	chrome.omnibox.onInputEntered.addListener(function(omniboxInput){
		QPS.openPatentsByNumber(omniboxInput);
	});

}());