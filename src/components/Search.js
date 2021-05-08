import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import _ from "lodash";
import ls from "local-storage";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [resultData, setResultData] = useState([]);
  const [nominations, setNominations] = useState([]);

  const sendQuery = async (query) => {
    let data = await axios.get(
      `http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.REACT_APP_API_KEY_OMDB}&s=${query}`
    );
    setResultData(data.data.Search);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedQuery = useCallback(
    _.debounce((q) => sendQuery(q), 500),
    []
  );

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
    delayedQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const addtoNominations = (item) => {
    let newNominations = [...nominations, item];
    setNominations([...nominations, item]);

    // adding to localStorage
    ls.set("nominations", newNominations);
  };

  const removeFromNomination = (index) => {
    let array = [...nominations];

    if (index !== -1) {
      array.splice(index, 1);
      setNominations(array);
    }

    ls.remove("nominations");
  };

  const isButtonDisabled = (item) => {
    return (
      nominations && (nominations.includes(item) || nominations.length >= 5)
    );
  };

  useEffect(() => {
    let myNominations = ls.get("nominations");
    if (myNominations) {
      setNominations(myNominations);
    }
  }, []);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Input
          onChange={handleSearchQuery}
          value={searchQuery}
          placeholder="Search for a movie..."
        />
      </Form>
      <Banner>
        <div className={nominations.length >= 5 ? "done" : null}>
          {nominations !== null && nominations.length > 4 ? (
            <div>
              <h1>You've reached the nomination limit</h1>
            </div>
          ) : (
            <div>
              <h1>
                You have {5 - nominations.length} nomination
                {nominations.length === 4 ? null : "s"} remaining
              </h1>
            </div>
          )}
        </div>
      </Banner>
      <MainBody>
        <Results>
          <div>
            {!resultData || !searchQuery ? (
              <EmptyResult>Search for a movie to get started</EmptyResult>
            ) : (
              resultData.map((item, index) => {
                return nominations.includes(item) ? (
                  <div></div>
                ) : (
                  <div>
                    <h1>
                      {item.Title} ({item.Year})
                    </h1>
                    <img
                      src={item.Poster === "N/A" ? "/noImage.png" : item.Poster}
                      alt={item.Title}
                    />
                    <button
                      disabled={isButtonDisabled(item)}
                      onClick={
                        nominations.length < 5
                          ? () => addtoNominations(item)
                          : window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      Add to nominations
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </Results>
        <Nominations>
          {nominations.length === 0 ? (
            <EmptyNoms>Your nominations will show up here</EmptyNoms>
          ) : (
            nominations.map((item, index) => {
              return (
                <div>
                  <h1>
                    {item.Title} ({item.Year})
                  </h1>
                  <img
                    src={item.Poster === "N/A" ? "/noImage.png" : item.Poster}
                    alt={item.Title}
                  />
                  <button onClick={() => removeFromNomination(index)}>
                    Remove
                  </button>
                </div>
              );
            })
          )}
        </Nominations>
      </MainBody>
    </div>
  );
};

const EmptyResult = styled.div`
  min-height: 50vh;
  color: black;
  font-size: 30px;
  display: flex;
  justify-content: center;
`;

const EmptyNoms = styled(EmptyResult)``;

const MainBody = styled.div`
  min-height: 50vh;
  display: flex;
`;

const Results = styled.div`
  width: 50%;
  justify-content: center;
  color: #000;
  background-color: #fff;
  margin: 50px;
  box-shadow: rgb(0 0 0 / 69%) 0 0 30px -10px,
    rgb(0 0 0 / 73%) 0 10px 10px -10px;
  padding: 2rem;

  h1 {
    font-size: 30px;
    display: flex;
    justify-content: center;
    margin: 2rem auto;
  }
  img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem auto;
    max-width: 300px;
    max-height: 450px;
    min-height: 430px;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem auto;
  }
`;

const Nominations = styled(Results)`
  margin-left: 0;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #37474f;
  width: 75rem;
  cursor: "auto";
  padding: 2rem;
  height: 2rem;
  border-radius: 10rem;
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  margin: 2rem auto;
`;

const Input = styled.input`
  font-size: 14px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  border: none;
  color: white;
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: white;
  }
`;

const Banner = styled.div`
  color: #000;
  display: flex;
  justify-content: center;
  background-color: #32af2d;
  padding: 20px;
`;

export default Search;
