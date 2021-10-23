import { useSnakeDetectorModel } from "./../../context/SnakeDetectorModelContext";
import InfoCard from "./InfoCard";
import {
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";

const HistoryContainer = (props) => {
  const { snakeDataHistory } = useSnakeDetectorModel();
  return (
    <>
      <TouchableOpacity style={styles.clearHistoryButton} onPress={() => null}>
        <Text style={styles.clearHistory}>Clear History</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        {snakeDataHistory && snakeDataHistory.length > 0 ? (
          snakeDataHistory.map((snake, index) => (
            <InfoCard
              navigation={props.navigation}
              snake={snake._id}
              key={index}
              {...snake}
            />
          ))
        ) : (
          <Text style={styles.results}>No history found.</Text>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  results: {
    marginTop: Dimensions.get("window").height * 0.4,
  },
  clearHistory: {
    fontSize: 14,
    fontFamily: "Avenir-Medium",
    fontWeight: "bold",
    color: "white",
  },
  clearHistoryButton: {
    alignSelf: "flex-end",
    marginTop: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
    marginBottom: 10,
  },
});

export default HistoryContainer;
