import { lazy } from "react";

import AppLayout from "../layouts/AppLayout";
import { element } from "prop-types";

const Home = lazy(() => import("../views/HomeView"));
const Note = lazy(() => import("../views/NoteView"));
const Tags = lazy(() => import("../views/TagsView"));
const Login = lazy(()=>import("../views/Login"));
// const SignUp=lazy(()=>import("../views/SingnUp"));

const Routes = [
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: '/login', element: <Login /> },
            // { path: '/signup', element: <SignUp /> },
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
