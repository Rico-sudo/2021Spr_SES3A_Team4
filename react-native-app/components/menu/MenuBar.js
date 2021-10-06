import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.menuBar}>
        {/* <Image style={styles.logo} source={require('../../assets/snakescannerheading.png')}/> */}
          <Text style={styles.heading}>{this.props.pageName}</Text>
        <TouchableOpacity style={styles.settings}>
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
  },
  logo: {
    width: 40,
    height: 40,
  },
  settings: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: Dimensions.get('window').width*0.05,
  }
});

export default MenuBar;
