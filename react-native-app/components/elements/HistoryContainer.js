import { useSnakeDetectorModel } from "./../../context/SnakeDetectorModelContext";
import InfoCard from "./InfoCard";
import { Text, StyleSheet, Dimensions } from "react-native";
import React from "react";

const HistoryContainer = (props) => {
  const { snakeDataHistory } = useSnakeDetectorModel();
  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  results: {
    marginTop: Dimensions.get("window").height * 0.4,
  },
});

export default HistoryContainer;
