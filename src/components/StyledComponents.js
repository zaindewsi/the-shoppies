import styled from "styled-components";

const EmptyResult = styled.div`
  color: black;
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  margin-bottom: 5%;

  h1 {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    display: flex;
    min-width: 100%;
  }
`;

const Noms = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5%;
  align-items: center;
  background-color: #eee;
  min-height: 5vh;
  padding-top: 10px;

  h1 {
    font-size: 1.5rem;
  }

  div {
    display: inline;
    width: 80%;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1rem;
    }
  }
`;

const MainBody = styled.div`
  min-height: 100vh;
  display: flex;
  background-color: #faf7ed;

  @media (max-width: 1430px) {
    display: flex;
    flex-flow: column-reverse;
    min-width: 100%;
  }
`;

const Results = styled.div`
  width: 60%;
  color: #000;
  background-color: #fff;
  margin: 50px;
  box-shadow: rgb(0 0 0 / 69%) 0 0 30px -10px,
    rgb(0 0 0 / 73%) 0 10px 10px -10px;
  padding: 2rem;

  @media (max-width: 1430px) {
    display: block;
    width: 100%;
    min-height: 50vh;
    margin: 20px 0;
  }
`;

const NomButton = styled.button`
  width: 10em;
  height: 2.8em;
  cursor: pointer;
  background-color: rgb(35, 170, 107);
  border: none;
  color: white;
  margin-top: 0.7em;
  font-weight: 500;
  border-radius: 5px;
  font-size: 0.95em;

  &:hover {
    background-color: rgb(20, 139, 84);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: rgba(35, 170, 107, 0.3);
  }
`;

const Remove = styled(NomButton)`
  background-color: #c71a1a;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 40px;

  &:hover {
    background-color: #ad0a0a;
  }
`;

const ClearAll = styled(Remove)`
  width: 10em;
  margin: 25px auto;
  position: absolute;
  bottom: 0;
  left: 50%;
  right: 25%;
  margin-left: -5em;

  &:disabled {
    cursor: not-allowed;
    background-color: #ad0a0a;
  }
`;

const Poster = styled.div`
  display: flex;
  align-items: flex-start;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const PosterImg = styled.img`
  min-width: 20em;
  height: auto;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin: auto 0;

  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
  }
`;

const MovieCard = styled.section`
  display: flex;
  justify-content: flex-start;
  background-color: white;
  padding: 1.5em;
  color: #797979;
  align-content: flex-start;
  font-size: 1rem;

  @media (max-width: 768px) {
    display: block;
    align-content: center;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  margin: auto 0;
  font-size: 1em;

  h1 {
    text-overflow: ellipsis;
    font-weight: bold;
    color: black;
    font-size: 2.75em;

    @media (max-width: 859px) {
      font-size: 2.25em;
    }
    @media (max-width: 768px) {
      text-align: left;
    }
  }
  p {
    font-weight: 500;
    font-size: 1.5em;

    @media (max-width: 859px) {
      font-size: 1.25em;
    }
    @media (max-width: 768px) {
      text-align: left;
    }
  }
  @media (max-width: 768px) {
    align-items: left;
    justify-content: left;
    padding: 0;
  }
`;

const Nominations = styled(Results)`
  margin-left: 0;
  width: 40%;
  min-height: 90vh;
  max-height: 98vh;
  position: sticky;
  top: 10px;

  @media (max-width: 1430px) {
    width: 100%;
    min-height: 50vh;
    max-height: max-content;
    position: relative;
  }
`;

const SearchArea = styled.section`
  background-color: #faf7ed;
  margin: 0;
  padding: 2em;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  width: 75rem;
  cursor: "auto";
  padding: 2rem;
  height: 2rem;
  border-radius: 10rem;
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  margin: auto;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 1430px) {
    width: 100%;
  }
`;

const Input = styled.input`
  font-size: 14px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  border: none;
  color: #004c3f;
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: #004c3f;
  }

  @media (max-width: 1430px) {
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Banner = styled.div`
  color: #000;
  display: flex;
  justify-content: center;
  background-color: rgb(35, 170, 107);
  padding: 20px;

  h1 {
    font-size: 2.5rem;
    font-weight: 500;
  }

  @media (max-width: 859px) {
    h1 {
      font-size: 1.5em;
    }
  }
`;

const DoneBanner = styled(Banner)`
  background-color: #c71a1a;
`;

const Top = styled.div`
  background-color: #faf7ed;
  min-height: 25vh;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: left;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  color: #004c3f;

  h1 {
    font-size: 3em;
  }

  h2 {
    font-size: 1.5em;
  }

  @media (max-width: 768px) {
    text-align: left;
    align-items: left !important;
    justify-content: center;
    padding: 24px;
  }
`;

const Shoppies = styled.text`
  font-family: Poppins;
  font-weight: bold;
`;

export {
  DoneBanner,
  Banner,
  Input,
  Form,
  SearchArea,
  Nominations,
  Details,
  MovieCard,
  Poster,
  PosterImg,
  Remove,
  NomButton,
  Results,
  MainBody,
  Noms,
  EmptyResult,
  Top,
  Shoppies,
  ClearAll,
};
