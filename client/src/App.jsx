import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import { Home, About, Dashboard, SignIn, SignUp, Projects } from "./pages";

// components
import { Header } from "./components/Header";
import { FooterSection } from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <FooterSection />
    </BrowserRouter>
  );
}

export default App;
