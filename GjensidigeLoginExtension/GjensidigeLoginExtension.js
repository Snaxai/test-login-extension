// Initialize the form with the fnr strored in Chrome storage
let fnrValue = "";

const WHITESPACE = /\s/g;
function removeWhitespace(inputStr) {
  return inputStr.replace(WHITESPACE, '');
}

function hello(a, b, c) {
	updateInjectedPageAndSubmit("sdfsdf","sdfsdfsdfsdfsdf","vbnvbnvbnvbb");

}

chrome.storage.sync.get("fnr", ({ fnr }) => {  // Seems to be async
  //changeColor.style.backgroundColor = color2;
	fnrValue = fnr;

	let fnrInput = document.getElementById("fnrInput");
	fnrInput.value = fnrValue;
});

window.onload = function exampleFunction() {
	console.log('The Script has loaded.');
	localStorage.setItem("gjensidigeLoginState", "window loaded");

	const fnrInput = document.getElementById("fnrInput");
	fnrInput.value = fnrValue;
	fnrInput.oninput = function(event) {
		const fnrCandidate = removeWhitespace(event.target.value);
		let pattern = /^\d+$/i;
		if (fnrCandidate.length === 11 && fnrCandidate.match(pattern)) {
			console.log("We have a fnr!!"); 


			chrome.tabs.query({active: true, currentWindow: true}, tabs => {
				chrome.scripting.executeScript(
					{
						target: {tabId: tabs[0].id},
						func: hello,
						args: ["sdfsdf","sdfsdfsdfsdfsdf","vbnvbnvbnvbb"],
					},
					() => { 
						console.log("Injector script");
					 });
				})

			// REMOVE
			chrome.runtime.sendMessage(
				{contentScriptQuery: "requestUserFromTest", personFnr: fnrCandidate},
				(responseData) => {
					console.log("responseData: ", responseData)
				}
			)
		}
	}
	
	const copyToClipboardBtn = document.getElementById("copyToClipboard");
	copyToClipboardBtn.onclick = function(){
		chrome.storage.sync.set({ fnr: fnrInput.value });

		// Copy the text inside the text field to clipboard
		navigator.clipboard.writeText(fnrInput.value);	  



		// Find current tab and inject and execute script there:
		chrome.tabs.query({active: true, currentWindow: true}, tabs => {
			chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['GjensidigeTabExecutionScript.js']})
		})
	};
	
	copyToClipboardBtn.focus();
	
}

chrome.runtime.sendMessage(
	{contentScriptQuery: "requestUserFromTest", personFnr: "03066212709"},
	(responseData) => {
		console.log("responseData: ", responseData)
	}
)

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
			if (request.contentScriptQuery == "resultUserFromTest") {
				console.log("request: ", request);
				console.log("result: ", request.personData);
				const data = request.personData
				updateUIPersonDetails(data.offisiellId, data.navn, data.partref)
			}
    }
);

const fnrSpan = document.querySelector("#queryResultFnr");
const navnSpan = document.querySelector("#queryResultNavn");
const partRefSpan = document.querySelector("#queryResultPartRef");
function updateUIPersonDetails(fnr, navn, partRef) {
	fnrSpan.innerHTML = fnr;
	navnSpan.innerHTML = navn;
	partRefSpan.innerHTML = partRef;

}