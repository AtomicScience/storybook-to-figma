import StorybookStorage from "../storybook/StorybookStorage";

/// <reference lib="dom" />
export default class StorybookChooser {
    storage : StorybookStorage;

    constructor(storage: StorybookStorage) {
        this.storage = storage;
    }

    async init() {
        await this.storage.awaitForRequest();

        this.fillSelectWithStorybooks();
        this.storage.addCallback(this.fillSelectWithStorybooks.bind(this));

        document.getElementById("storybook_select").addEventListener("change", this.onSelectInput.bind(this));

        document.getElementById("delete_button").addEventListener("click", this.onDeleteClick.bind(this));
        document.getElementById("delete_confirm_button").addEventListener("click", this.onConfirmClick.bind(this));
    }

    private fillSelectWithStorybooks() {
        let select = document.getElementById("storybook_select") as HTMLSelectElement;

        select.options.length = 0;

        this.addHiddenOption(select)

        this.storage.getStorybooks().forEach((value) => {
            select.add(new Option(value.name, value.id));
        });

        (document.getElementById("delete_button") as HTMLButtonElement).disabled = this.storage.isEmpty();
        select.disabled = this.storage.isEmpty();
    }

    private addHiddenOption(select : HTMLSelectElement) {
        let headOption = new Option(this.storage.isEmpty() ? "No Storybooks" : "Select a Storybook")
        headOption.hidden = true;
        select.add(headOption);
    }

    private onSelectInput(e : InputEvent) {
        this.setDeleteButtonUnlocked(false);
    } 

    private onDeleteClick(e : InputEvent) {
        this.setDeleteButtonUnlocked(true);
    }

    private onConfirmClick(e : InputEvent) {
        let select = document.getElementById("storybook_select") as HTMLSelectElement;
        let id = select.selectedOptions[0].value;

        this.storage.removeStorybookByID(id);
        this.setDeleteButtonUnlocked(false);
    }

    private setDeleteButtonUnlocked(unlocked : boolean) {
        let deleteButton  = document.getElementById("delete_button") as HTMLButtonElement;
        let confirmButton = document.getElementById("delete_confirm_button") as HTMLButtonElement;

        deleteButton.style.visibility  = unlocked ? "hidden" : "visible";
        confirmButton.style.visibility = unlocked ? "visible" : "hidden";
    }
}