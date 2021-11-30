/// <reference lib="dom" />
import './ui.css'
import { selectMenu, disclosure } from 'figma-plugin-ds';
import { modalWindow } from './modules/modalWindow'
import { todoList } from './modules/todoList'

window.addEventListener('message', (e) => window.parent.postMessage(e.data, '*'));

window.onload = () => {
    selectMenu.init();
    disclosure.init();
    modalWindow.init();
    todoList.init();

    // For debug purposes
    document.getElementById("open_modal_button").click();
}