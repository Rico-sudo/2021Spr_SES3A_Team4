import React, { useState, useEffect , useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import {Feather as Icon} from '@expo/vector-icons';
const Cam = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  
  const cameraRef = useRef(null);

<Camera
ref = {cameraRef} 
/>;

  const _takePicture = async () => {
      if(cameraRef){
     const options = {quality: 0.5 , base64:true, skipProcessing: false};
      
     let picture = await cameraRef.current.takePictureAsync(options);
        console.log(cameraRef.current.getSupportedRatioAsync());
        const source = picture.uri;
        if(source){
            cameraRef.current.resumePreview();
            console.log("Pic src: ", source);

        }
     
  }}
    
    

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
            
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
                {/* I ll leave flip here just in case we need it */}
            {/* <Text style={styles.text}> Flip </Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => _takePicture}

              >
            <Icon name="aperture" size={50} color="white"/>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default Cam;