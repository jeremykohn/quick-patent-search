/*
	Copyright 2014-2015 Jeremy Kohn. 
	All rights reserved.
*/

(function() {

	"use strict";

	// Attach event listener. Activate when popup window is opened.
	
	document.addEventListener("DOMContentLoaded", function() {
		document.getElementById("submit-form").addEventListener("click", function() {
			var input = document.getElementById("patent-number-entry").value;
			chrome.runtime.sendMessage({"patentNumber": input});
		});
	});

}());