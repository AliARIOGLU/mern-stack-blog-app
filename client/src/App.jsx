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
} from "./pages";

// components
import { Header } from "./components/Header";
import { FooterSection } from "./components/Footer";
import { PrivateRoute } from "./components/PrivateRoute";
import { AdminRoute } from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
      <FooterSection />
    </BrowserRouter>
  );
}

export default App;
