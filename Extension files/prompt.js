(function() {
	"use strict";

	// On Mac, the prompt or alert dialog box appears quickly and goes away when the popup closes.
	// This is a workaround.
	// It receives a message from popup.js and runs the patent search.

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		var patentNumber = request.patentNumber;
		QPS.openPatentsByNumber(patentNumber);
	});

}());