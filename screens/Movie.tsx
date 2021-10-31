import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Dimensions, FlatList } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";

import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { useQuery, useQueryClient } from "react-query";
import { movieAPI, MovieResponse } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: 600;
  margin-left: 20px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], movieAPI.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>(["movies", "upcoming"], movieAPI.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>(["movies", "trending"], movieAPI.trending);

  const onRereshing = async () => {
    queryClient.refetchQueries(["movies"]);
  };

  const renderVMedia = ({ item }: { item: any }) => (
    <VMedia
      key={item.id}
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );
  const renderHMedia = ({ item }: { item: any }) => {
    return (
      <HMedia
        key={item.id}
        posterPath={item.poster_path}
        originalTitle={item.original_title}
        overview={item.overview}
        releaseDate={item.release_date}
      />
    );
  };

  const VSeperator = styled.View`
    width: 20px;
  `;
  const HSeperator = styled.View`
    height: 20px;
  `;

  const moviewKeyExtractor = (item: any) => String(item.id);

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRereshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop={true}
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 30,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData?.results.map((movie: any) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>

          {trendingData && (
            <HList title={"Trending Movies"} data={trendingData.results} />
          )}

          <ListContainer>
            <ComingSoonTitle>Coming soon</ComingSoonTitle>
          </ListContainer>
        </>
      }
      keyExtractor={moviewKeyExtractor}
      ItemSeparatorComponent={HSeperator}
      data={upcomingData.results}
      renderItem={renderHMedia}
    />
  ) : null;
};

export default Movies;
