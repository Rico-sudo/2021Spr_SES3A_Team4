import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.menuBar}>
        <Image style={ styles.logo} source={require('../../assets/snakescannerheading.png')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    menuBar: {
        height: 47,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
  },
  logo: {

    width: 170,
    height: 40,
  }
});

export default MenuBar;
