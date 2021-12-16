/*
    FigmaStorage provides a WebStorage-like API to save
    data to Figma's clientStorage.
*/
class FigmaStorage {
    getItem(key) : Promise<any | undefined> {
        let request = new FigmaRequest(RequestType.SET, key);

        return sendRequestAndExpectResult(request);
    }

    setItem(key, value) : Promise<void> {
        let request = new FigmaRequest(RequestType.GET, {key, value});

        return sendRequestAndExpectResult(request);
    }
}

async function sendRequestAndExpectResult(request : FigmaRequest) : Promise<any | undefined> {
    sendRequest(request);

    return createPromiseForRequestResult(request)
}

async function sendRequest(request : FigmaRequest) {
    window.parent.postMessage({ pluginMessage: request }, "https://www.figma.com");
}

function createPromiseForRequestResult(request: FigmaRequest): Promise<any> {
    return new Promise((resolve, reject) => {
        window.addEventListener('message', (e) => {
            let responce = e.data.pluginMessage;

            if (responce?.timestamp === request.timestamp) {
                resolve(responce.result);
            }
        });

        setTimeout(() => reject("Request timeout"), 500);
    })
}