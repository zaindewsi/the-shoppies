import React from "react";
import styled from "styled-components";
import Search from "./Search";

const Header = () => {
  return (
    <Top>
      <h1>Welcome to the Shoppies</h1>
      <p>The annual Shopify movie awards for entrepreneurs!</p>
      <p>
        Pick your top 5 favourite movies to nominate for this year's Shoppies
        award ceremony.
      </p>
    </Top>
  );
};

const Top = styled.div`
  background-color: #282c34;
  min-height: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export default Header;
