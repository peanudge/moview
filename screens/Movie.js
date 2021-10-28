import React from "react";

import { TouchableOpacity, View, Text } from "react-native";

const Movie = ({ navigation: { navigate } }) => (
  <TouchableOpacity
    onPress={() => navigate("Stack", { screen: "Three" })}
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  >
    <Text>Movie</Text>
  </TouchableOpacity>
);

export default Movie;
