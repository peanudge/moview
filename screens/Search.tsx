import React, { useState } from "react";
import { useQuery } from "react-query";

import styled from "styled-components/native";
import { movieAPI, tvAPI } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
`;

const Search = () => {
  const [query, setQuery] = useState<String>("");
  const {
    isLoading: movieLoading,
    data: movieData,
    refetch: searchMovie,
  } = useQuery(["searchMovie", query], movieAPI.search, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvAPI.search, {
    enabled: false,
  });

  const onChangeText = (text: string) => setQuery(text);

  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovie();
    searchTv();
  };

  return (
    <Container>
      <SearchBar
        onChangeText={onChangeText}
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="grey"
        returnKeyType="search"
        onSubmitEditing={onSubmit}
      />
      {movieLoading && tvLoading ? <Loader /> : null}
      {movieData && <HList title="Movie Results" data={movieData.results} />}
      {tvData && <HList title="Tv Results" data={tvData.results} />}
    </Container>
  );
};
export default Search;
