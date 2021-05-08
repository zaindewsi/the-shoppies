import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import _ from "lodash";

const Search = () => {
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [resultData, setResultData] = useState([]);

  const sendQuery = async (query) => {
    let data = await axios.get(
      `http://www.omdbapi.com/?i=tt3896198&apikey=434167e&s=${query}`
    );
    setResultData(data.data.Search);
  };

  const delayedQuery = useCallback(
    _.debounce((q) => sendQuery(q), 500),
    []
  );

  return (
    <div>
      <Form>
        <Input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Search for a movie..."
        />
      </Form>
    </div>
  );
};

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
