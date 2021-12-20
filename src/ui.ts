/// <reference lib="dom" />
import './ui.css'
import { selectMenu, disclosure } from 'figma-plugin-ds';
import ModalWindow from './modules/ui/ModalWindow'
import StorybookAdder from './modules/ui/storybookAdder';
import StorybookStorage from './modules/storybook/StorybookStorage';

window.addEventListener('message', (e) => window.parent.postMessage(e.data, '*'));

window.onload = () => {
    selectMenu.init()
    disclosure.init()
    new ModalWindow().init();

    let storybookStorage = new StorybookStorage();

    new StorybookAdder(storybookStorage).init();
}