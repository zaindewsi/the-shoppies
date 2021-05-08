import Header from "./components/Header";
import Search from "./components/Search";
require("dotenv").config();

function App() {
  return (
    <div>
      <Header />
      <Search />
    </div>
  );
}

export default App;
