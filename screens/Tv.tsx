import React from "react";

import { ScrollView, FlatList, RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvAPI } from "../api";
import HList, { HListSeperator } from "../components/HList";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";

const Tv = () => {
  const queryClient = useQueryClient();

  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
  } = useQuery(["tv", "today"], tvAPI.airing);
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
  } = useQuery(["tv", "top"], tvAPI.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery(["tv", "trending"], tvAPI.trending);
  const loading = todayLoading || topLoading || trendingLoading;

  if (loading) {
    return <Loader />;
  }

  const refreshing = todayRefetching || topRefetching || trendingRefetching;

  const onRefresh = () => {
    queryClient.refetchQueries(["tv"]);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        ></RefreshControl>
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      <HList title={"Trending TV"} data={todayData.results} />
      <HList title={"Airing TV"} data={trendingData.results} />
      <HList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
};

export default Tv;
