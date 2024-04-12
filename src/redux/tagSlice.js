import { createSlice } from "@reduxjs/toolkit";

export const tagSlice = createSlice({
    name: "tags",
    initialState: [],
    reducers: {
        addTags: (state, action) => {
            const tags = action.payload;

            if (tags.length > 0) {
                tags.forEach((tag) => {
                    if (!state.includes(tag)) state.push(tag);
                });
            }
        },
        updateTags: (state, action) => {
            // destruct the payload.
            const { tags, oldTags, notes, noteId } = action.payload;

            let tagsToRemove = [];
            let tagsToAdd = [];

            // old and new tags are not the same then find the difference
            // to add or remove tags.
            if (JSON.stringify(tags) !== JSON.stringify(oldTags)) {
                tagsToRemove = oldTags.filter((x) => !tags.includes(x));
                tagsToAdd = tags.filter((x) => !oldTags.includes(x));
            }

            if (tagsToRemove.length > 0) {
                let remove = [];

                // check the other notes to make sure tag is not used anywhere
                // except the current note, being updated
                tagsToRemove.forEach((t) => {
                    if (
                        notes.findIndex(
                            (x) => x.tags.includes(t) && x.id !== noteId
                        ) < 0
                    ) {
                        remove.push(t);
                    }
                });

                // update the state
                if (remove.length > 0)
                    remove.forEach((x) => state.splice(state.indexOf(x), 1));
            }

            // add new tags only if they are not there already.
            if (tagsToAdd.length > 0)
                tagsToAdd.forEach((tag) => {
                    if (!state.includes(tag)) state.push(tag);
                });
        },
    },
});

export const { addTags, updateTags } = tagSlice.actions;

export const tagReducer = tagSlice.reducer;
