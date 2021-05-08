import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <div>
      <Top>
        <h1>Welcome to the Shoppies</h1>
        <p>The annual Shopify movie awards for entrepreneurs!</p>
        <p>
          Pick your top 5 favourite movies to nominate for this year's Shoppies
          award ceremony.
        </p>
      </Top>
    </div>
  );
};

const Top = styled.div`
  background-color: #faf7ed;
  min-height: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;

  h1 {
    color: #004c3f;
  }

  p {
    color: #222;
  }
`;

export default Header;
