import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useAssets } from "expo-asset";

export default function App() {
  const [assets] = useAssets([require("./img/turtle-neck.png")]);
  const [loaded] = useFonts(Ionicons.font);

  if (!assets || !loaded) {
    return <AppLoading />;
  }

  return <Text>We are done loading!</Text>;
}
