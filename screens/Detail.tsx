import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";

import { View, Text } from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../api";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: {
    params: { originalTitle },
  },
}) => {
  useEffect(() => {
    setOptions({
      title: originalTitle,
    });
  }, []);
  return (
    <Container>
      <Text>Detail</Text>
    </Container>
  );
};
export default Detail;
