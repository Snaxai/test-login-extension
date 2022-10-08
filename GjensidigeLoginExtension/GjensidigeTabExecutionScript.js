// Code to execute on the actual Gjensidige-page

function updateInjectedPageAndSubmit(fornavn, etternavn, fnr) {
	let radiobuttonFornavnFnr = document.querySelector("#radio-button-expandable-uten-bank-id");
	radiobuttonFornavnFnr.click();
	
	const event = new Event('input', { bubbles: true })
	let fornavnInput = document.querySelector("#radio-button-expandable-uten-bank-id-animate #fornavn");
	fornavnInput.value = fornavn;
	fornavnInput.dispatchEvent(event);
	
	let etternavnInput = document.querySelector("#radio-button-expandable-uten-bank-id-animate #etternavn");
	etternavnInput.value = etternavn;
etternavnInput.dispatchEvent(event);

let fnrInput = document.querySelector("#radio-button-expandable-uten-bank-id-animate #offisiellId");
fnrInput.value = fnr;
fnrInput.dispatchEvent(event);

//alert(document.title);
//const sdf = localStorage.getItem("gjensidigeLoginState");
//console.log("session storage", sdf);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function submitForm() {
	let submitBtn = document.querySelector("button[data-test-id='identify-person-next'] span");
    await sleep(500);
	//submitBtn.click();
}

submitForm();

chrome.runtime.onMessage.addListener(
	(request, sender, sendResponse) => {
		console.log("WTF");
		if (request.contentScriptQuery == "resultUserFromTest") {
			console.log("message received in heaven");
		}
	}
);



