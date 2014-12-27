(function() {

	// Copyright 2014 Jeremy Kohn. All rights reserved.

	"use strict";
	
	// Do this when input is first received. Then validate, add zeros, etc.
	function removeCommas(number) {
		number = number.split(",").join('');
		return number;
	}
	
	function isUtilityPatent(number) {
		return (/^[0-9]{1,8}$/).test(number);
	}
		
	function isDesignPatent(number) {
		return (/^D[0-9]{1,7}$/).test(number);
	}

	function validFormat(number) {
		return (isUtilityPatent(number) || isDesignPatent(number));
	}
	
	// Adjust number to fit required formats.

	function addLeadingZeros(number, targetLength) {
		if ((/[0-9]+/).test(number) === false) {
		  console.log("Can't add leading zeros. Input number isn't a string with only numeric digits.");  // (Also return error?)
		}
		var zerosToAdd = targetLength - number.length,
			i;
		for (i = 0; i < zerosToAdd; i += 1) {
			number = "0" + number;
		}
		return number;
	}
	
	function removeLeadingZeros(number) {
		if ((/[0-9]+/).test(number) === false) {
			console.log("Can't remove leading zeros. Input number isn't a string with all numeric digits.");  // (Also return error?)
		}
		var len = number.length,
			i;
		for (i = 0; i < len; i += 1) {
			if (number[0] === "0") {
				number = number.slice(0,1);
			}
		}
		return number;
	}
	// Edge case where patent number is 0.
	
	function removeTheD(number) {
		if (isDesignPatent(number)) {
			number = number.substring(1);
		} else {
			console.log("Can't remove the D. It isn't a design patent number.");
		}
		return number;
	}
	
	function formatForFullText(number) {
		if (isUtilityPatent(number)) {
			number = removeLeadingZeros(number);
		} else if (isDesignPatent(number)) {
			number = removeTheD(number);
			number = removeLeadingZeros(number, 7);
			number = "D" + number;
		} else {
			console.log("Can't format for full text. Seems an invalid patent number slipped through the cracks.");
		}
		return number;
	}

	function formatForPDF(number) {
		if (isUtilityPatent(number)) {
			addLeadingZeros(number, 8); // Not strictly necessary? Double-check this on USPTO PDF website.
		} else if (isDesignPatent) {
			number = removeTheD(number);
			number = addLeadingZeros(number, 7);
			number = "D" + number;
		} else {
			console.log("Can't format for PDF. Seens an invalid patent numbers slipped through the cracks.");
		}
		return number;
	}

	function formatForGooglePatents(number) {
		if (isUtilityPatent(number)) {
			number = removeLeadingZeros(number);
		} else if (isDesignPatent(number)) {
			// Remove "D", remove zeros, then re-add "D".
			number = removeTheD(number);
			number = removeLeadingZeros(number);
			number = "D" + number;
		} else {
			console.log("Can't format for Google Patents. Seems an invalid patent number slipped through the cracks.");
		}
		return number;
	}



	function urlPatentFullText(number) {
		number = formatForFullText(number);
		return "http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&p=1&u=%2Fnetahtml%2FPTO%2Fsearch-bool.html&r=1&f=G&l=50&co1=AND&d=PALL&s1=" + number + ".PN.&OS=PN/" + number + "&RS=PN/" + number;
	}

	function urlPatentPDF(number) {
		number = formatForPDF(number);
		return "http://pdfpiw.uspto.gov/.piw?PageNum=0&docid=" + number;
	}

	function urlGooglePatents(number) {
		number = formatForGooglePatents(number);
		return "http://www.google.com/patents/US" + number;
	}

	function openURL(urlToOpen) {
		chrome.tabs.create({url: urlToOpen, active: false});
	}

	function openWebPages(number) {
		//openURL(urlPatentFullText(number));		
		openURL(urlPatentPDF(number));
		//openURL(urlGooglePatents(number));
	}

	// Does this need to be a variable to be a function argument? No, it can be this way too.
	function searchPatents() {		
		var number = document.getElementById("patent-number-entry").value;
		number = removeCommas(number);
		if (validFormat(number)) {
			openWebPages(number);
		} else {
			alert("That doesn't seem to be a U.S. patent number.");
		}

	}
	
	
	// This activates when popup window is opened.
	document.addEventListener("DOMContentLoaded", function(){
		document.getElementById("submit-form").addEventListener("click", searchPatents);
	});
	
}());