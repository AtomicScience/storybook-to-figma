/// <reference lib="dom" />
import './ui.css'
import { selectMenu, disclosure } from 'figma-plugin-ds';

window.addEventListener('message', (e) => window.parent.postMessage(e.data, '*'));

window.onload = () => {
    selectMenu.init()
    disclosure.init()
}