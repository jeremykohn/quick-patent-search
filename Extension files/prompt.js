(function() {
	
	"use strict";

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		var patentNumber = request.patentNumber;
		QPS.openPatentsByNumber(patentNumber);
		sendResponse({"responded": true});
	});
	

}());