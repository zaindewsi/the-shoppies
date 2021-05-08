import React from "react";
import Search from "./Search";

function Header() {
  return (
    <div>
      <header className="App-header">
        <div>
          <h1>Welcome to the Shoppies</h1>
          <p>The annual Shopify movie awards for entrepreneurs!</p>
          <p>
            Pick your top 5 favourite movies to nominate for this year's
            Shoppies award ceremony.
          </p>
        </div>
        <Search />
      </header>
    </div>
  );
}

export default Header;
