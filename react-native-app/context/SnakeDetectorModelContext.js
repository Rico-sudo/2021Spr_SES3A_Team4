import React, { createContext, useState, useEffect, useContext } from "react";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SnakeDetectorModelContext = createContext({
  snakeDetector: null,
});

export const snakeClassIds = ["486", "216", "453", "578", "71", "590"];

const SNAKE_DATA_HISTORY_KEY = "@snake_data_history_key";

export const SnakeDetectorModelContextProvider = ({ children }) => {
  const [snakeDetector, setSnakeDetector] = useState(null);
  const [snakeDataHistory, setSnakeDataHistory] = useState(null);
  useEffect(() => {
    async function loadModel() {
      await tf.ready();
      console.log("Loading snake detection model");

      const modelJson = await require("../assets/model/model.json");
      const modelWeight = await require("../assets/model/group1-shard.bin");
      const snakeDetectors = await tf.loadLayersModel(
        bundleResourceIO(modelJson, modelWeight)
      );

      setSnakeDetector(snakeDetectors);
      console.log("Model Loaded");
    }
    loadModel();
  }, []);

  useEffect(() => {
    const retrieveHistory = async () => {
      try {
        const value = await AsyncStorage.getItem(SNAKE_DATA_HISTORY_KEY);
        setSnakeDataHistory(value);
      } catch (e) {
        console.log("Local Storage Retrieve Error", e.message);
      }
    };
    retrieveHistory();
  }, []);

  const storeSnakeDataHistory = async (value) => {
    try {
      const currentHistory = snakeDataHistory || [];
      currentHistory.unshift(value);

      const jsonValue = JSON.stringify(currentHistory);
      await AsyncStorage.setItem(SNAKE_DATA_HISTORY_KEY, jsonValue);
    } catch (e) {
      console.log("Local Storage Storage Error", e.message);
    }
  };

  useEffect(() => {
    console.log("Check", snakeDataHistory);
  }, [snakeDataHistory]);

  const snakeDetectorModelContext = {
    snakeDetector,
    snakeDataHistory,
    storeSnakeDataHistory,
  };

  return (
    <SnakeDetectorModelContext.Provider value={snakeDetectorModelContext}>
      {children}
    </SnakeDetectorModelContext.Provider>
  );
};

export const useSnakeDetectorModel = () => {
  try {
    const context = useContext(SnakeDetectorModelContext);
    if (context === undefined) {
      throw new Error("Missing Provider");
    }
    return context;
  } catch (err) {
    console.log("Load Model Context error.", err.message);
    return {};
  }
};
