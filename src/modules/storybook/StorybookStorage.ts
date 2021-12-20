import FigmaStorage from "../figmaStorage/FigmaStorage";
import Storybook from "./Storybook";

const storageKey = "storybooks";

export default class StorybookStorage {
    private storybooks : Storybook[];
    private figmaStorage : FigmaStorage;
    private loadingPromise : Promise<void>;
    private callbacks : (() => void)[];

    constructor() {
        this.figmaStorage = new FigmaStorage();

        this.storybooks = [];
        this.callbacks  = [];

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

        this.commitStorageChanges();
    }

    removeStorybook(storybook? : Storybook) {
        this.storybooks = this.storybooks.filter(item => item != storybook);

        this.commitStorageChanges();
    }

    removeStorybookByID(id: string) {
        this.removeStorybook(this.getStorybookById(id));
    }

    clearStorage() {
        this.storybooks = []

        this.commitStorageChanges();
    }

    isEmpty() {
        return this.storybooks.length === 0;
    }

    private async commitStorageChanges() {
        this.callbacks.forEach(callback => callback());

        await this.figmaStorage.setItem(storageKey, this.storybooks);
    }

    addCallback(callback: () => void) {
        this.callbacks.push(callback);
    }

    removeCallback(callback: () => void) {
        this.callbacks = this.callbacks.filter(value => value !== callback);
    }
}