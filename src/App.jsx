import NavCategory from "./components/Nav-Category";
import Searchbar from "./components/Searchbar";
import Pages from "./pages/Pages";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Searchbar />
      <NavCategory />
      <Pages />
    </BrowserRouter>
  );
}

export default App;
