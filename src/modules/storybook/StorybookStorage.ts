import FigmaStorage from "../figmaStorage/FigmaStorage";
import Storybook from "./Storybook";

const storageKey = "storybooks";

export default class StorybookStorage {
    private storybooks : Storybook[];
    private figmaStorage : FigmaStorage;
    private loadingPromise : Promise<void>;

    constructor() {
        this.figmaStorage = new FigmaStorage();

        this.storybooks = [];

        this.loadingPromise = this.requestStorybooks();
    }

    async requestStorybooks() : Promise<void> {
        this.storybooks = await this.figmaStorage.getItem(storageKey);
    }

    awaitForRequest() {
        return this.loadingPromise;
    }

    getStorybooks() {
        return this.storybooks;
    }

    getStorybookById(id: string): Storybook | undefined {
        return this.storybooks.find(value => value.id === id)
    }

    addStorybook(storybook : Storybook) {
        this.storybooks.push(storybook);

        this.saveStorybooks();
    }

    removeStorybook(storybook? : Storybook) {
        this.storybooks = this.storybooks.filter(item => item != storybook);

        this.saveStorybooks();
    }

    removeStorybookByID(id: string) {
        this.removeStorybook(this.getStorybookById(id));
    }

    clearStorage() {
        this.storybooks = []

        this.saveStorybooks();
    }

    private async saveStorybooks() {
        await this.figmaStorage.setItem(storageKey, this.storybooks);
    }
}