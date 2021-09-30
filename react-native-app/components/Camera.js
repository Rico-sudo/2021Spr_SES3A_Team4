import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { Camera } from "expo-camera";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as jpeg from "jpeg-js";
import * as tf from "@tensorflow/tfjs";
import { Buffer } from "buffer";
import { useSnakeDetectorModel } from "../context/SnakeDetectorModelContext";
import * as ImagePicker from "expo-image-picker";
import { PinchGestureHandler } from "react-native-gesture-handler";

const Cam = () => {
  const { snakeDetector } = useSnakeDetectorModel();

  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomScale, setzoomScale] = useState(0);

  useEffect(() => {
    onHandlePermission();
  }, []);

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

  const imageToTensor = (rawImageData) => {
    //Function to convert jpeg image to tensors
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0; // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];
      offset += 4;
    }
    return tf.tensor3d(buffer, [height, width, 3]);
  };

  const processImage = async (imageUri) => {
    const binaryFile = Buffer.from(imageUri, "base64");
    const imageTensor = imageToTensor(binaryFile).resizeBilinear([224, 224]);
    console.log(imageTensor);
    //snakeDetector.predict(imageTensor);
  };

  //data is the pic obj!!
  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.base64;

      if (source) {
        await processImage(source);
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

      const options = { quality: 0.7, base64: true };
      const data = await ImagePicker.launchImageLibraryAsync(options);
      const source = data.base64;

      if (data.cancelled === true) {
        return;
      }

      if (source) {
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
