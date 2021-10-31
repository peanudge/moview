import React from "react";
import styled from "styled-components/native";

import { BlurView } from "expo-blur";
import { makeImgPath } from "../utils";
import { StyleSheet, useColorScheme } from "react-native";
import Poster from "./Poster";

const View = styled.View`
  flex: 1;
`;

const BgImg = styled.Image``;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 40%;
  margin-left: 10px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.voteTextColor};
  margin-top: 10px;
`;
const Votes = styled(Overview)`
  margin-top: 5px;
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";

  return (
    <View>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdropPath) }}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={80}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title>{originalTitle}</Title>
            {voteAverage > 0 ? <Votes>⭐️{voteAverage}/10</Votes> : null}
            <Overview>{overview.slice(0, 90)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
