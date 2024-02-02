import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import {
  Home,
  About,
  Dashboard,
  SignIn,
  SignUp,
  Projects,
  CreatePost,
  UpdatePost,
  PostPage,
  Search,
  NotFound,
} from "./pages";

// components
import { Header } from "./components/Header";
import { FooterSection } from "./components/Footer";
import { PrivateRoute } from "./components/PrivateRoute";
import { AdminRoute } from "./components/AdminRoute";
import { ScrollToTop } from "./components/ScrollToTop";
import { AuthRoute } from "./components/AuthRoute";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<AuthRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
        <Route path="/post/:postSlug" element={<PostPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <FooterSection />
    </BrowserRouter>
  );
}

export default App;
