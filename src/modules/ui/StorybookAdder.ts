/// <reference lib="dom" />
import StorybookStorage from "../storybook/StorybookStorage";

export default class StorybookAdder {
    private storage : StorybookStorage;

    constructor(storage : StorybookStorage) {
        this.storage = storage;
    }

    async init() {
        await this.storage.awaitForRequest();
        
        document.getElementById("storybook_link").addEventListener("input", this.onInput.bind(this));
        document.getElementById("storybook_name").addEventListener("input", this.onInput.bind(this));

        document.getElementById("storybook_button").addEventListener("click", this.onClick.bind(this));
    }

    private onInput(e : InputEvent) {
        let linkEmpty = this.getValueFromInput("storybook_link") === "";
        let nameEmpty = this.getValueFromInput("storybook_name") === "";

        this.setButtonDisabled(linkEmpty || nameEmpty)
    }

    private onClick(e : InputEvent) {
        let link = this.getValueFromInput("storybook_link");
        let name = this.getValueFromInput("storybook_name");

        let storybook = { name: name, address: link };

        this.storage.addStorybook(storybook);

        console.log(this.storage.getStorybooks());
    }

    private getValueFromInput(id : string) {
        let input = document.getElementById(id) as HTMLInputElement;

        return input.value;
    }

    private setButtonDisabled(disabled : boolean) {
        let button = document.getElementById("storybook_button") as HTMLButtonElement;

        button.disabled  = disabled;
    }
}