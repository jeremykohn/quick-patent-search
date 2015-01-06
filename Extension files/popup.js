(function() {
	"use strict";

	// Attach event listener. Activate when popup window is opened.
	
	document.addEventListener("DOMContentLoaded", function(response) {
		document.getElementById("submit-form").addEventListener("click", function() {
			var popupInput = document.getElementById("patent-number-entry").value;
			chrome.runtime.sendMessage({"patentNumber": popupInput}); 
			// Sends a message to prompt.js file, which then runs the search.
			// Otherwise, on Mac the prompt or alert box disappears when the popup window closes.
		});
	});

}());