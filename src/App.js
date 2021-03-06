import Header from "./components/Header";
import Search from "./components/Search";
import Footer from "./components/Footer";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div>
      <ChakraProvider>
        <Header />
        <Search />
        <Footer />
      </ChakraProvider>
    </div>
  );
}

export default App;
