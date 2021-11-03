import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Linking,
  useColorScheme,
} from "react-native";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { Movie, movieAPI, TV, tvAPI } from "../api";
import { makeImgPath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { BLACK_COLOR } from "../colors";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  justify-content: flex-end;
  padding: 0px 20px;
  height: ${SCREEN_HEIGHT / 4}px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  flex-direction: row;
  color: white;
  font-size: 36px;
  align-self: flex-end;
  padding: 0 10px;
  width: 80%;
`;

const Overview = styled.Text`
  margin-top: 30px;
  margin: 20px 0px;
  color: ${(props) => props.theme.textColor};
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;
const Data = styled.View`
  padding: 0px 20px;
`;
// Detail 스크린에 받게되는 params 타입을 지정하는 타입.
type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const isDark = useColorScheme() === "dark";
  const isMovie = "original_title" in params;
  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? movieAPI.detail : tvAPI.detail
  );

  useEffect(() => {
    setOptions({
      title: isMovie ? params.original_title : params.original_name,
    });
  }, []);

  const openYoutubeLink = async (videoID) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoID}`;
    // await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
        />

        {/* Fade out effect */}
        <LinearGradient
          colors={["transparent", BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        />

        <Column>
          <Poster path={params.poster_path || ""}></Poster>
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video) => (
          <VideoBtn key={video.key} onPress={() => openYoutubeLink(video.key)}>
            <Ionicons
              name="logo-youtube"
              color={isDark ? "white" : "black"}
              size={24}
            />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};
export default Detail;
