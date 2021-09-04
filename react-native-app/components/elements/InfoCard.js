import { WhiteBalance } from 'expo-camera/build/Camera.types';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class InfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.infoCard}>
        <Text> InfoCard </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  infoCard: {
    width: 326,
    height: 169,
    backgroundColor: '#FEFEFE',
    borderRadius: 20,
    alignContent: 'center',
    justifyContent: 'center',
    shadowColor: '#37373737',
    shadowOffset: { width: 0, height: 3, },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
});

export default InfoCard;
