/*
	Copyright 2014-2015 Jeremy Kohn. 
	All rights reserved.
*/

var QPS = (function () {

	"use strict";
	
	// Patent numbers often include commas, spaces, etc. 
	// Remove those before continuing.
	// However, most other non-alphanumeric characters should produce an error.

	function removePunctuation(number) {
		return number.replace(/[,.\-\'\"\`\s]/g, '');
	}
	
	// Check for valid patent number formats.
	
	function isUtilityPatent(number) {
		return (/^([Uu][Ss])?([0-9]{1,8})$/).test(number);
	}
	
	function isDesignPatent(number) {
		return (/^([Uu][Ss])?[Dd]([0-9]{1,7})$/).test(number);
	}
	
	function validFormatUS(number) {
		return (isUtilityPatent(number) || isDesignPatent(number));
	}
	
	// Adjust number to fit each site's required URL structure.

	function removePrefixUS(number) {
		if (validFormatUS(number) && (/^[Uu][Ss]/).test(number)) {
			number = number.slice(2);
		}
		return number;
	}
	
	function addLeadingZeros(number, targetLength) {
		var zerosToAdd = targetLength - number.length,
			i;
		if ((/[0-9]+/).test(number) === false) {
		  console.log("Can't add leading zeros. Input number isn't a string with only numeric digits.");
		}
		for (i = 0; i < zerosToAdd; i += 1) {
			number = "0" + number;
		}
		return number;
	}
	
	function removeLeadingZeros(number) {
		if ((/[0-9]+/).test(number) === false) {
			console.log("Can't remove leading zeros. Input number isn't a string with all numeric digits.");
		}
		var len = number.length,
			i;
		for (i = 0; i < len; i += 1) {
			if (number[0] === "0") {
				number = number.slice(1); 
			}
		}
		return number;
	}
	// Remember there's an edge case where patent number is 0.
	
	function removeTheD(number) {
		if (number[0] === 'D' || number[0] === 'd') {
			number = number.slice(1);
		} else {
			console.log("It doesn't start with a D.");
		}
		return number;
	}
	
	function formatNumberForFullText(number) {
		number = removePrefixUS(number);
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
	
	function formatNumberForPDF(number) {
		// Eight digits including 0's, and D if any.
		if (isUtilityPatent(number)) {
			number = addLeadingZeros(number, 8);
		} else if (isDesignPatent) {
			number = removeTheD(number);
			number = addLeadingZeros(number, 7);
			number = "D" + number;
		} else {
			console.log("Can't format for PDF. Seens an invalid patent numbers slipped through the cracks.");
		}
		return number;
	}
	
	function formatNumberForGooglePatents(number) {
		if (isUtilityPatent(number)) {
			number = removeLeadingZeros(number);
		} else if (isDesignPatent(number)) {
			number = removeTheD(number);
			number = removeLeadingZeros(number);
			number = "D" + number;
		} else {
			console.log("Can't format for Google Patents. Seems an invalid patent number slipped through the cracks.");
		}
		return number;
	}
	
	function urlPatentFullText(number) {
		var fullURL;
		number = formatNumberForFullText(number);
		fullURL = "http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&p=1&u=%2Fnetahtml%2FPTO%2Fsearch-bool.html&r=1&f=G&l=50&co1=AND&d=PALL&s1=" + number + ".PN.&OS=PN/" + number + "&RS=PN/" + number;
		return fullURL;
	}
	
	function urlPatentPDF(number) {
		var urlGroup1, urlGroup2, urlGroup3, fullURL;
		number = formatNumberForPDF(number);
		urlGroup1 = number.substring(6);
		urlGroup2 = number.substring(3,6);
		urlGroup3 = number.substring(0,3);
		fullURL = "http://pimg-fpiw.uspto.gov/fdd/" + urlGroup1 + "/" + urlGroup2 + "/" + urlGroup3 + "/" + "0.pdf";
		// fullURL = "http://pdfpiw.uspto.gov/.piw?PageNum=0&docid=" + number; // Previous version. Leads to page with PDF in a frame.
		return fullURL;
	}
	
	function urlGooglePatents(number) {
		var fullURL;
		number = formatNumberForGooglePatents(number);
		fullURL = "http://www.google.com/patents/US" + number;
		return fullURL;
	}
	
	function openURL(urlToOpen) {
		chrome.tabs.create({url: urlToOpen, active: false}); // Callback if successfully opened tab? // Previously, active: false
	}

	function sameWindowOpenURL(urlToOpen) {
		console.log("Same window open URL");
		console.log("URL is " + urlToOpen);
		//window.location.href = "urlToOpen";
		window.open(urlToOpen, "_self");
	}

	function openPDF(number) {
		var formattedNumber = formatNumberForPDF(number);
		openURL(urlPatentPDF(formattedNumber));
		// sameWindowOpenURL(urlPatentPDF(formattedNumber)); // Can't get this to work. Might come back to it later.
	}
	
	function openFullText(number) {
		var formattedNumber = formatNumberForFullText(number);
		openURL(urlPatentFullText(formattedNumber));
	}
	
	function openGooglePatent(number) {
		var formattedNumber = formatNumberForGooglePatents(number);
		openURL(urlGooglePatents(formattedNumber));
	}

	// Finally, return an object containing public methods.

	return {
		validate: validFormatUS, // Might change later if add international patent formats.
		removePunctuation: removePunctuation,
		openPDF: openPDF,
		openFullText: openFullText,
		openGooglePatent: openGooglePatent
	};

}());

