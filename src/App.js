import Header from "./components/Header";
import Search from "./components/Search";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div>
      <ChakraProvider>
        <Header />
        <Search />
      </ChakraProvider>
    </div>
  );
}

export default App;
