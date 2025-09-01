import "./App.css";
import Header from "./components/header/Header";
import Page from "./components/HomePage/Page";
import { useState } from "react";
import { SearchContext } from "./components/searchContext/SearchContext";
function App() {
  const [data, setData] = useState("");
  return (
    <>
      <SearchContext.Provider value={{ data, setData }}>
        <Header />
        <Page />
      </SearchContext.Provider>
    </>
  );
}

export default App;
