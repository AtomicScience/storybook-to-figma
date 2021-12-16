/// <reference lib="dom" />
function init() : void {
    document
        .getElementById("open_modal_button")
        .addEventListener("click", onOpenModalWindowClick);

    document
        .getElementById("close_modal_button")
        .addEventListener("click", onCloseModalWindowClick)
}

function onCloseModalWindowClick(e : MouseEvent) {
    setModalWindowOpen(false);
}

function onOpenModalWindowClick(e : MouseEvent) {
    setModalWindowOpen(true);
}

function setModalWindowOpen(open : boolean) {
    let attributeValueToSet = open ? "inline" : "none";

    let modalWindow = document.getElementById("modal_background");
    modalWindow.style.display = attributeValueToSet;
}

export const modalWindow = {
    init: init,
}