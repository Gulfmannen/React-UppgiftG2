import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Pages from "./pages/Pages";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Searchbar />
      <Navbar />
      <Pages />
    </BrowserRouter>
  );
}

export default App;
