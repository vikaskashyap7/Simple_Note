import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
    name: "notes",
    initialState: [],
    reducers: {
        addNote: (state, action) => {
            state.push(action.payload);
        },
        updateNote: (state, action) => {
            const { id, title, tags, content, updated } = action.payload;

            const oNote = state.find((x) => x.id === id);

            oNote.updated = updated;
            oNote.title = title;
            oNote.tags = tags;
            oNote.content = content;
        },
    },
});

export const { addNote, updateNote } = noteSlice.actions;

export const noteReducer = noteSlice.reducer;
