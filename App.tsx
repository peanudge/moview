import AppLoading from "expo-app-loading";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useAssets } from "expo-asset";
import { useColorScheme } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";

import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styled.js";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  const [assets] = useAssets([require("./img/turtle-neck.png")]);
  const [loaded] = useFonts(Ionicons.font);

  const isDark = useColorScheme() === "dark";

  if (!assets || !loaded) {
    return <AppLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
