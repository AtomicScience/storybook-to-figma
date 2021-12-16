/// <reference lib="dom" />
import FigmaStorage from "./figmaStorage/FigmaStorage"

let items = [];
const figmaStorage = new FigmaStorage();
const storageKey = "todo_items"

function init(): void {
    let itemsPromise = figmaStorage.getItem(storageKey)

    itemsPromise.then((resolvedItems) => {
        items = resolvedItems || [];

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

    input.value = "";

    updateTodoList();

    await figmaStorage.setItem(storageKey, items);
}

async function removeItem(contents : string) : Promise<void> {
    items = items.filter(item => item !== contents)

    updateTodoList();
    await figmaStorage.setItem(storageKey, items);
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

export const todoList = {
    init: init,
}