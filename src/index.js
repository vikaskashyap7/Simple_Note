import React, { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

import { Spinner } from "reactstrap";
import { Slide, ToastContainer } from "react-toastify";

import { Provider } from "react-redux";
import store from "./redux/store";

import "react-toastify/dist/ReactToastify.css";

const LazyApp = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Suspense fallback={<Spinner />}>
                <LazyApp />
                <ToastContainer transition={Slide} />
            </Suspense>
        </Provider>
    </BrowserRouter>
);
