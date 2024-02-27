import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/MainLayout";

// pages
import {
  About,
  CreatePost,
  Dashboard,
  Home,
  NotFound,
  PostPage,
  Projects,
  Search,
  SignIn,
  SignUp,
  UpdatePost,
  ErrorPage,
} from "../pages";

// loaders
import {
  adminPageLoader,
  authPageLoader,
  privatePageLoader,
} from "./router-actions";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/sign-in",
            element: <SignIn />,
            loader: authPageLoader,
          },
          {
            path: "/sign-up",
            element: <SignUp />,
            loader: authPageLoader,
          },
          {
            path: "/search",
            element: <Search />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
            loader: privatePageLoader,
          },
          {
            path: "/create-post",
            element: <CreatePost />,
            loader: adminPageLoader,
          },
          {
            path: "/update-post/:postId",
            element: <UpdatePost />,
            loader: adminPageLoader,
          },
          {
            path: "/projects",
            element: <Projects />,
          },
          {
            path: "/post/:postSlug",
            element: <PostPage />,
          },
          {
            path: "/*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);
