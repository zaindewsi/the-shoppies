import React from "react";
import { Top, Shoppies } from "./StyledComponents";

const Header = () => {
  return (
    <div>
      <Top>
        <h1>
          Welcome to the <Shoppies>Shoppies</Shoppies>
        </h1>
        <p>The annual Shopify movie awards for entrepreneurs!</p>
        <p>
          Pick your <strong>top 5 </strong>favourite movies to nominate for this
          year's Shoppies award ceremony.
        </p>
      </Top>
    </div>
  );
};

export default Header;
