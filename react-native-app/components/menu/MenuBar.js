import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  displayAlert = () => {
    Alert.alert(
      "Premium Feature",
      "Please purchase a SnakeScanner+ subscription in settings to access a map of recent snake sightings and many more premium features.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    )
  }

  renderPageName = () => {
    if (this.props.pageName == "SnakeScanner") {
      return <View style={styles.boundingBox}>
          <View style={styles.topLeftEdge}></View>
          <View style={styles.topRightEdge}></View>
          <View style={styles.bottomRightEdge}></View>
          <View style={styles.bottomLeftEdge}></View>
          <Text style={styles.heading}>{this.props.pageName}</Text>
        </View>
    }
    return <Text style={styles.heading}>{this.props.pageName}</Text>
  }

  render() {
    return (
      <View style={styles.menuBar}>
        <TouchableOpacity style={styles.map} onPress={() => this.displayAlert()}>
          <MaterialIcons name="map" size={28} color="white" />
        </TouchableOpacity>
          {this.renderPageName()}
        <TouchableOpacity style={styles.settings} onPress={() => this.props.navigation.navigate('Settings')}>
          <MaterialIcons name="settings" size={28} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuBar: {
    height: 55,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Avenir-Medium',
    alignSelf: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  settings: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: Dimensions.get('window').width*0.05,
  },
  map: {
    alignSelf: 'flex-start',
    position: 'absolute',
    left: Dimensions.get('window').width*0.05,
  },
  boundingBox: {
    width: 145,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  topLeftEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 5,
    width: 5,
    borderColor: '#FFFFFF',
    borderLeftWidth: 1.5,
    borderTopWidth: 1.5,
  },
  topRightEdge: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 5,
    width: 5,
    borderColor: '#FFFFFF',
    borderRightWidth: 1.5,
    borderTopWidth: 1.5,
  },
  bottomLeftEdge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 5,
    width: 5,
    borderColor: '#FFFFFF',
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
  },
  bottomRightEdge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 5,
    width: 5,
    borderColor: '#FFFFFF',
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
  },
});

export default MenuBar;
