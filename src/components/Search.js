import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import ls from "local-storage";
import { VStack, StackDivider } from "@chakra-ui/react";
import { Trash } from "@styled-icons/boxicons-regular";
import {
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
} from "./StyledComponents";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [resultData, setResultData] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { REACT_APP_API_KEY_OMDB } = process.env;

  const sendQuery = async (query) => {
    setLoading(true);
    let data = await axios.get(
      `http://www.omdbapi.com/?&type=movie&apikey=${REACT_APP_API_KEY_OMDB}&s=${query}`
    );
    let newData = data.data.Search;

    if (data.data.Error) {
      setResultData([]);
    } else {
      let allMovies = [];

      for (let i of newData) {
        let details = await axios(
          `https://www.omdbapi.com/?i=${i.imdbID}&apikey=${process.env.REACT_APP_API_KEY_OMDB}`
        );
        allMovies.push(details.data);
      }
      setResultData(allMovies);
    }
    setLoading(false);
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
    let newNominations = [...nominations];

    if (index !== -1) {
      newNominations.splice(index, 1);
      setNominations(newNominations);
    }

    ls.set("nominations", newNominations);
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
      <SearchArea>
        <Form onSubmit={handleSubmit}>
          <Input
            onChange={handleSearchQuery}
            value={searchQuery}
            placeholder="Search for a movie..."
          />
        </Form>
      </SearchArea>
      <div>
        {nominations !== null && nominations.length > 4 ? (
          <div>
            <DoneBanner>
              <div>
                <h1>You've reached the nomination limit</h1>
              </div>
            </DoneBanner>
          </div>
        ) : (
          <div>
            <Banner>
              <div>
                <h1>
                  You have {5 - nominations.length} nomination
                  {nominations.length === 4 ? null : "s"} remaining
                </h1>
              </div>
            </Banner>
          </div>
        )}
      </div>
      <MainBody>
        <Results>
          <EmptyResult>
            {!searchQuery ? (
              <h1>Search for a movie to get started!</h1>
            ) : (
              <h1>Search results for {searchQuery}...</h1>
            )}
          </EmptyResult>
          {!resultData || resultData.length < 1 ? (
            <div>
              <EmptyResult>
                {loading ? (
                  <img src={"/giphy.gif"} alt={"loading..."} />
                ) : (
                  "No results found"
                )}
              </EmptyResult>
            </div>
          ) : (
            resultData.map((item, index) => {
              return (
                <MovieCard>
                  <Poster>
                    <PosterImg
                      src={item.Poster === "N/A" ? "/noImage.png" : item.Poster}
                      alt={item.Title}
                    />
                  </Poster>
                  <Details>
                    <h1>
                      {item.Title} ({item.Year})
                    </h1>
                    <p>{item.Runtime}</p>
                    <p>{item.Plot}</p>

                    <NomButton
                      disabled={isButtonDisabled(item)}
                      onClick={
                        nominations.length < 5
                          ? () => addtoNominations(item)
                          : window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      Nominate
                    </NomButton>
                  </Details>
                </MovieCard>
              );
            })
          )}
        </Results>
        <Nominations>
          <EmptyResult>
            <h1>Your Nominations</h1>
          </EmptyResult>
          <VStack
            divider={<StackDivider borderColor="gray.400" />}
            align="stretch"
            backgroundColor={"#eee"}
          >
            {nominations.map((item, index) => {
              return (
                <Noms>
                  <div>
                    <h1>{item.Title}</h1>
                    <p> ({item.Year})</p>
                  </div>

                  <Remove onClick={() => removeFromNomination(index)}>
                    <Trash size="24px" />
                  </Remove>
                </Noms>
              );
            })}
          </VStack>
        </Nominations>
      </MainBody>
    </div>
  );
};

export default Search;
