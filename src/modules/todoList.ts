/// <reference lib="dom" />
interface Request {
    request: string,
    payload?: any,
    timestamp: number
}

let items = [];

function init(): void {
    let itemsPromise = getItemsFromFigmaStorage();

    itemsPromise.then((resolvedItems) => {
        items = resolvedItems;

        updateTodoList();

        document
            .getElementById("todo_button")
            .addEventListener("click", onTodoAddButtonClick);
    })
}

async function onActualTodoItemClick(e: MouseEvent) : Promise<void> {
    let clickedElement = e.target as HTMLElement;

    clickedElement.classList.remove("todo_item_actual");
    clickedElement.classList.add("todo_item_done");

    setTimeout(() => removeItem(clickedElement.innerText), 300);
}

async function onTodoAddButtonClick(e : MouseEvent) : Promise<void> {
    let input = document.getElementById("todo_input") as HTMLInputElement;

    items.push(input.value);
    updateTodoList();

    await saveItemsToFigmaStorage();
}

async function removeItem(contents : string) : Promise<void> {
    items = items.filter(item => item !== contents)

    updateTodoList();
    await saveItemsToFigmaStorage();
}

function updateTodoList() : void {
    document.getElementById("todo_list").innerHTML = '';
    items.forEach(addItemToThePage);

    document
        .querySelectorAll(".todo_item_actual")
        .forEach((element) => element.addEventListener("click", onActualTodoItemClick));
}

function addItemToThePage(item : string) : void {
    let element = constructItemElement(item);

    document.getElementById("todo_list").appendChild(element);
}

function constructItemElement(item: string) {
    let element = document.createElement("div");
    element.classList.add("todo_item_actual");
    element.classList.add("todo_item");
    
    element.innerText = item;

    return element;
}

async function getItemsFromFigmaStorage() : Promise<string[]> {
    let request = createAndSendRequestToFigma("READ_TODO_STORAGE");

    return await createPromiseForRequestResult(request);
}

async function saveItemsToFigmaStorage() : Promise<string> {
    let request = createAndSendRequestToFigma("WRITE_TODO_STORAGE", items);

    return await createPromiseForRequestResult(request);
}

function createAndSendRequestToFigma(request : string, payload? : any) : Request {
    let requestMessage = {
        request: request,
        timestamp: Date.now() // Timestamp serves as an ID for requests and responces
    };

    window.parent.postMessage({ pluginMessage: requestMessage} , "https://www.figma.com");

    return requestMessage;
}

function createPromiseForRequestResult(request : Request) : Promise<any> {
    return new Promise((resolve, reject) => {
        window.addEventListener('message', (e) => {
            let responce = e.data.pluginMessage;

            if(responce?.timestamp === request.timestamp) {
                resolve(responce.result);
            }
        });

        setTimeout(() => reject("Request timeout"), 500);
    })
}

export const todoList = {
    init: init,
}