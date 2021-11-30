/// <reference lib="dom" />
import './ui.css'
import { selectMenu, disclosure } from 'figma-plugin-ds';
import { modalWindow } from './modules/modalWindow'
import { todoList } from './modules/todoList'

// Catch a message from the Storybok frame and pass it to the Figma 
window.addEventListener('message', (e) => {
    if (e.data.pluginMessage?.data) {
        window.parent.postMessage(e.data, 'https://www.figma.com');
    }
});

window.onload = () => {
    selectMenu.init();
    disclosure.init();
    modalWindow.init();
    todoList.init();

    // For debug purposes
    document.getElementById("open_modal_button").click();
}