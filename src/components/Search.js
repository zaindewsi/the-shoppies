import React, { useState, useCallback } from "react";
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
      `http://www.omdbapi.com/?i=tt3896198&apikey=434167e&s=${query}`
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

  const isButtonDisabled = (item) => {
    return (
      nominations && (nominations.includes(item) || nominations.length >= 5)
    );
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Input
          onChange={handleSearchQuery}
          value={searchQuery}
          placeholder="Search for a movie..."
        />
      </Form>
      <MainBody>
        <Results>
          <div>
            {resultData ? (
              resultData.map((item, index) => {
                return !nominations.includes(item) ? (
                  <>
                    <h1>{item.Title}</h1>
                    <h1>{item.Year}</h1>
                    <img src={item.Poster} alt={item.Title} />
                    <button
                      disabled={isButtonDisabled(item)}
                      onClick={() => addtoNominations(item)}
                    >
                      Add to nominations
                    </button>
                  </>
                ) : null;
              })
            ) : (
              <div>Search for a movie...</div>
            )}
          </div>
        </Results>
        <Nominations>
          {" "}
          {!nominations ? (
            <div>Add items to list...</div>
          ) : (
            nominations.map((item, index) => {
              return (
                <div>
                  <h1>{item.Title}</h1>
                  <h1>{item.Year}</h1>
                  <img src={item.Poster} alt={item.Title} />
                  <button>Remove</button>
                </div>
              );
            })
          )}
        </Nominations>
      </MainBody>
    </div>
  );
};

const MainBody = styled.div`
  min-height: 50vh;
  display: flex;
`;

const Results = styled.div`
  width: 50%;
  justify-content: center;
  color: #000;

  h1 {
    display: flex;
    justify-content: center;
    margin: auto;
  }
  img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
`;

const Nominations = styled(Results)``;

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

export default Search;
