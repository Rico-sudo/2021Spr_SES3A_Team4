import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Main from "./components/Main";
import { SnakeDetectorModelContextProvider } from "./context/SnakeDetectorModelContext";

export default function App() {
  return (
    <SnakeDetectorModelContextProvider>
      <Main />
    </SnakeDetectorModelContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
