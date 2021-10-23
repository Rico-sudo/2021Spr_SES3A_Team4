import React, { createContext, useState, useEffect, useContext } from "react";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SnakeDetectorModelContext = createContext({
  snakeDetector: null,
});

export const snakeClassIds = ["486", "216", "453", "578", "71", "590"];

const SNAKE_DATA_HISTORY_KEY = "@key";

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
        let value = await AsyncStorage.getItem(SNAKE_DATA_HISTORY_KEY);
        if (value !== null) {
          value = JSON.parse(value);
        }
        setSnakeDataHistory(value);
      } catch (e) {
        console.log("Local Storage Retrieve Error", e.message);
      }
    };
    retrieveHistory();
  }, []);

  const storeSnakeDataToHistory = (value) => {
    if (snakeDataHistory) {
      let currentHistory = [...snakeDataHistory];
      currentHistory.unshift(value);
      setSnakeDataHistory(currentHistory);
    } else {
      setSnakeDataHistory([value]);
    }
  };

  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(snakeDataHistory);
        await AsyncStorage.setItem(SNAKE_DATA_HISTORY_KEY, jsonValue);
      } catch (e) {
        console.log("Local Storage Storage Error", e.message);
      }
    };
    if (snakeDataHistory) storeData();
  }, [snakeDataHistory]);

  const clearHistory = () => {
    const clear = async () => {
      try {
        setSnakeDataHistory(null);
        await AsyncStorage.removeItem(SNAKE_DATA_HISTORY_KEY);
      } catch (e) {
        console.log("Local Storage Storage Error", e.message);
      }
    };
    clear();
  };

  const snakeDetectorModelContext = {
    snakeDetector,
    snakeDataHistory,
    storeSnakeDataToHistory,
    clearHistory,
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
