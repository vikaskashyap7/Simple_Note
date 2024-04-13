import { configureStore } from "@reduxjs/toolkit";
import { appConfig } from "../configs/appConfig";

import { noteReducer } from "./noteSlice";
import { tagReducer } from "./tagSlice";
import { toggleReducer } from "./toggleSlice";

const saveToLocalStorage = (state) => {
    try {
        localStorage.setItem(appConfig.storeState, JSON.stringify(state));
    } catch (e) {
        console.log(
            `Unable to save state to local storage due to: ${e.message}`
        );
    }
};

const loadFromLocalStorage = () => {
    try {
        const stateStr = localStorage.getItem(appConfig.storeState);
        return stateStr ? JSON.parse(stateStr) : undefined;
    } catch (e) {
        console.log(
            `Error occurred loading app state from local storage:  ${e.message}`
        );
    }
};

const persistedStore = loadFromLocalStorage();

const store = configureStore({
    reducer: {
        notes: noteReducer,
        tags: tagReducer,
        bool:toggleReducer
    },
    preloadedState: persistedStore,
});

store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

export default store;
