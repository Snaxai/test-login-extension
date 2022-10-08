//let fnr2 = "03066212709";
console.log("Background.js initiated");



// Note: Due to CORS-issues we need to request the data from the server in the background.js file.
// The data is in turn passed between the difference JS-files using Chrome message passing.


const baseUrl = 'https://test1.mistral.mistralnett.com/tariffering-web/internal/kunde?x-client-id=peder&x-kunde=';

async function loadPersonData(fnr) {
     let obj = await (await fetch(baseUrl + fnr)).json();
	 return obj;
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
		if (request.contentScriptQuery === "requestUserFromTest") {
			console.log("request: ", request);
			const personData = loadPersonData(request.personFnr);
			personData.then((personJson) => {
				console.log("personData: ", personJson);
				chrome.runtime.sendMessage(
					{contentScriptQuery: "resultUserFromTest", personData: personJson},
					(response) => {[]}
				);

			});
		}
		return true;
    }
);
