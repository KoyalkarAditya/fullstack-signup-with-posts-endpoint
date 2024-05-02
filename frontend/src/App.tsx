import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import Posts from "./pages/Posts";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1 className=" text-4xl">Hello</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
