import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MainContainer from "./Components/MainContainer";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WatchPage from "./Components/WatchPage";
import SearchResultsPage from "./Components/SearchResultsPage";
import HistoryPage from "./Components/HistoryPage";
import AuthorizeUser from "./Components/AuthorizeUser";
import PlayListCard from "./Components/PlayListCard";
import SubscriptionsPage from "./Components/SubscriptionsPage";
import WatchLaterPage from "./Components/WatchLaterPage";
import ShortsPage from "./Components/ShortsPage";
import ShortsLoop from "./Components/ShortsLoop";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "/watch",
        element: <WatchPage />,
      },
      {
        path: "/results",
        element: <SearchResultsPage />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
      {
        path: "/login",
        element: <AuthorizeUser />,
      },
      {
        path: "/playlist",
        element: <PlayListCard />,
      },
      {
        path: "/subscriptions",
        element: <SubscriptionsPage />,
      },
      {
        path: "/watchlater",
        element: <WatchLaterPage />,
      },
      {
        path: "/shorts/:id",
        element: <ShortsPage />,
      },
      {
        path: "/shorts",
        element: <ShortsLoop />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  // </React.StrictMode>
  <RouterProvider router={AppRouter} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
