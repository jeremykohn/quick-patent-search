/*
	Copyright 2014-2015 Jeremy Kohn. 
	All rights reserved.
*/


(function() {

	"use strict";

	function getNumberFromPopup() {
		return document.getElementById("patent-number-entry").value;
	}

	// function displayMessage(color, message, number) {
	// 	var messageField = document.getElementById("message-field");
	// 	console.log("Color, message, and number are " + color + ", " + message + ", " + number);
	// 	messageField.style.fontColor = color;		
	// 	messageField.innerText = message + number;
	// 	messageField.style.display = "visible";
	// }

	// Attach event listener. Activate when popup window is opened.

	document.addEventListener("DOMContentLoaded", function() {
		document.getElementById("submit-form").addEventListener("click", function() {
			var patentNumber = getNumberFromPopup();
			var simplifiedPatentNumber = QPS.removePunctuation(patentNumber);
			if (QPS.validate(simplifiedPatentNumber) === true) {
//				displayMessage("green", "Now opening patent number ", simplifiedPatentNumber);
				QPS.openPDF(simplifiedPatentNumber);
				// QPS.openFullText(patentNumber);	// Later
				// QPS.openGooglePatents(patentNumber);	// Later
				// Also later might use a generalized function, "QPS.openMultiplePages(patentNumber, options) and "options" would include which pages to open
			} else {
//				displayMessage("red", "Error: Cannot understand patent number", patentNumber); 
				// Different error message if no input? Like "Please enter a patent number. <Details>"
			}
		});
	});

}());