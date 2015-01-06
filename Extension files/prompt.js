(function() {
	
	"use strict";

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		console.log("Listener added.");
		console.log("So far, so good.");
		console.log("Request is " + request);
		console.log("Sender is " + sender);
		var patentNumber = request.patentNumber;
		QPS.openPatentsByNumber(patentNumber);
		console.log("Opened.");
		// sendResponse({"responded": true});
	});
	

}());