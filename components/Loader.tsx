import React from "react";

import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loader = () => {
  return (
    <Container>
      <ActivityIndicator size="small" />
    </Container>
  );
};

export default Loader;
