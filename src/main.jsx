import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import App from "./App.jsx";
import Board from "./components/Board/Board.jsx";
import SetupForm from "./components/SetupForm/SetupForm.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import "./index.css";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />} errorElement={<ErrorPage />}>
			<Route index element={<SetupForm />} />
			<Route path="/board" element={<Board />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router}>
			<App />
		</RouterProvider>
	</React.StrictMode>
);
