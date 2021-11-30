/// <reference lib="dom" />
function init(): void {
    let items = ["First", "Second", "Third"];

    items.forEach(addItemToThePage);

    document
        .querySelectorAll(".todo_item_actual")
        .forEach((element) => element.addEventListener("click", onActualTodoItemClick));
}

function onActualTodoItemClick(e : MouseEvent) : void {
    let clickedElement = e.target as HTMLElement;

    clickedElement.classList.remove("todo_item_actual");
    clickedElement.classList.add("todo_item_done");

    scheduleRemoval(clickedElement, 300);
}

function scheduleRemoval(element : HTMLElement, timeout : number) : void {
    setTimeout(() => element.remove(), timeout);
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

export const todoList = {
    init: init,
}