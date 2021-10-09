import React, { createContext, useState, useEffect, useContext } from "react";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";

const SnakeDetectorModelContext = createContext({
  snakeDetector: null,
});

export const snakeClassIds = ["486", "216", "453", "578", "71", "590"];

export const SnakeDetectorModelContextProvider = ({ children }) => {
  const [snakeDetector, setSnakeDetector] = useState(null);
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

  const snakeDetectorModelContext = {
    snakeDetector,
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
