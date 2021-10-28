import React from "react";

import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => (props.selected ? "blue" : "red")};
`;

const Movie = ({ navigation: { navigate } }) => (
  <Btn onPress={() => navigate("Stack", { screen: "One" })}>
    <Title>Movie</Title>
  </Btn>
);

export default Movie;
