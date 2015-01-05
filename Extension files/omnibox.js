(function() {

	"use strict";

	console.log("And now in omnibox.js");

/*
chrome.omnibox.onInputEntered.addListener(function(text) { 
  var serviceCall2 = 'http://www.google.com/search?q=' + text;
  chrome.windows.create({"url": serviceCall2});
});
*/

	// chrome.omnibox.onInputStarted.addListener(function(){console.log("Input started.");});
	// chrome.omnibox.onInputChanged.addListener(function(){console.log("Input changed.");});
	// chrome.omnibox.onInputEntered.addListener(function(){console.log("Input entered.");});



	chrome.omnibox.onInputEntered.addListener(function(text, newForegroundTab){
		console.log("Added event listener.");
		// Open URL by number. After validating it.
		var patentNumber = text;
		var simplifiedPatentNumber = QPS.removePunctuation(patentNumber);
		if (QPS.validate(simplifiedPatentNumber) === true) {
			QPS.openPDF(simplifiedPatentNumber);	// Others later
			alert("Opening patent number " + simplifiedPatentNumber);
		} else {
			// Open error-page.html?
			alert("Error: Cannot understand patent number " + patentNumber);
		}
	});
	

}());



// How does "hide text" work?
// CSS injecton with executeCSS?


/*

onInputEntered

User has accepted what is typed into the omnibox.

addListener
chrome.omnibox.onInputEntered.addListener(function callback)

Parameters
function	callback	
	The callback parameter should be a function that looks like this:

	function(string text, enum of "currentTab", "newForegroundTab", or "newBackgroundTab" disposition) {...};
	string	text	
	enum of "currentTab", "newForegroundTab", or "newBackgroundTab"	disposition	
	Since Chrome 28.

	The window disposition for the omnibox query. This is the recommended context to display results. For example, if the omnibox command is to navigate to a certain URL, a disposition of 'newForegroundTab' means the navigation should take place in a new selected tab.

*/