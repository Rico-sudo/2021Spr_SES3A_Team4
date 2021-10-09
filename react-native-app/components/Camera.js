import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as jpeg from "jpeg-js";
import * as tf from "@tensorflow/tfjs";
import { Buffer } from "buffer";
import {
  useSnakeDetectorModel,
  snakeClassIds,
} from "../context/SnakeDetectorModelContext";
import * as ImagePicker from "expo-image-picker";
import { PinchGestureHandler } from "react-native-gesture-handler";
import * as ImageManipulator from "expo-image-manipulator";
import { getSnakeDetails } from "./../services/fetchSnakeDetails";
import LoadingModal from "./Modal/LoadingModal";

const Cam = () => {
  const { snakeDetector } = useSnakeDetectorModel();

  // Loading modal
  const [openLoader, setOpenLoader] = useState(false);

  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomScale, setzoomScale] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState(null);

  useEffect(() => {
    onHandlePermission();
  }, []);

  useEffect(() => {
    if (loadingMessage) console.log(loadingMessage);
  }, [loadingMessage]);

  const onHandlePermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    alert("Permission to access camera is required!");
    return;
  }

  const processImage = async (imageUri) => {
    try {
      const binaryFile = Buffer.from(imageUri, "base64");
      const TO_UINT8ARRAY = true;
      const { width, height, data } = jpeg.decode(binaryFile, TO_UINT8ARRAY);
      const imageTensor = await tf.browser.fromPixels({ data, width, height });
      // // Predict snake
      setLoadingMessage("Running prediction.");

      const res = await snakeDetector.predict(imageTensor.expandDims(0));
      const predictedClassId = snakeClassIds[res.argMax(-1).dataSync()[0]];

      const { data: predictedSnakeDetails } = await getSnakeDetails(
        predictedClassId
      );
      return { predictedSnakeDetails };
    } catch (error) {
      return { error: error.message };
    } finally {
      setOpenLoader(false);
      setLoadingMessage(null);
    }
  };

  //data is the pic obj!!
  const onSnap = async () => {
    if (cameraRef.current) {
      setOpenLoader(true);
      setLoadingMessage("Preparing image.");
      const data = await cameraRef.current.takePictureAsync();
      const resizedPhoto = await ImageManipulator.manipulateAsync(
        data.uri,
        [{ resize: { width: 226, height: 226 } }],
        { compress: 0.5, base64: true }
      );
      const source = resizedPhoto.base64;
      if (source) {
        const result = await processImage(source); // if successful, prediction is in result.prediction // otherwise, error message is in result.error
        console.log(result);

        setSelectedImage({ localUri: data.uri });
        await cameraRef.current.pausePreview();
        setIsPreview(true);
      }
    }
  };
  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setSelectedImage(null);
    setIsPreview(false);
  };

  let openImagePickerAsync = async () => {
    if (cameraRef.current) {
      let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      const data = await ImagePicker.launchImageLibraryAsync({});
      const resizedPhoto = await ImageManipulator.manipulateAsync(
        data.uri,
        [{ resize: { width: 226, height: 226 } }],
        { compress: 0.5, base64: true }
      );
      const source = resizedPhoto.base64;

      if (data.cancelled === true) {
        return;
      }

      if (source) {
        setSelectedImage({ localUri: data.uri });
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        const result = await processImage(source); // if successful, prediction is in result.prediction // otherwise, error message is in result.error
        if (result.snakeName) {
          console.log("Predicted snake", result.snakeName);
          Alert.alert("Snake detected", result.snakeName, [
            {
              text: "Cancel",
              style: "cancel",
            },
            { text: "OK", onPress: cancelPreview },
          ]);
        } else {
          console.log("Error", result.error);
          Alert.alert(
            "Error, no snake detected",
            "Please wait for model to load",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              { text: "OK", onPress: cancelPreview },
            ]
          );
        }

        setSelectedImage({ localUri: data.uri });
        await cameraRef.current.pausePreview();
        setIsPreview(true);
      }
    }
  };

  const onZoomEvent = Animated.event(
    [
      {
        nativeEvent: { scale: new Animated.Value(1) },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

  const onZoomStateChange = (event) => {
    const e = event.nativeEvent;

    if (e.oldState === 4) {
      //camera zoom: 0 = no zoom, 1 = max zoom
      if (e.scale < 1) {
        setzoomScale(zoomScale + e.scale - 1 < 0 ? 0 : zoomScale + e.scale - 1);
      } else {
        setzoomScale(
          zoomScale + e.scale / 5.0 > 1 ? 1 : zoomScale + e.scale / 5.0
        );
      }
    }
  };

  return (
    <PinchGestureHandler
      onGestureEvent={() => onZoomEvent}
      onHandlerStateChange={(e) => onZoomStateChange(e)}
    >
      <View style={styles.container}>
        <LoadingModal
          modalVisible={openLoader}
          setModalVisible={setOpenLoader}
          message={loadingMessage}
        />
        <Camera
          ref={cameraRef}
          style={styles.container}
          zoom={zoomScale}
          type={cameraType}
          onCameraReady={onCameraReady}
        />
        {selectedImage && (
          <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.pickedImage}
          />
        )}
        <View style={styles.container}>
          {isPreview && (
            <TouchableOpacity
              onPress={cancelPreview}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <AntDesign name="close" size={32} color="#fff" />
            </TouchableOpacity>
          )}
          {!isPreview && (
            <View style={styles.bottomButtonsContainer}>
              {/* if we need flip */}
              <TouchableOpacity
                disabled={!isCameraReady}
                onPress={switchCamera}
              >
                <MaterialIcons name="flip-camera-ios" size={28} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={!isCameraReady}
                onPress={onSnap}
              >
                <MaterialIcons
                  name="panorama-fish-eye"
                  size={90}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={openImagePickerAsync}>
                <MaterialIcons
                  name="add-photo-alternate"
                  size={28}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </PinchGestureHandler>
  );
};

const styles = StyleSheet.create({
  pickedImage: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  closeButton: {
    position: "absolute",
    top: 35,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF0000",
    opacity: 0.7,
  },
  capture: {
    left: 10,
    right: 10,
  },
  bottomButtonsContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 28,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    color: "#fff",
  },
});

export default Cam;
