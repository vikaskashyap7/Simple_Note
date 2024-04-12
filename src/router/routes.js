import { lazy } from "react";

import AppLayout from "../layouts/AppLayout";

const Home = lazy(() => import("../views/HomeView"));
const Note = lazy(() => import("../views/NoteView"));
const Tags = lazy(() => import("../views/TagsView"));

const Routes = [
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "/notes",
                children: [
                    { index: true, element: <Home /> },
                    { path: "/notes/add", element: <Note /> },
                    { path: "/notes/edit/:noteId", element: <Note /> },
                ],
            },
            { path: "/tags", element: <Tags /> },
        ],
    },
    {
        path: "*",
        element: (
            <>
                <p>Nothing to see here!</p>
            </>
        ),
    },
];

export { Routes };
