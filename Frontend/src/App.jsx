import { Home } from "./components/routes/home";
import { Login } from "./components/auth/login";
import { Register } from "./components/auth/register";
import { NavBar } from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import useInitSession from "./lib/hooks/useInitSession";
import { AddPage } from "./components/routes/add";
import { RecipeRoute } from "./components/routes/recipe";
import { EditRoute } from "./components/routes/edit";

function App() {
  // since all pages needed to check if user is authenticated.
  // initialize user session
  useInitSession();

  return (
    <>
      <NavBar />
      <main className="py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/recipe/:id" element={<RecipeRoute />} />
          <Route path="/edit/:id" element={<EditRoute />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
