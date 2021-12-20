import FigmaStorage from "../figmaStorage/FigmaStorage";
import Storybook from "./Storybook";

const storageKey = "storybooks";

export default class StorybookStorage {
    private storybooks : Storybook[];
    private figmaStorage : FigmaStorage;

    constructor() {
        this.figmaStorage = new FigmaStorage();

        this.storybooks = [];

        this.figmaStorage.getItem(storageKey)
            .then((result) => this.storybooks = result);
    }

    getStorybooks() {
        return this.storybooks;
    }

    addStorybook(storybook : Storybook) {
        this.storybooks.push(storybook);

        this.saveStorybooks();
    }

    removeStorybook(storybook : Storybook) {
        this.storybooks = this.storybooks.filter(item => item != storybook);

        this.saveStorybooks();
    }

    private async saveStorybooks() {
        await this.figmaStorage.setItem(storageKey, this.storybooks);
    }
}