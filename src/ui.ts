/// <reference lib="dom" />
import './ui.css'
import { selectMenu, disclosure } from 'figma-plugin-ds';
import ModalWindow from './modules/ui/ModalWindow'
import StorybookAdder from './modules/ui/StorybookAdder';
import StorybookStorage from './modules/storybook/StorybookStorage';
import StorybookChooser from './modules/ui/StorybookChooser';
import Iframe from './modules/ui/Iframe';

window.addEventListener('message', (e) => window.parent.postMessage(e.data, '*'));

window.onload = () => {
    disclosure.init()
    new ModalWindow().init();

    let storage = new StorybookStorage();

    new StorybookAdder(storage).init();
    new StorybookChooser(storage).init();

    new Iframe(storage).init();
}