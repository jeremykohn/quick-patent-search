/*
	Copyright 2014-2015 Jeremy Kohn. 
	All rights reserved.
*/


(function() {

	"use strict";

	function getNumberFromPopup() {
		return document.getElementById("patent-number-entry").value;
	}

	// Attach event listener. Activate when popup window is opened.

	document.addEventListener("DOMContentLoaded", function() {
		console.log("Added event listener. DOM content loaded.");
		document.getElementById("submit-form").addEventListener("click", function() {
			console.log("Clicked.");
			var input = getNumberFromPopup();
			
			// Send message, instead of opening patent from here.
			
			chrome.runtime.sendMessage({"patentNumber": input}, function(response) {
				alert(response);
				alert(JSON.serialize(response));
			});
			
			
			// QPS.openPatentsByNumber(input); // This opens URL(s) by patent number, after validating input.
			// Check if the prompt box persists.
			// No, it doesn't.
			// Where to send message?
			// Try sending it to prompt.js background page script.
			

		});
	});

}());