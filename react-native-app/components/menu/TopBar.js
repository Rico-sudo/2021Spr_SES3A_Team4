import { WhiteBalance } from 'expo-camera/build/Camera.types';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.topBar}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    topBar: {
        height: 33,
        backgroundColor: 'transparent',
    },
});

export default TopBar;
